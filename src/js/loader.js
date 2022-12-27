import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { LoaderUtils, LoadingManager, TextureLoader, MeshStandardMaterial, Scene, Vector3, Vector4, Box3, Color } from "three";
import { SceneManager } from "./scene-manager";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader";

const MANAGER = new LoadingManager();

export class Loader {
  constructor() {
    this.FILETYPES = { UNKNOWN: -1, GLB: 0, GLTF: 1, OBJ:21, FBX: 3 };
    this.filetype = this.FILETYPES.UNKNOWN;
    this.blobURLs = [];
    // { ext:'' }
    //this.data = { material: {}, texture: {} };
  }


  getExtention(fname) {
    return fname.slice((Math.max(0, fname.lastIndexOf(".")) || Infinity) + 1);
  }


  addBlobURL(path, file) {
    const ext = this.getExtention(file.name);
    const url = URL.createObjectURL(file);
    const base_url = LoaderUtils.extractUrlBase(url);
    const pure_path = path.replace(file.name, "");
    const normalized_url = pure_path + decodeURI(url).replace(base_url, "").replace(/^(\.?\/)/, "");
    const blob_obj = { ext: ext, file: file, 
        path: pure_path, 
        url: url, base_url: base_url, normalized_url: normalized_url };

    this.blobURLs.push(blob_obj);
  }


  getBlobsByExt(ext) {
    const ret = [];
    for (let idx = 0; idx < this.blobURLs.length; idx++)
      if (this.blobURLs[idx].ext === ext)
        ret.push(this.blobURLs[idx]);
    return ret;
  }


  detectFileType(fileMap) {
    this.filetype = this.FILETYPES.UNKNOWN;
    Array.from(fileMap).forEach(([path, file]) => {
      const ext = this.getExtention(file.name);
      this.addBlobURL(path, file);
      if (ext === 'glb') {
        this.filetype = this.FILETYPES.GLB;
      }
      else if (ext === 'gltf') {
        this.filetype = this.FILETYPES.GLTF;
      }
      else if (ext === 'obj') {
        this.filetype = this.FILETYPES.OBJ;
      }
      else if (ext === 'fbx') {
        this.filetype = this.FILETYPES.FBX;
      }
    });

    console.log( this.blobURLs );
    return this.filetype;
  }


  load(fileMap) {
    if (this.detectFileType(fileMap) === this.FILETYPES.UNKNOWN) {
      throw new Error("Your files are unsupported");
    }

    if (this.filetype === this.FILETYPES.GLB) {
      this.loadGLB( this.getBlobsByExt('glb') );
    }
    else if (this.filetype === this.FILETYPES.GLTF) {
      this.loadGLB( this.getBlobsByExt('gltf') );
    }
    else if (this.filetype === this.FILETYPES.OBJ) {
      const images_count = this.getBlobsByExt('png').length + this.getBlobsByExt('jpg').length;
      const materials_count = this.getBlobsByExt('mtl').length;
      if ((images_count === 0) || (materials_count === 0)) {
          throw new Error(
              "You also need to add files with .mtl and .jpg/.png extention"
            );
        }
      this.loadOBJ( this.getBlobsByExt('obj') );
    }
    else if (this.filetype === this.FILETYPES.FBX) {
      this.loadFBX( this.getBlobsByExt('fbx') );
    }
  }


  loadGLB(blobs) {
    if (blobs.length === 0)
      return;

    const blob = blobs[0];
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/gltf/');
      loader.setDRACOLoader( dracoLoader );
      loader.load(
        blob.url,
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
            throw new Error(
              "This model contains no scene, and cannot be viewed here. However," +
                " it may contain individual 3D resources."
            );
          }

          scene.add(objects);
          controls.attach(objects);

         // URL.revokeObjectURL(blobURL);

          resolve(gltf);
        },
        undefined,
        reject
      );
    });
  }


  loadTextures() {
    const ret = [];
    const png_list = this.getBlobsByExt('png');
    for (let i=0; i < png_list.length; i++)
      ret.push( new TextureLoader().load(png_list[i].url) );
    const jpg_list = this.getBlobsByExt('jpg');
    for (let i=0; i < jpg_list.length; i++)
      ret.push( new TextureLoader().load(jpg_list[i].url) );
    return ret;
  }


  loadMTL(blobs, object) {
    if (blobs.length === 0)
      return;

    const blob = blobs[0];
    return new Promise((resolve, reject) => {
      const loader = new MTLLoader();
      loader.load(
        blob.url,
        (materials) => {
          console.log("materials: ", materials);
          let texture = null;
          const textures = this.loadTextures();
          if (textures.length > 0)
            texture = textures[0];
          const material = new MeshStandardMaterial( {
                map: texture,
                color: new Color( 0x999999 ),
                //specular: new Color( 0xbbbbbb ),
                //reflectivity: 0.4,
                metallness: 0.1,
                roughness: 0.6
              } );
          object.traverse( (child) => {
            if (child.type === "Mesh") {
              child.material = material;
            } 
          });
        },
        undefined,
        reject
      );
    });
  }


  loadOBJ(blobs) {
    if (blobs.length === 0)
      return;

    const blob = blobs[0];
    return new Promise((resolve, reject) => {
      const loader = new OBJLoader();
      loader.load(
        blob.url,
        (object) => {
          this.removePureObjects(object);
          this.resetScenePosition(object);
          const sceneManager = new SceneManager();
          const [scene, controls] = sceneManager.createScene(
            object.children[0]
          );

          this.loadMTL( this.getBlobsByExt('mtl'), object);

          scene.add(object);
          controls.attach(object);

          //blobURLs.forEach(URL.revokeObjectURL);

          resolve(object);
        },
        undefined,
        reject
      );
    });
  }


  loadFBX(blobs) {
    if (blobs.length === 0)
      return;

    const blob = blobs[0];
    return new Promise((resolve, reject) => {
      const loader = new FBXLoader();
      loader.load(
        blob.url,
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

          //blobURLs.forEach(URL.revokeObjectURL);

          resolve(object);
        },
        undefined,
        reject
      );
    });
  }


  // service methods
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




/*
  uploadGLB(url, fileMap) {
    const baseURL = LoaderUtils.extractUrlBase(url);
//console.log("baseURL: " + baseURL);
    // Load.
    return new Promise((resolve, reject) => {
      // Intercept and override relative URLs.
      MANAGER.setURLModifier((url, path) => {
        console.log("loadGLB.url: ", url);
        console.log("loadGLB.path: ", path);
        const normalizedURL =
          rootPath +
          decodeURI(url)
            .replace(baseURL, "")
            .replace(/^(\.?\/)/, "");
//console.log("normalizedURL: " + normalizedURL);
        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        }
//console.log(path);
console.log("path+url: ", (path || "") + url);
        return (path || "") + url;
      });
  }

  load(fileMap) {
    if (this.detectFileType(fileMap) === this.FILETYPES.UNKNOWN) {
      // unsupported type
      return;
    }

    let rootFile;
    let rootPath;
    Array.from(fileMap).forEach(([path, file]) => {
      console.log(path);
      console.log(file);
      if (file.name.match(/\.(gltf|glb)$/)) {
        console.log("it's gltf");
        rootFile = file;
        rootPath = path.replace(file.name, "");
        this.filetype = this.FILETYPES.GLB;
      }
      if (file.name.match(/\.(obj)$/)) {
        console.log("it's obj");
        rootFile = file;
        rootPath = path.replace(file.name, "");
        this.filetype = this.FILETYPES.OBJ;
      }
      if (file.name.match(/\.(fbx)$/)) {
        console.log("it's fbx");
        rootFile = file;
        rootPath = path.replace(file.name, "");
        this.filetype = this.FILETYPES.FBX;
      }
    });
    this.view(rootFile, rootPath, fileMap);
  }


  view(rootFile, rootPath, fileMap) {
    console.log("view.rootFile", rootFile);
    console.log("view.rootPath", rootPath);
    console.log("view.fileMap", fileMap);

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
        console.log("loadGLB.url: ", url);
        console.log("loadGLB.path: ", path);
        const normalizedURL =
          rootPath +
          decodeURI(url)
            .replace(baseURL, "")
            .replace(/^(\.?\/)/, "");
//console.log("normalizedURL: " + normalizedURL);
        if (assetMap.has(normalizedURL)) {
          const blob = assetMap.get(normalizedURL);
          const blobURL = URL.createObjectURL(blob);
          blobURLs.push(blobURL);
          return blobURL;
        }

console.log("path+url: ", (path || "") + url);
        return (path || "") + url;
      });

      const loader = new GLTFLoader(MANAGER);

      const blobURLs = [];

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

          console.log(material);

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
*/
}
