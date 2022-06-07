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

  loadTexture(`https://solartextures.b-cdn.net/2k_neptune.jpg`).then(texture => {
    const planet = new THREE.Mesh(
      new THREE.SphereBufferGeometry(1, 32, 32),
      new THREE.MeshBasicMaterial({map: texture})
    );
    
    app.add(planet);
    planet.updateMatrixWorld();
    app.updateMatrixWorld();
  });
  


  return app;
};