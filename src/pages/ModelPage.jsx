import React, { useState, useRef, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OrbitControls, Html, useProgress } from "@react-three/drei";
import * as THREE from "three";
import meshesJSON from "../jsonData/boxesHart.json"


function Boxes(props) {
    // This reference will give us direct access to the mesh
    const ref = useRef({})

    console.log(meshesJSON)
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [secondAnimation, setSecondAnimation] = useState(false)
    const [thirdAnimation, setThirdAnimation] = useState(false)
    const [forthAnimation, setForthAnimation] = useState(false)

    const vectors = []
    meshesJSON.forEach(mesh => {
      const vec = new THREE.Vector3(...mesh.finish_position)
      vectors.push(vec)
    })
    console.log(vectors)

    const vectorsBack = []
    meshesJSON.forEach(mesh => {
      const vec = new THREE.Vector3(...mesh.start_position)
      vectorsBack.push(vec)
    })

    useEffect(() => {
      console.log('ti,er')
      setTimeout(() => {
        setSecondAnimation(true)
      }, 5000)

      setTimeout(() => {
        setSecondAnimation(false)
        setThirdAnimation(true)
      }, 10000)

      setTimeout(() => {
        setThirdAnimation(false)
        setForthAnimation(true)
      }, 13000)
    }, [])

    // Change position/roration... meshes every frame, this is outside of React without overhead
    useFrame(() => {
      meshesJSON.forEach((mesh, index) => {
        // Rotate every mesh 
        const key = index.toString()
        ref.current[key].rotation.y += 0.01
        ref.current[key].rotation.x += 0.01

        // Move every mesh from point to point by vector
        if (!secondAnimation) {
          ref.current[key].position.lerp(vectors[index], 0.01)
        }

        if (secondAnimation) {
          ref.current[key].position.z += 0.05
          // ref.current[key].position.lerp(vectorsBack[index], 0.001)
        }

        // if (thirdAnimation) {
        //   ref.current[key].position.lerp(vectors[index], 0.01)
        // }

        // if (forthAnimation && ref.current[key].position.z < 2) {
        //   ref.current[key].position.z += 0.05
        // }
      }) 
    })
  
    return (
      <>
        {meshesJSON.map((mesh, idx) => {
          return(<mesh
          {...props}
          key={idx}
          position={mesh.start_position}
          ref={element => (ref.current[idx] = element)}
          scale={active ? 0.5 : .1}
          onClick={(event) => setActive(!active)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={hovered ? 'red' : 'hotpink'} />
          </mesh>)
        })}
      </>
    )
}

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

function ModelPage() {
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>
            <Canvas style={{width: '100vw', height: '100vh'}}>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />

              <Boxes />
                {/* <Suspense fallback={<Loader/>}>
                  <pointLight position={[10, 30, 100]} />
                  <pointLight position={[-10, 40, -30]} />
                  <pointLight position={[150, 20, -50]} />
                  <Model />
                  <OrbitControls />
                </Suspense> */}
            </Canvas>
        </div>
    )
}

export default ModelPage