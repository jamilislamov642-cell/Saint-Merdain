import * as THREE from 'three';
import { districts, locations, type Location } from './data';

type SelectHandler = (location: Location) => void;

const palette = ['#5e6969', '#73706a', '#8a8175', '#596b70', '#806f67', '#697878', '#927f72', '#6b7d7a'];
const material = (color: string, rough = 0.8) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0.12 });

export function createCity(onSelect: SelectHandler) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0b1113');
  scene.fog = new THREE.Fog('#0b1113', 62, 180);

  const city = new THREE.Group();
  scene.add(city);

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(150, 125), material('#202a28'));
  ground.rotation.x = -Math.PI / 2;
  city.add(ground);

  const ocean = new THREE.Mesh(
    new THREE.PlaneGeometry(80, 125),
    new THREE.MeshStandardMaterial({ color: '#102a34', roughness: 0.45, metalness: 0.3 })
  );
  ocean.rotation.x = -Math.PI / 2;
  ocean.position.set(-75, -0.08, 0);
  city.add(ocean);

  for (let i = 0; i < 12; i += 1) {
    const hill = new THREE.Mesh(new THREE.ConeGeometry(10 + i * 2, 8 + i * 1.3, 7), material('#263735'));
    hill.position.set(52 + i * 2.2, (4 + i * 0.6) / 2, -24 + i * 8);
    hill.scale.z = 2.5;
    city.add(hill);
  }

  const roadMat = new THREE.MeshStandardMaterial({ color: '#171c1d', roughness: 1 });
  const laneMat = new THREE.MeshBasicMaterial({ color: '#5c5543' });

  const addRoad = (x: number, z: number, w: number, d: number, rot = 0) => {
    const road = new THREE.Mesh(new THREE.BoxGeometry(w, 0.08, d), roadMat);
    road.position.set(x, 0.04, z);
    road.rotation.y = rot;
    city.add(road);

    const line = new THREE.Mesh(new THREE.BoxGeometry(w * 0.82, 0.012, 0.06), laneMat);
    line.position.set(x, 0.1, z);
    line.rotation.y = rot;
    city.add(line);
  };

  for (let z = -35; z <= 35; z += 8) addRoad(0, z, 120, 2.1);
  for (let x = -50; x <= 45; x += 8) addRoad(x, 0, 2.1, 75, Math.PI / 2);
  addRoad(-34, -1, 2.8, 78);
  addRoad(-10, 0, 3, 78);
  addRoad(25, 0, 3.2, 82, Math.PI / 2);
  addRoad(-8, 30, 56, 2.6, Math.PI / 2);
  addRoad(22, 30, 32, 2.4, 0.16);

  const bridge = new THREE.Mesh(new THREE.BoxGeometry(36, 0.45, 5), roadMat);
  bridge.position.set(-52, 0.32, 8);
  bridge.rotation.y = 0.13;
  city.add(bridge);

  for (let i = 0; i < 9; i += 1) {
    const p = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 3.5, 8), material('#65706b'));
    p.position.set(-66 + i * 4, 1, 8 - i * 0.5);
    city.add(p);
  }

  districts.forEach((district, di) => {
    const count = di === 3 ? 42 : 18 + (di % 5) * 4;
    for (let i = 0; i < count; i += 1) {
      const angle = i * 2.399 + di;
      const radius = 2 + (i % 6) * 1.25;
      const x = district.x + Math.cos(angle) * radius;
      const z = district.z + Math.sin(angle) * radius;
      const central = di === 3;
      const w = 1.2 + (i % 4) * 0.45;
      const depth = 1.2 + (i % 3) * 0.55;
      const h = central ? 4 + (i % 9) * 1.5 : 1.2 + (i % 7) * 0.65;

      const block = new THREE.Mesh(new THREE.BoxGeometry(w, h, depth), material(palette[(i + di) % palette.length]));
      block.position.set(x, h / 2, z);
      block.userData = { district: district.name };
      city.add(block);

      if (h > 4) {
        const roof = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.12, depth * 0.72), material('#22292a'));
        roof.position.set(x, h + 0.08, z);
        city.add(roof);
      }

      if (i % 3 === 0) {
        const neon = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.42, 0.04), new THREE.MeshBasicMaterial({ color: district.color }));
        neon.position.set(x + w / 2 + 0.02, h * 0.58, z);
        city.add(neon);
      }
    }
  });

  const towers = [
    [-2, 13, 4, 16],
    [4, 10, 3, 12],
    [0, 8, 2.5, 10],
    [-7, 7, 2.2, 9],
    [12, -9, 3.3, 11],
    [28, 14, 3.6, 13]
  ] as const;

  towers.forEach(([x, z, w, h]) => {
    const tower = new THREE.Mesh(new THREE.BoxGeometry(w, h, w * 0.8), material('#39484b'));
    tower.position.set(x, h / 2, z);
    city.add(tower);
  });

  locations.forEach((loc) => {
    const pin = new THREE.Group();
    pin.position.set(loc.x, 0.65, loc.z);
    pin.userData.location = loc;

    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.8, 6), new THREE.MeshBasicMaterial({ color: loc.accent }));
    stem.position.y = 0.35;
    pin.add(stem);

    const dot = new THREE.Mesh(new THREE.SphereGeometry(0.17, 12, 8), new THREE.MeshBasicMaterial({ color: loc.accent }));
    dot.position.y = 0.82;
    pin.add(dot);
    city.add(pin);
  });

  const ambient = new THREE.HemisphereLight('#a0b4b2', '#17201f', 1.2);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight('#e1c08c', 2.2);
  sun.position.set(-30, 60, 20);
  scene.add(sun);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 300);
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  let target = new THREE.Vector3(0, 0, 0);
  let distance = 88;
  let azimuth = 0.72;
  let elevation = 0.7;

  const updateCamera = () => {
    camera.position.set(
      target.x + Math.cos(azimuth) * Math.cos(elevation) * distance,
      target.y + Math.sin(elevation) * distance,
      target.z + Math.sin(azimuth) * Math.cos(elevation) * distance
    );
    camera.lookAt(target);
  };

  updateCamera();

  let down = false;
  let lastX = 0;
  let lastY = 0;

  renderer.domElement.addEventListener('pointerdown', (event) => {
    down = true;
    lastX = event.clientX;
    lastY = event.clientY;
  });

  window.addEventListener('pointerup', () => {
    down = false;
  });

  window.addEventListener('pointermove', (event) => {
    if (!down) return;
    azimuth -= (event.clientX - lastX) * 0.006;
    elevation = THREE.MathUtils.clamp(elevation + (event.clientY - lastY) * 0.006, 0.22, 1.3);
    lastX = event.clientX;
    lastY = event.clientY;
    updateCamera();
  });

  renderer.domElement.addEventListener('wheel', (event) => {
    distance = THREE.MathUtils.clamp(distance + event.deltaY * 0.055, 30, 145);
    updateCamera();
  }, { passive: true });

  renderer.domElement.addEventListener('click', (event) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);

    const hit = raycaster.intersectObjects(city.children, true).find((object) => {
      return object.object.parent?.userData.location || object.object.userData.location;
    });

    const loc = (hit?.object.parent?.userData.location || hit?.object.userData.location) as Location | undefined;
    if (loc) onSelect(loc);
  });

  const focus = (loc: Pick<Location, 'x' | 'z'>) => {
    target.set(loc.x, 0, loc.z);
    distance = 30;
    updateCamera();
  };

  const setNight = (night: boolean) => {
    scene.background.set(night ? '#070b14' : '#0b1113');
    if (scene.fog) scene.fog.color.set(night ? '#070b14' : '#0b1113');
    sun.color.set(night ? '#5d739f' : '#e1c08c');
    sun.intensity = night ? 0.8 : 2.2;
    ambient.intensity = night ? 0.6 : 1.2;
  };

  return { scene, camera, renderer, city, focus, setNight };
}
