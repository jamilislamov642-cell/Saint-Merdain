import * as THREE from 'three';
import { districts, locations, type Location } from './data';

type SelectHandler = (location: Location) => void;
const palette = ['#5e6969','#73706a','#8a8175','#596b70','#806f67','#697878','#927f72'];
function mat(color: string, rough = .8) { return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: .12 }); }

export function createCity(onSelect: SelectHandler) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#0b1113');
  scene.fog = new THREE.Fog('#0b1113', 62, 180);
  const city = new THREE.Group(); scene.add(city);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(150, 125), mat('#202a28'));
  ground.rotation.x = -Math.PI / 2; city.add(ground);
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(80, 125), new THREE.MeshStandardMaterial({color:'#102a34', roughness:.45, metalness:.3}));
  ocean.rotation.x = -Math.PI / 2; ocean.position.set(-75, -.08, 0); city.add(ocean);
  // contour hills at the eastern edge
  for (let i=0;i<10;i++) { const hill = new THREE.Mesh(new THREE.ConeGeometry(10+i*2, 8+i*1.3, 7), mat('#263735')); hill.position.set(52+i*2.2, (4+i*.6)/2, -24+i*8); hill.scale.z=2.5; city.add(hill); }
  const roadMat = new THREE.MeshStandardMaterial({color:'#171c1d', roughness:1});
  const roadLine = new THREE.MeshBasicMaterial({color:'#5c5543'});
  const addRoad = (x:number,z:number,w:number,d:number,rot=0) => { const r=new THREE.Mesh(new THREE.BoxGeometry(w,.08,d),roadMat); r.position.set(x,.04,z);r.rotation.y=rot;city.add(r); const l=new THREE.Mesh(new THREE.BoxGeometry(w*.82,.012,.06),roadLine);l.position.set(x,.1,z);l.rotation.y=rot;city.add(l); };
  for(let z=-35;z<=35;z+=8) addRoad(0,z,120,2.1); for(let x=-50;x<=45;x+=8) addRoad(x,0,2.1,75,Math.PI/2);
  addRoad(-34,-1,2.8,78); addRoad(-10,0,3,78); addRoad(25,0,3.2,82,Math.PI/2);
  // bridge to the offshore industrial island
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(36,.45,5),roadMat); bridge.position.set(-52,.32,8); bridge.rotation.y=.13; city.add(bridge);
  for(let i=0;i<9;i++){const p=new THREE.Mesh(new THREE.CylinderGeometry(.18,.18,3.5,8),mat('#65706b'));p.position.set(-66+i*4,1,8-i*.5);city.add(p);}
  // distinct building clusters, kept as individual meshes for a future instancing pass
  districts.forEach((district, di) => {
    const count = di === 3 ? 34 : 16 + di % 5 * 3;
    for(let i=0;i<count;i++) {
      const angle = i*2.399 + di; const radius = 2 + (i%6)*1.25;
      const x=district.x+Math.cos(angle)*radius; const z=district.z+Math.sin(angle)*radius;
      const central=di===3; const w=1.2+(i%4)*.45; const depth=1.2+(i%3)*.55; const h=central ? 4+(i%9)*1.5 : 1.2+(i%7)*.65;
      const b=new THREE.Mesh(new THREE.BoxGeometry(w,h,depth),mat(palette[(i+di)%palette.length])); b.position.set(x,h/2,z); b.userData={district:district.name}; city.add(b);
      if (h>4) { const roof=new THREE.Mesh(new THREE.BoxGeometry(w*.72,.12,depth*.72),mat('#22292a'));roof.position.set(x,h+.08,z);city.add(roof); }
      if(i%3===0){const neon=new THREE.Mesh(new THREE.BoxGeometry(.035,.42,.04),new THREE.MeshBasicMaterial({color:district.color}));neon.position.set(x+w/2+.02,h*.58,z);city.add(neon);}
    }
  });
  // main tower silhouettes
  [[-2,13,4,16],[4,10,3,12],[0,8,2.5,10],[-7,7,2.2,9]].forEach(([x,z,w,h])=>{const t=new THREE.Mesh(new THREE.BoxGeometry(w,h,w*.8),mat('#39484b'));t.position.set(x,h/2,z);city.add(t);});
  locations.forEach((loc) => {
    const pin = new THREE.Group(); pin.position.set(loc.x,.65,loc.z); pin.userData.location=loc;
    const stem=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.8,6),new THREE.MeshBasicMaterial({color:loc.accent})); stem.position.y=.35; pin.add(stem);
    const dot=new THREE.Mesh(new THREE.SphereGeometry(.17,12,8),new THREE.MeshBasicMaterial({color:loc.accent})); dot.position.y=.82; pin.add(dot); city.add(pin);
  });
  const ambient=new THREE.HemisphereLight('#a0b4b2','#17201f',1.2); scene.add(ambient);
  const sun=new THREE.DirectionalLight('#e1c08c',2.2);sun.position.set(-30,60,20);scene.add(sun);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'}); renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  const camera=new THREE.PerspectiveCamera(42,1,.1,300);camera.position.set(63,52,63);camera.lookAt(0,0,0);
  const raycaster=new THREE.Raycaster(); const pointer=new THREE.Vector2();
  let target=new THREE.Vector3(0,0,0), distance=88, azimuth=.72, elevation=.7;
  const updateCamera=()=>{ camera.position.set(target.x+Math.cos(azimuth)*Math.cos(elevation)*distance,target.y+Math.sin(elevation)*distance,target.z+Math.sin(azimuth)*Math.cos(elevation)*distance);camera.lookAt(target);}; updateCamera();
  let down=false,lastX=0,lastY=0;
  renderer.domElement.addEventListener('pointerdown',e=>{down=true;lastX=e.clientX;lastY=e.clientY;});
  window.addEventListener('pointerup',()=>down=false); window.addEventListener('pointermove',e=>{if(!down)return; azimuth-=(e.clientX-lastX)*.006;elevation=THREE.MathUtils.clamp(elevation+(e.clientY-lastY)*.006,.22,1.3);lastX=e.clientX;lastY=e.clientY;updateCamera();});
  renderer.domElement.addEventListener('wheel',e=>{distance=THREE.MathUtils.clamp(distance+e.deltaY*.055,30,145);updateCamera();},{passive:true});
  renderer.domElement.addEventListener('click',e=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=((e.clientX-r.left)/r.width)*2-1;pointer.y=-((e.clientY-r.top)/r.height)*2+1;raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(city.children,true).find(h=>h.object.parent?.userData.location || h.object.userData.location);const loc=(hit?.object.parent?.userData.location || hit?.object.userData.location) as Location|undefined;if(loc)onSelect(loc);});
  return {scene,camera,renderer,city,updateCamera,focus:(loc:Location)=>{target.set(loc.x,0,loc.z);distance=28;updateCamera();},setNight:(night:boolean)=>{scene.background.set(night?'#070b14':'#0b1113');scene.fog?.color.set(night?'#070b14':'#0b1113');sun.color.set(night?'#5d739f':'#e1c08c');sun.intensity=night?.8:2.2;ambient.intensity=night?.6:1.2;}};
}
