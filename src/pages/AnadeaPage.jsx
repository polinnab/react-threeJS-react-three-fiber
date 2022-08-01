import React, { Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; 
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";

const colors = [
  {id: 1, title: 'Original', color: 0xD8232A, heshColor: '#D8232A'},
  {id: 2, title: 'Anadea Pink', color: 0xdc296c, heshColor: '#DC296C'},
  {id: 3, title: 'Yellow', color: 0xFBEA20, heshColor: '#FFEB2A'},
  {id: 4, title: 'Azure', color: 0x089BF9, heshColor: '#089BF9'},
]

// 3d model and loader
const Model = ({meshColor}) => {
    const material = new THREE.MeshStandardMaterial({color: meshColor, metalness: 0.7})
    const obj = useLoader(OBJLoader, "./anadea.obj");
    console.log(obj)
    obj.rotation.x = 1.2
    obj.rotation.z = 0.2
    obj.position.y = -1.3
    obj.position.x = -2.9

    obj.traverse((child) => {
      child.material = material
    })

    // TODO: change start coordinate position 
    useFrame(() => {
      // obj.rotation.y += 0.006
        // fbx.rotation.x += 0.006
    })
    return (
      <>
        <primitive object={obj} scale={28}/>
      </>
    );
};

const ModelFBX = () => {
  const fbx = useLoader(FBXLoader, "./anadea2.fbx");
  console.log(fbx)
  fbx.rotation.x = 1.2
  fbx.rotation.z = 0.2
  fbx.position.y = -1.2
  fbx.position.x = -4.9

  // TODO: change start coordinate position 
  useFrame(() => {
    // obj.rotation.y += 0.006
      // fbx.rotation.x += 0.006
  })
  return (
    <>
      <primitive object={fbx} scale={0.3}/>
    </>
  );
};

const ModelGLB = () => {
  const glb = useLoader(GLTFLoader, "./anadea.glb");
  console.log(glb)

  // TODO: change start coordinate position 
  useFrame(() => {
    // obj.rotation.y += 0.006
      // fbx.rotation.x += 0.006
  })
  return (
    <>
      <Suspense fallback={null} >
        <primitive object={glb.scene} scale={35} position={[-5, -2, 0]} rotation={[0.9, -0.1, .3]}/>
      </Suspense>
    </>
  );
};

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}
// 3d model and loader

function AnadeaPage() {
  const [color, setColor] = useState(colors[0].color)
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>

            <div style={{position: "absolute", right: '150px', top: '100px', display: 'flex', flexDirection: 'column'}}>
              <h4>Color logo</h4>
              {colors.map(color => {
                return(
                  <button key={color.id} className="btn" 
                  style={{margin: '10px', backgroundColor: color.heshColor, color: '#ffffff'}}
                  type="button"
                  onClick={() => setColor(color.color)}
                  >{color.title}</button>
                )
              })}
            </div>
            <Canvas style={{width: '100vw', height: '100vh'}}>
              {/* <ambientLight /> */}
              <pointLight position={[10, 10, 10]} />
                <Suspense fallback={<Loader/>}>
                  {/* <ambientLight></ambientLight> */}
                  <pointLight position={[10, 30, 100]} />
                  <pointLight position={[-10, 40, -30]} />
                  <pointLight position={[50, 20, -50]} />
                  {/* <Model meshColor={color}/> */}
                  {/* <ModelFBX/> */}
                  <ModelGLB></ModelGLB>
                  <OrbitControls />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default AnadeaPage