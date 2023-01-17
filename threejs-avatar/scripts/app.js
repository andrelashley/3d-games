var example = (function () {
  "use strict";

  var scene = new THREE.Scene(),
    renderer = window.WebGLRenderingContext
      ? new THREE.WebGLRenderer()
      : new THREE.CanvasRenderer(),
    light = new THREE.AmbientLight(0xffffff),
    camera,
    box;

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    scene.add(light);

    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );

    camera.position.z = 500;
    scene.add(camera);

    var shape = new THREE.SphereGeometry(100, 20, 15);
    var cover = new THREE.MeshNormalMaterial();
    var ball = new THREE.Mesh(shape, cover);

    scene.add(ball);
    ball.position.set(-250, -250, -250);

    var shape = new THREE.CubeGeometry(300, 100, 20);
    var cover = new THREE.MeshNormalMaterial();
    var box = new THREE.Mesh(shape, cover);
    scene.add(box);
    box.rotation.set(0.5, 0.5, 0);
    box.position.set(250, 250, -250);

    var shape = new THREE.CylinderGeometry(1, 100, 100, 4);
    var cover = new THREE.MeshNormalMaterial();
    var tube = new THREE.Mesh(shape, cover);
    scene.add(tube);
    tube.rotation.set(0.5, 0, 0);
    tube.position.set(250, -250, -250);

    var shape = new THREE.PlaneGeometry(300, 100);
    var cover = new THREE.MeshNormalMaterial();
    var ground = new THREE.Mesh(shape, cover);
    scene.add(ground);
    ground.rotation.set(0.5, 0, 0);
    ground.position.set(-250, -250, -250);

    var shape = new THREE.TorusGeometry(100, 25, 8, 25, 3.14);
    var cover = new THREE.MeshNormalMaterial();
    var donut = new THREE.Mesh(shape, cover);
    scene.add(donut);

    var clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);
      var t = clock.getElapsedTime();

      ball.rotation.set(t, 2*t, 0);
      box.rotation.set(t, 2 * t, 0);
      tube.rotation.set(t, 2 * t, 0);
      ground.rotation.set(t, 2 * t, 0);
      donut.rotation.set(t, 2 * t, 0);


      render();
    }

    animate();
  }

  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene,
  };
})();
