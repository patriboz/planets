import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, useFrame} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

export default () => {
  const app = useApp();

  app.name = 'Planet';

  let planet = undefined;
  const planetRotationPerFrame = new THREE.Quaternion(0.0005, -2e-7, 0.0005, 0.9999998);

  const textureLoader = new THREE.TextureLoader();
  const loadTexture = url => {
    return new Promise(resolve => {
      textureLoader.load(url, resolve)
    })
  }

  loadTexture(`https://patriboz.github.io/planets/assets/textures/aruba.jpg`).then(texture => {
    planet = new THREE.Mesh(
      new THREE.SphereBufferGeometry(1, 32, 32),
      new THREE.MeshStandardMaterial({map: texture})
    );
    
    app.add(planet);
    planet.updateMatrixWorld();
    app.updateMatrixWorld();
  });

  useFrame(({ timeDiff, timestamp }) => {

    if(typeof planet !== "undefined") {
      planet.quaternion.premultiply(planetRotationPerFrame);
      planet.updateMatrixWorld();
      app.updateMatrixWorld();
    }
    
  });
  
  return app;
};