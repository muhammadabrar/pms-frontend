import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { LoaderUtils, LoadingManager, Scene, Vector3, Vector4, Box3 } from "three";
import { SceneManager } from "./scene-manager";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

const MANAGER = new LoadingManager();

export class Loader {
  constructor() {
    this.FILETYPES = { GLB: 0, OBJ: 1, FBX: 2 };
    this.filetype = this.FILETYPES.GLB;
    this.data = { material: {}, texture: {} };
  }

  readMTL() {
    let input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      if (file) {
        new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            resolve(evt.target.result);
          };
          reader.readAsText(file);
          reader.onerror = reject;
        })
          .then(processFileContent)
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    const processFileContent = (data) => {
      this.data.material = data;
    };

    input.click();
  }

  readTEX() {
    let input = document.createElement("input");
    input.type = "file";

    input.onchange = (e) => {
      var file = e.target.files[0];
      if (file) {
        new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            resolve(evt.target.result);
          };
          reader.readAsText(file);
          reader.onerror = reject;
        })
          .then(processFileContent)
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    const processFileContent = (data) => {
      this.data.texture = data;

      this.loadOBJ();
    };

    input.click();
  }

  load(fileMap) {
    let rootFile;
    let rootPath;
    Array.from(fileMap).forEach(([path, file]) => {
      if (file.name.match(/\.(gltf|glb)$/)) {
        rootFile = file;
        rootPath = path.replace(file.name, "");
        this.filetype = this.FILETYPES.GLB;
      }
      if (file.name.match(/\.(obj)$/)) {
        rootFile = file;
        rootPath = path.replace(file.name, "");
        this.filetype = this.FILETYPES.OBJ;
      }
      if (file.name.match(/\.(fbx)$/)) {
        rootFile = file;
        rootPath = path.replace(file.name, "");
        this.filetype = this.FILETYPES.FBX;
      }
    });
    this.view(rootFile, rootPath, fileMap);
  }

  view(rootFile, rootPath, fileMap) {
    const fileURL =
      typeof rootFile === "string" ? rootFile : URL.createObjectURL(rootFile);

    switch (this.filetype) {
      case this.FILETYPES.GLB:
        this.loadGLB(fileURL, rootPath, fileMap);
        break;
      case this.FILETYPES.FBX:
        this.loadFBX(fileURL, rootPath, fileMap);
        break;
      case this.FILETYPES.OBJ:
        this.loadOBJ(fileURL, rootPath, fileMap);
        break;
    }
  }








  calcSceneBoundingBox(scene) {
    let bbox = undefined;
    scene.traverse( (child) => {
      if (child.type === "Mesh") {
        //child.geometry.applyMatrix4(child.parent.matrix);
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
    console.log("bbox: ", bbox);
    return bbox;
  }

  applyMeshMatrixes(scene) {
      scene.traverse( (child) => {
        if (child.type === "Mesh") {
          child.updateMatrix();
          child.parent.updateMatrix();
          child.geometry.applyMatrix4(child.matrix);
          child.position.set(0, 0, 0);
          child.rotation.set(0, 0, 0);
          child.scale.set(1, 1, 1);
          child.updateMatrix();
          child.geometry.applyMatrix4(child.parent.matrix);
          child.updateMatrix();
        }
      });
  }

  clearGroupMatrixes(scene) {
      scene.traverse( (child) => {
          child.updateMatrix();
          child.position.set(0, 0, 0);
          child.rotation.set(0, 0, 0);
          child.scale.set(1, 1, 1);
          child.updateMatrix();
      });
  }

  resetScenePosition(scene) {
    this.applyMeshMatrixes(scene);
    this.clearGroupMatrixes(scene);
    const bbox = this.calcSceneBoundingBox(scene);
    const shift = new Vector3(bbox.min.x + (bbox.max.x - bbox.min.x)/2.0, bbox.min.y + (bbox.max.y - bbox.min.y)/2.0, bbox.min.z + (bbox.max.z - bbox.min.z)/2.0);
    console.log("shift: ", shift);
    scene.traverse( (child) => {
      console.log("resetScenePosition: child: ", child); //[child.name, child.type, child.position, child.scale, child.rotation]);
      if (child.type === "Mesh") {
        this.resetObjectPosition(child, shift);
      }
    });
    // scene.position.set(0, bbox.min.y + (bbox.max.y - bbox.min.y)/2.0, 0);
  }


  resetObjectPosition(object, shift) {
    //object.position.set(0, 0, 0);
     // object.geometry?.boundingBox?.min?.y ||
     // object.children[0]?.geometry?.boundingBox?.min?.y;
    const position = object.geometry.attributes.position;
    for (let idx=0; idx < position.count; idx++) {
      const idx3 = idx*3;
      position.array[idx3] += shift.x;
      position.array[idx3 + 1] -= shift.y;
      position.array[idx3 + 2] -= shift.z;
    }
    object.geometry.attributes.position.needUpdate = true;
  }


  removePureObjects(scene) {
      const objects = [];
      console.log("objects before:");
      scene.traverse( (child) => {
          if ((child.type === "Object3D") && (child != scene)) {
            objects.push(child);
          }
      });
      for (let i = 0; i < objects.length; i++) {
        scene.remove(objects[i]);
      }
  }


  loadGLB(url, rootPath, assetMap) {
    const baseURL = LoaderUtils.extractUrlBase(url);
//console.log("baseURL: " + baseURL);
    // Load.
    return new Promise((resolve, reject) => {
      // Intercept and override relative URLs.
      MANAGER.setURLModifier((url, path) => {

        const normalizedURL =
          rootPath +
          decodeURI(url)
            .replace(baseURL, "")
            .replace(/^(\.?\/)/, "");
console.log("normalizedURL: " + normalizedURL);
        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
console.log("blob: ", blob)
          const blobURL = URL.createObjectURL(blob);
          console.log("blobURL: ", blobURL);
          blobURLs.push(blobURL);
          return blobURL;
        }
console.log("path: ", path);
console.log("path+url: ", (path || "") + url);
        return (path || "") + url;
      });

      const loader = new GLTFLoader(MANAGER);

      const blobURLs = [];

      //const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/gltf/');
      loader.setDRACOLoader( dracoLoader );
      loader.load(
        url,
        (gltf) => {
          console.log("scene: ", gltf.scene);
          this.removePureObjects(gltf.scene);
          this.resetScenePosition(gltf.scene);
          const objects = gltf.scene; // || gltf.scenes[0];
          //const clips = gltf.animations || [];
          const sceneManager = new SceneManager();

          const [scene, controls] = sceneManager.createScene(
            objects.children[0]
          );

          if (!objects) {
            // Valid, but not supported by this viewer.
            throw new Error(
              "This model contains no scene, and cannot be viewed here. However," +
                " it may contain individual 3D resources."
            );
          }

          scene.add(objects);
         // this.moveObjectToGround(gltf.scene);
          controls.attach(objects);

          blobURLs.forEach(URL.revokeObjectURL);

          resolve(gltf);
        },
        undefined,
        reject
      );
    });
  }

  loadFBX(url, rootPath, assetMap) {
    const baseURL = LoaderUtils.extractUrlBase(url);

    // Load.
    return new Promise((resolve, reject) => {
      // Intercept and override relative URLs.
      MANAGER.setURLModifier((url, path) => {
        const normalizedURL =
          rootPath +
          decodeURI(url)
            .replace(baseURL, "")
            .replace(/^(\.?\/)/, "");

        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        }

        return (path || "") + url;
      });

      const loader = new FBXLoader(MANAGER);

      const blobURLs = [];

      loader.load(
        url,
        (object) => {
          object.traverse(function (child) {
            if (child.isMesh) {
              if (child.material) {
                child.material.transparent = false;
              }
            }
          });
          object.scale.set(0.01, 0.01, 0.01);
          this.removePureObjects(object);
          this.resetScenePosition(object);
          const sceneManager = new SceneManager();
          const [scene, controls] = sceneManager.createScene(object);
          scene.add(object);
          controls.attach(object);

          blobURLs.forEach(URL.revokeObjectURL);

          resolve(object);
        },
        undefined,
        reject
      );
    });
  }

  loadOBJ(url, rootPath, assetMap) {
    let material = document.createElement("input");
    material.type = "file";
    let texture = document.createElement("input");
    texture.type = "file";

    material.onchange = (e) => {
      console.log(e);
      var file = e.target.files[0];
      if (file) {
        new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            resolve(evt.target.result);
          };
          reader.readAsText(file);
          reader.onerror = reject;
        })
          .then(getTexture)
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    texture.onchange = (e) => {
      var file = e.target.files[0];
      if (file) {
        new Promise(function (resolve, reject) {
          var reader = new FileReader();
          reader.onload = function (evt) {
            resolve(evt.target.result);
          };
          reader.readAsText(file);
          reader.onerror = reject;
        })
          .then(load)
          .catch(function (err) {
            console.log(err);
          });
      }
    };

    const getTexture = (data) => {
      this.data.material = data;
    };

    const load = (data) => {
      this.data.texture = data;
      loadobj(url, rootPath, assetMap);
    };

    material.click();
    texture.click();

    //-----------------------------------------------------------------
    const loadobj = (url, rootPath, assetMap) => {
      const baseURL = LoaderUtils.extractUrlBase(url);

      // Load.
      return new Promise((resolve, reject) => {
        // Intercept and override relative URLs.
        MANAGER.setURLModifier((url, path) => {
          const normalizedURL =
            rootPath +
            decodeURI(url)
              .replace(baseURL, "")
              .replace(/^(\.?\/)/, "");

          if (assetMap.has(normalizedURL)) {
            const blob = assetMap.get(normalizedURL);
            const blobURL = URL.createObjectURL(blob);
            blobURLs.push(blobURL);
            return blobURL;
          }

          return (path || "") + url;
        });

        const mtlloader = new MTLLoader();
        const mtlURL = this.createObjectURL(this.data.material);

        console.log(mtlURL);

        mtlloader.load(mtlURL, (material) => {
          material.preload();
          const loader = new OBJLoader(MANAGER);

          loader.setMaterials(material);

          const blobURLs = [];

          loader.load(
            url,
            (object) => {
              const sceneManager = new SceneManager();
              const [scene, controls] = sceneManager.createScene(
                object.children[0]
              );
              scene.add(object);
              controls.attach(object);

              blobURLs.forEach(URL.revokeObjectURL);

              resolve(object);
            },
            undefined,
            reject
          );
        });
      });
    };
  }

  createObjectURL(data) {
    var binaryData = [];
    binaryData.push(data);
    return URL.createObjectURL(new Blob(binaryData, { type: "model/mtl" }));
  }
}
