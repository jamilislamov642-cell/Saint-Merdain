import * as THREE from 'three';
import { districts, type Location } from './data';
import { catalogLocations } from './data/catalog';
import { roadEdges, roadNodes } from './data/roads';
import { findRoute, type RouteResult } from './lib/routePlanner';

type SelectHandler = (location: Location) => void;
const palette = ['#5e6969','#73706a','#8a8175','#596b70','#806f67','#697878','#927f72','#6b7d7a'];
const mat = (color: string, rough = .8) => new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: .12 });

function addDistrictOverlay(city: THREE.Group, district: typeof districts[number]) {
  const ring = new THREE.Mesh(new THREE.RingGeometry(5.8, 6, 48), new THREE.MeshBasicMaterial({ color: district.color, transparent: true, opacity: .12, side: THREE.DoubleSide }));
  ring.rotation.x = -Math.PI / 2; ring.position.set(district.x, .11, district.z); ring.userData.overlay = true; city.add(ring);
  const beacon = new THREE.Mesh(new THREE.CylinderGeometry(.025, .025, 2.4, 6), new THREE.MeshBasicMaterial({ color: district.color, transparent: true, opacity: .55 }));
  beacon.position.set(district.x, 1.2, district.z); beacon.userData.overlay = true; city.add(beacon);
}

function addLandmark(city: THREE.Group, x: number, z: number, kind: string, color: string) {
  const group = new THREE.Group(); group.position.set(x, 0, z); group.userData.landmark = true;
  if (kind === 'Lighthouse') {
    const tower = new THREE.Mesh(new THREE.CylinderGeometry(.45, .7, 4.8, 10), mat('#b7aa8d')); tower.position.y = 2.4; group.add(tower);
    const lamp = new THREE.Mesh(new THREE.SphereGeometry(.45, 12, 8), new THREE.MeshBasicMaterial({ color })); lamp.position.y = 5; group.add(lamp);
  } else if (kind === 'Airport') {
    const terminal = new THREE.Mesh(new THREE.BoxGeometry(7, .9, 2.6), mat('#8799a0', .4)); terminal.position.y = .45; group.add(terminal);
    const wing = new THREE.Mesh(new THREE.BoxGeometry(1, .25, 10), mat('#526469', .5)); wing.position.y = .7; group.add(wing);
  } else {
    const base = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 2, 3.5, 6), mat('#596a69')); base.position.y = 1.75; group.add(base);
    const cap = new THREE.Mesh(new THREE.ConeGeometry(1.8, 1.6, 6), new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: .12 })); cap.position.y = 4.3; group.add(cap);
  }
  city.add(group);
}

export function createCity(onSelect: SelectHandler) {
  const scene = new THREE.Scene(); scene.background = new THREE.Color('#0b1113'); scene.fog = new THREE.Fog('#0b1113', 62, 190);
  const city = new THREE.Group(); scene.add(city);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(180, 145), mat('#202a28')); ground.rotation.x = -Math.PI / 2; city.add(ground);
  const ocean = new THREE.Mesh(new THREE.PlaneGeometry(80, 145), new THREE.MeshStandardMaterial({ color:'#102a34', roughness:.45, metalness:.3 })); ocean.rotation.x=-Math.PI/2; ocean.position.set(-78,-.08,0); city.add(ocean);
  for(let i=0;i<13;i++){const hill=new THREE.Mesh(new THREE.ConeGeometry(10+i*2,8+i*1.3,7),mat('#263735'));hill.position.set(54+i*2.2,(4+i*.6)/2,-28+i*8);hill.scale.z=2.5;city.add(hill);}
  const roadMat=mat('#171c1d',1), laneMat=new THREE.MeshBasicMaterial({color:'#5c5543'});
  const addRoad=(x:number,z:number,w:number,d:number,rot=0)=>{const r=new THREE.Mesh(new THREE.BoxGeometry(w,.08,d),roadMat);r.position.set(x,.04,z);r.rotation.y=rot;city.add(r);const l=new THREE.Mesh(new THREE.BoxGeometry(w*.82,.012,.06),laneMat);l.position.set(x,.1,z);l.rotation.y=rot;city.add(l);};
  for(let z=-43;z<=43;z+=8)addRoad(0,z,138,2.1); for(let x=-58;x<=52;x+=8)addRoad(x,0,2.1,90,Math.PI/2); addRoad(-34,-1,2.8,90); addRoad(-10,0,3,90); addRoad(25,0,3.2,94,Math.PI/2); addRoad(-8,30,56,2.6,Math.PI/2); addRoad(22,30,32,2.4,.16);
  districts.forEach((district,di)=>{addDistrictOverlay(city,district);const count=di===3?52:20+(di%5)*5;for(let i=0;i<count;i++){const a=i*2.399+di,r=2+(i%7)*1.18,x=district.x+Math.cos(a)*r,z=district.z+Math.sin(a)*r;const central=di===3||district.name==='Glasswater';const w=1.1+(i%5)*.4,depth=1.1+(i%4)*.42,h=central?4+(i%10)*1.35:1.2+(i%8)*.58;const building=new THREE.Mesh(new THREE.BoxGeometry(w,h,depth),mat(palette[(i+di)%palette.length]));building.position.set(x,h/2,z);building.rotation.y=(i%3)*.08;building.userData={district:district.name};city.add(building);if(h>5){const roof=new THREE.Mesh(new THREE.BoxGeometry(w*.7,.14,depth*.7),mat('#202728'));roof.position.set(x,h+.08,z);city.add(roof);}if(i%2===0){const window=new THREE.Mesh(new THREE.BoxGeometry(.035,.32,.05),new THREE.MeshBasicMaterial({color:district.color}));window.position.set(x+w/2+.02,h*.55,z);city.add(window);}}});
  [[-2,13,4,16],[4,10,3,12],[0,8,2.5,10],[-7,7,2.2,9],[12,-9,3.3,11],[28,14,3.6,13]].forEach(([x,z,w,h])=>{const t=new THREE.Mesh(new THREE.BoxGeometry(w,h,w*.8),mat('#39484b'));t.position.set(x,h/2,z);city.add(t);});
  addLandmark(city,-38,-21,'Lighthouse','#e1c77b'); addLandmark(city,35,-29,'Airport','#87b5c8'); addLandmark(city,-15,20,'Terminal','#c9a767'); addLandmark(city,30,-16,'Observatory','#d58b6d'); addLandmark(city,9,-10,'Stadium','#a49ac6');
  const markerGroup=new THREE.Group(); markerGroup.name='markers'; city.add(markerGroup);
  const markerById=new Map<string,THREE.Object3D>();
  catalogLocations.forEach(loc=>{const pin=new THREE.Group();pin.position.set(loc.x,.65,loc.z);pin.userData.location=loc;const stem=new THREE.Mesh(new THREE.CylinderGeometry(.035,.035,.8,6),new THREE.MeshBasicMaterial({color:loc.accent}));stem.position.y=.35;pin.add(stem);const dot=new THREE.Mesh(new THREE.SphereGeometry(.17,10,8),new THREE.MeshBasicMaterial({color:loc.accent}));dot.position.y=.82;pin.add(dot);markerGroup.add(pin);markerById.set(loc.id,pin);});
  const routeGroup=new THREE.Group();routeGroup.name='route';city.add(routeGroup);
  const drawRoute=(route:RouteResult|null)=>{routeGroup.clear();if(!route)return;const points=route.nodes.map(node=>new THREE.Vector3(node.x,.34,node.z));if(points.length<2)return;const curve=new THREE.CatmullRomCurve3(points);const line=new THREE.Mesh(new THREE.TubeGeometry(curve,Math.max(8,points.length*8),.11,6,false),new THREE.MeshBasicMaterial({color:'#dfb56a'}));routeGroup.add(line);points.forEach(point=>{const beacon=new THREE.Mesh(new THREE.SphereGeometry(.22,10,8),new THREE.MeshBasicMaterial({color:'#f2d18a'}));beacon.position.copy(point);routeGroup.add(beacon);});};
  const ambient=new THREE.HemisphereLight('#a0b4b2','#17201f',1.2);scene.add(ambient);const sun=new THREE.DirectionalLight('#e1c08c',2.2);sun.position.set(-30,60,20);scene.add(sun);
  const renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));renderer.shadowMap.enabled=true;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;
  const camera=new THREE.PerspectiveCamera(42,1,.1,320),raycaster=new THREE.Raycaster(),pointer=new THREE.Vector2();let target=new THREE.Vector3(0,0,0),distance=88,azimuth=.72,elevation=.7;const updateCamera=()=>{camera.position.set(target.x+Math.cos(azimuth)*Math.cos(elevation)*distance,target.y+Math.sin(elevation)*distance,target.z+Math.sin(azimuth)*Math.cos(elevation)*distance);camera.lookAt(target);};updateCamera();
  let down=false,lastX=0,lastY=0;renderer.domElement.addEventListener('pointerdown',e=>{down=true;lastX=e.clientX;lastY=e.clientY;renderer.domElement.setPointerCapture(e.pointerId);});renderer.domElement.addEventListener('pointerup',e=>{down=false;renderer.domElement.releasePointerCapture(e.pointerId);});renderer.domElement.addEventListener('pointermove',e=>{if(!down)return;azimuth-=(e.clientX-lastX)*.006;elevation=THREE.MathUtils.clamp(elevation+(e.clientY-lastY)*.006,.22,1.3);lastX=e.clientX;lastY=e.clientY;updateCamera();});renderer.domElement.addEventListener('wheel',e=>{distance=THREE.MathUtils.clamp(distance+e.deltaY*.055,30,150);updateCamera();},{passive:true});renderer.domElement.addEventListener('click',e=>{const r=renderer.domElement.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width*2-1;pointer.y=-(e.clientY-r.top)/r.height*2+1;raycaster.setFromCamera(pointer,camera);const hit=raycaster.intersectObjects(markerGroup.children,true).find(h=>h.object.parent?.userData.location||h.object.userData.location);const loc=(hit?.object.parent?.userData.location||hit?.object.userData.location) as Location|undefined;if(loc)onSelect(loc);});
  const focus=(loc:Pick<Location,'x'|'z'>)=>{target.set(loc.x,0,loc.z);distance=30;updateCamera();};
  const setRoute=(from:Pick<Location,'x'|'z'>,to:Pick<Location,'x'|'z'>)=>{drawRoute(findRoute(from,to,roadNodes,roadEdges));};
  const setLayer=(layer:string,active:boolean)=>{if(layer==='Businesses'||layer==='Nightlife'){markerGroup.visible=active;}if(layer==='City')city.visible=active;};
  const setNight=(night:boolean)=>{scene.background.set(night?'#070b14':'#0b1113');(scene.fog as THREE.Fog).color.set(night?'#070b14':'#0b1113');sun.color.set(night?'#5d739f':'#e1c08c');sun.intensity=night?.8:2.2;ambient.intensity=night?.6:1.2;};
  return {scene,camera,renderer,focus,setRoute,setLayer,setNight,markerCount:catalogLocations.length};
}
