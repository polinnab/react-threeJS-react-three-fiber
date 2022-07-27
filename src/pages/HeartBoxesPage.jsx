import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import meshesJSON from "../jsonData/boxesHart.json"

function Boxes({mesh, setHeart}) {
    // This reference will give us direct access to the mesh
    const ref = useRef()

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    const [secondAnimation, setSecondAnimation] = useState(false)


    const vector = new THREE.Vector3(...mesh.finish_position)

    const vectorBack = new THREE.Vector3(...mesh.start_position)

    useEffect(() => {
      setTimeout(() => {
        setSecondAnimation(true)
      }, 5000)
    }, [])

    // Change position/roration... meshe every frame, this is outside of React without overhead
    useFrame(() => {
        ref.current.rotation.y += 0.01
        ref.current.rotation.x += 0.01

        if (!secondAnimation) {
          ref.current.position.lerp(vector, 0.01)
        }

        if (secondAnimation && !setHeart) {
          ref.current.position.lerp(vectorBack, 0.001)
        }

        if(setHeart && secondAnimation) {
          ref.current.position.lerp(vector, 0.01)
        }
    })
  
    return (
      <>
        <mesh
          position={mesh.start_position}
          ref={ref}
          scale={active ? 0.2 : .1}
          onClick={(event) => setActive(!active)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={hovered ? 'hotpink' : mesh.color} roughness={0.7}/>
          </mesh>
      </>
    )
}

function HeartBoxesPage() {
    const [isClicked, setIsClicked] = useState(false)
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>
            <button className="btn btn-primary" style={{position: "absolute", top: '250px'}} onClick={() => setIsClicked(prev => !prev)}>Get back heart</button>
            <Canvas style={{width: '100vw', height: '100vh', backgroundColor: '#383737'}}>
              <ambientLight />
              {/* <pointLight position={[10, 5, 400]}  color='#f9faf7'/>
              <pointLight position={[10, -15, 700]} color='#0d6efd'/>
              <pointLight position={[-10, 50, 300]}  color='#4caafc'/>
              <pointLight position={[-10, -20, 900]} color='#f7f5fa'/>
              <pointLight position={[0, 0, 400]}  color='#e02f7f'/> */}


                {meshesJSON.map((mesh, index) => {
                    return(
                        <Boxes key={index} mesh={mesh} setHeart={isClicked}/>
                    )
                })}
            </Canvas>
        </div>
    )
}

export default HeartBoxesPage