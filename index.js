import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

export default () => {
  const app = useApp();

  app.name = 'Planet';

  const textureLoader = new THREE.TextureLoader();
  const loadTexture = url => {
    return new Promise(resolve => {
      textureLoader.load(url, resolve)
    })
  }

  const planetMatrix = new THREE.Matrix4().compose(
    new THREE.Vector3(100, 100, 100),
    new THREE.Quaternion(0, 0, 0, 1),
    new THREE.Vector3(10, 10, 10)
  );

  loadTexture(`https://solartextures.b-cdn.net/2k_mercury.jpg`).then(texture => {
    const planet = new THREE.Mesh(
      new THREE.SphereBufferGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({map: texture})
    );
    
    planet.applyMatrix4(planetMatrix);
    app.add(planet);
    planet.updateMatrixWorld();
    app.updateMatrixWorld();
  });
  


  return app;
};