import rinkby from "./Web3.js";
import movement from "./movement.js";
import abi from "../contracts/abi.json" assert { type: "json" };

const scene = new THREE.Scene();
scene.background = new THREE.Color("gray");
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
camera.position.z = 5;
camera.position.set(10, 5, 40);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const geometry_area = new THREE.BoxGeometry(100, 0.01, 50);
const material_area = new THREE.MeshPhongMaterial({ color: "blue" });
const area = new THREE.Mesh(geometry_area, material_area);
scene.add(area);

const mintNft = async () => {
  let nft_name = document.querySelector("#nft_name").value;
  let nft_width = document.querySelector("#nft_width").value;
  let nft_height = document.querySelector("#nft_height").value;
  let nft_depth = document.querySelector("#nft_depth").value;
  let nft_x = document.querySelector("#nft_x").value;
  let nft_y = document.querySelector("#nft_y").value;
  let nft_z = document.querySelector("#nft_z").value;

  if (typeof window.ethereum == "undefined") {
    rej("You should install Metamask");
  }

  let web3 = new Web3(window.ethereum);
  let contract = new web3.eth.Contract(
    abi,
    "0x0d49A7C2a3c66e8bE4C13Ef56187e8cee3DD365E"
  );

  web3.eth.requestAccounts().then((accounts) => {
    contract.methods
      .mint(nft_name, nft_width, nft_height, nft_depth, nft_x, nft_y, nft_z)
      .send({
        from: accounts[0],
        value: "10000000000",
      })
      .then((data) => {
        console.log("NFT is minted");
      });
  });
};
const button = document.querySelector("#mint");
button.addEventListener("click", mintNft);
// const geometry = new THREE.ConeGeometry(5, 20, 32);
// const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
// const cone = new THREE.Mesh(geometry, material);
// scene.add(cone);
// cone.position.set(20, 5, 0);
function animate() {
  // cone.rotation.x += 0.01;
  // cone.rotation.x += 0.02;
  // cone.rotation.z += 0.025;
  //   cube.rotation.x += 0.01;
  //   cube.rotation.x += 0.02;
  //   cube.rotation.z += 0.025;
  if (movement.isPressed(37)) {
    camera.position.x -= 0.5;
  }
  if (movement.isPressed(38)) {
    camera.position.x += 0.5;
    camera.position.y += 0.5;
  }
  if (movement.isPressed(39)) {
    camera.position.x += 0.5;
  }
  if (movement.isPressed(40)) {
    camera.position.x -= 0.5;
    camera.position.y -= 0.5;
  }
  camera.lookAt(area.position);
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
renderer.render(scene, camera);

rinkby.then((result) => {
  result.nft.forEach((object, index) => {
    if (index <= result.supply) {
      const geometry = new THREE.ConeGeometry(object.w, object.h, object.d);
      const material = new THREE.MeshPhongMaterial({ color: 0xffff00 });
      const nft = new THREE.Mesh(geometry, material);
      nft.position.set(object.x, object.y, object.z);
      scene.add(nft);
    }
  });
});
