import React, { useState, useRef, Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls, Html, useProgress } from "@react-three/drei";


function Box(props) {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => {
        mesh.current.rotation.y += 0.01
        mesh.current.rotation.x += 0.01
    })
  
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(event) => setActive(!active)}
        onPointerOver={(event) => setHover(true)}
        onPointerOut={(event) => setHover(false)}>
        <boxGeometry args={[3, 3, 3]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}

const Model = () => {
    const fbx = useLoader(FBXLoader, "./DoughNut_FBX.fbx");
    console.log(fbx)
    useFrame(() => {
        fbx.rotation.y += 0.006
        fbx.rotation.x += 0.006
    })
    return (
      <>
        <primitive object={fbx} scale={0.05} />
      </>
    );
};

function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}

function ModelPage() {
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>
            <Canvas style={{width: '100vw', height: '100vh'}}>
              {/* <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <Box position={[-2.8, 0, 0]} />
              <Box position={[2.8, 0, 0]} /> */}

                <Suspense fallback={<Loader/>}>
                  {/* <ambientLight /> */}
                  <pointLight position={[10, 30, 100]} />
                  <pointLight position={[-10, 40, -30]} />
                  <pointLight position={[150, 20, -50]} />
                  <Model />
                  <OrbitControls />
                </Suspense>
            </Canvas>
        </div>
    )
}

export default ModelPage