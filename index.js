import * as THREE from 'three';
import metaversefile from 'metaversefile';
const {useApp, useFrame} = metaversefile;

const baseUrl = import.meta.url.replace(/(\/)[^\/\\]*$/, '$1');

export default () => {
  const app = useApp();

  app.name = 'Planet';

  const planet = undefined;
  const planetRotationPerFrame = new THREE.Quaternion(0.4207355, -0.2298488, 0.4207355, 0.7701512);

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

    if(planet) {
      planet.quaternion.premultiply(planetRotationPerFrame);
console.log(planet.quaternion);
      planet.updateMatrixWorld();
      app.updateMatrixWorld();
    }
    
  });
  
  return app;
};