import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { SimplifyModifier } from "three/examples/jsm/modifiers/SimplifyModifier.js";
import { Exporter } from "./exporter";

var scene;
var camera;
var camLight;


export class SceneManager {

  constructor() {

  }

  createScene(object) {
    const dropzone = document.querySelector("#dropzone");
    dropzone.style.display = "none";
    const mainPage = document.querySelector("#mainPage");
    mainPage.style.display = "none";
    const mode = document.querySelector("#mode");
    const trasformMode = "Transform";
    const orbitMode = "Orbit";
    mode.textContent = trasformMode;

    //create scene
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5));

    //create camera
    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 3;

    //create renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    renderer.setClearColor(0xf0f0f0, 1);

    //create lights

    const ambientLight = new THREE.AmbientLight(0xcccccc, 1.0);
    scene.add(ambientLight);

    camLight = new THREE.PointLight( 0xffffff, 1, 40 );
    scene.add(camLight);

    //create controls
    const controls = new TransformControls(camera, renderer.domElement);
    scene.add(controls);

    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enabled = false;

    //create floor plane


    /*
    const geo = new THREE.PlaneBufferGeometry(2000, 2000, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color: 0x808080,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(geo, mat);
    plane.rotateX(-Math.PI / 2);
    scene.add(plane);
*/
    

    //this.resetPosition_V1(object);
    this.resetPosition(object);
    //this.decreaseModel(object);


    //-------------------------------------------------------------
    //KEYCODES FOR CONTROLS
    //2 MODES:
    //-transform:
    //  G -> TRANSLATE
    //  R -> ROTATE
    //-orbit:
    //  LeftMouse -> orbit camera
    //  MiddleMouse -> zoom in/out
    //
    //PRESS 'Q' TO SWITCH BETWEEN MODES
    window.addEventListener("keydown", function (event) {
      switch (event.code) {
        case "KeyG":
          controls.setMode("translate");
          break;
        case "KeyR":
          controls.setMode("rotate");
          break;
        case "KeyQ":
          switchControls();
          break;
      }
    });

    let MODES = { ORBIT: 0, TRANSFORM: 1 };
    let currMode = 1;

    function switchControls() {
      switch (currMode) {
        case MODES.ORBIT:
          orbit.enabled = false;
          controls.enabled = true;
          currMode = MODES.TRANSFORM;
          mode.textContent = trasformMode;
          break;

        case MODES.TRANSFORM:
          orbit.enabled = true;
          controls.enabled = false;
          currMode = MODES.ORBIT;
          mode.textContent = orbitMode;
          break;
      }
    }
    //-------------------------------------------------------------

    function animate() {
      //hemiLightHelper.lookAt(new THREE.Vector3());

      requestAnimationFrame(animate);
      render();
    }

    function render() {
      scene.updateMatrixWorld();
      let w_camera_pos = new THREE.Vector3();
      camera.getWorldPosition(w_camera_pos);
      camLight.position.set(w_camera_pos.x, w_camera_pos.y, w_camera_pos.z);
      renderer.render(scene, camera);
    }

    animate();

    //set export button when scene is loaded
    const exporter = new Exporter();

    const exportButton = document.querySelector("#export");
    exportButton.style.display = "inline";
    exportButton.onclick = () => {
      exporter.exportScene(object);
    };

    const helper = document.querySelector("#helper");
    helper.style.display = "inline";

    return [scene, controls];
  }

  calcSceneBoundingBox(object) {
    let bbox = undefined;
    object.traverse( (child) => {
      if (child.type === "Mesh") {
        child.geometry.computeBoundingBox();
        const next_bbox = child.geometry.boundingBox;
        if (bbox === undefined)
          bbox = next_bbox;
        else {
          bbox.min.x = Math.min(bbox.min.x, next_bbox.min.x);
          bbox.min.y = Math.min(bbox.min.y, next_bbox.min.y);
          bbox.min.z = Math.min(bbox.min.z, next_bbox.min.z);
          bbox.max.x = Math.max(bbox.max.x, next_bbox.max.x);
          bbox.max.y = Math.max(bbox.max.y, next_bbox.max.y);
          bbox.max.z = Math.max(bbox.max.z, next_bbox.max.z);
        }
      }
    });
    return bbox;
  }


  calcBoundingBoxSize(bbox) {
    const szx = bbox.max.x - bbox.min.x;
    const szy = bbox.max.y - bbox.min.y;
    const szz = bbox.max.z - bbox.min.z;
    return Math.max(szx, szy, szz);
  }

  recalculateSceneSize(bbox_size) {
    const grid_size = 30;
    let grid_scale = 1.0;
    if (bbox_size < 0.1)
      grid_scale = 0.01;
    else if (bbox_size < 1.0)
      grid_scale = 0.1;

    camera.position.set(camera.position.x*grid_scale, camera.position.y*grid_scale, camera.position.z*grid_scale);
    camera.near = camera.near * grid_scale;
    camera.far = camera.far * grid_scale;
    camera.updateProjectionMatrix();

    const grid = new THREE.GridHelper( grid_size * grid_scale, grid_size); //, 0xffffff, 0xffffff );
    grid.material.opacity = 0.2;
    grid.material.depthWrite = false;
    grid.material.transparent = true;
    scene.add(grid);
  }


  calcVerticesCount(object) {
    let v_count = 0;
    object.traverse( (child) => {
      if (child.type === "Mesh") {
        v_count += child.geometry.attributes.position.count;
      }
    });
    console.log("v_count: ", v_count);
    return v_count;
  }


  resetPosition(object) {
    object.position.set(0, 0, 0);
    const bbox = this.calcSceneBoundingBox(object);
    console.log("bbox: ", bbox);
    let scale = 1.0;
    const bbox_size = this.calcBoundingBoxSize(bbox);
    if (bbox_size > 10) {
      scale = 0.01;
      //for (let i = 0; i < object.children.length; i++)
      object.scale.set(scale, scale, scale);
    }
    this.recalculateSceneSize(bbox_size);
    console.log("scale: ", scale);
    const yDiff = bbox.min.y * scale;
    console.log("yDiff", yDiff);
    object.position.set(0, -yDiff, 0);
  }


  decreaseModel(object) {
    const limit = 200000;
      const v_count = this.calcVerticesCount(object);
      if (v_count < limit)
        return;

      const koef = limit / v_count;
      const modifier = new SimplifyModifier();
      object.traverse( (child) => {
        if (child.type === "Mesh") {
            const simplified = child.clone();
            const count_for_remove = Math.floor( child.geometry.attributes.position.count * 0.1 ); //(1.0 - koef) );
            console.log("count_for_remove", count_for_remove);
            simplified.geometry = modifier.modify( simplified.geometry, count_for_remove );
            simplified.material = child.material;
            scene.add( simplified );
        }
      });
      
  }


}
