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

    var marker = new THREE.Object3D();
    scene.add(marker);

    var cover = new THREE.MeshNormalMaterial();
    var body = new THREE.SphereGeometry(100);
    var avatar = new THREE.Mesh(body, cover);
    marker.add(avatar);

    var hand = new THREE.SphereGeometry(50);

    var right_hand = new THREE.Mesh(hand, cover);
    right_hand.position.set(-150, 0, 0);
    avatar.add(right_hand);

    var left_hand = new THREE.Mesh(hand, cover);
    left_hand.position.set(150, 0, 0);
    avatar.add(left_hand);

    var foot = new THREE.SphereGeometry(50);

    var right_foot = new THREE.Mesh(foot, cover);
    right_foot.position.set(-75, -125, 0);
    avatar.add(right_foot);

    var left_foot = new THREE.Mesh(foot, cover);
    left_foot.position.set(75, -120, 0);
    avatar.add(left_foot);

    marker.add(camera);

    makeTreeAt(500, 0);
    makeTreeAt(-500, 0);
    makeTreeAt(750, -1000);
    makeTreeAt(-750, -1000);

    function makeTreeAt(x, z) {
      var trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(50, 50, 200),
        new THREE.MeshBasicMaterial({ color: 0xa0522d })
      );

      var top = new THREE.Mesh(
        new THREE.SphereGeometry(150),
        new THREE.MeshBasicMaterial({ color: 0x228b22 })
      );
      top.position.y = 175;
      trunk.add(top);

      trunk.position.set(x, -75, z);
      scene.add(trunk);
    }

    //render();
    var is_cartwheeling = false;
    var is_flipping = false;
    function animate() {
      requestAnimationFrame(animate);
      if (is_cartwheeling) {
        avatar.rotation.z = avatar.rotation.z + 0.05;
      }
      if (is_flipping) {
        avatar.rotation.x = avatar.rotation.x + 0.05;
      }
      render();
    }

    animate();

    document.addEventListener("keydown", function (event) {
      var code = event.keyCode;
      if (code == 37) marker.position.x = marker.position.x - 5; //left
      if (code == 38) marker.position.x = marker.position.z - 5; //up
      if (code == 39) marker.position.x = marker.position.x + 5; //right
      if (code == 40) marker.position.z = marker.position.z + 5; // down

      if (code == 67) is_cartwheeling = !is_cartwheeling; // C
      if (code == 70) is_flipping = !is_flipping; // F
    });
  }

  function render() {
    renderer.render(scene, camera);
    //requestAnimationFrame(render);
  }

  window.onload = initScene;

  return {
    scene: scene,
  };
})();
