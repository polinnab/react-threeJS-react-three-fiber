import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls, Html, useProgress } from "@react-three/drei";




// 3d model and loader
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
// 3d model and loader

function DonutPage() {
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>
            <Canvas style={{width: '100vw', height: '100vh'}}>
              {/* <ambientLight /> */}
              <pointLight position={[10, 10, 10]} />
                <Suspense fallback={<Loader/>}>
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

export default DonutPage