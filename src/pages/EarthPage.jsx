import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from "three";
import { Group, ShaderMaterial, TextureLoader } from "three";
// import vertexShader from "../shaders/vertex.glsl"


const vertexShader = `
  varying vec2 vertexUV;
  varying vec3 vertexNormal;
  void main(){
    vertexUV = uv;
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`
const fragmentShader = `
  uniform sampler2D globeTexture;
  varying vec2 vertexUV;
  varying vec3 vertexNormal;
  void main(){
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 1.5);
    gl_FragColor = vec4(atmosphere + texture2D(globeTexture, vertexUV).xyz, 1.0);
  }`

const atmosphereVertexShader = `
  varying vec3 vertexNormal;
  void main(){
    vertexNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`
const atmosphereFragmentShader = `
  varying vec3 vertexNormal;
  void main(){
    float intensity = pow(0.6 - dot(vertexNormal, vec3(0.0, 0.0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
  }`
console.log(vertexShader)

function Earth({mesh, setHeart}) {
    // This reference will give us direct access to the mesh
    const refSphere = useRef()
    const refAtmosphere = useRef()
    const groupRef = useRef()

    // Set up state for the hovered and active state
    const [mouse, setMouse] = useState({
      x: undefined,
      y: undefined
    })

    window.addEventListener('mousemove', (event) => {
      setMouse({x: (event.clientX / window.innerWidth) * 2 - 1, y: (event.clientY / window.innerHeight) * 2 - 1})
    })

    console.log(mouse)

    // Change position/roration... meshe every frame, this is outside of React without overhead
    useFrame(() => {
        refSphere.current.rotation.y += 0.001
        if(mouse.x) {
          groupRef.current.rotation.y = mouse.x * 0.5
        }
    })

    const mapTexture = useLoader(TextureLoader, "/earth-uv-map.jpeg")
    return (
      <>
      <group ref={groupRef}>
        <mesh
          position={[0, 0, 0]}
          ref={refSphere}
          scale={.4}>
          <sphereGeometry args={[5, 64, 64]} />
          <shaderMaterial attach='material' vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{globeTexture: {value: mapTexture}}}/>
          </mesh>

          <mesh
          position={[0, 0, 0]}
          ref={refAtmosphere}
          scale={.48}>
          <sphereGeometry args={[5, 64, 64]} />
          <shaderMaterial attach='material' 
                          vertexShader={atmosphereVertexShader} 
                          fragmentShader={atmosphereFragmentShader}
                          blending={THREE.AdditiveBlending}
                          side={THREE.BackSide}/>
          </mesh>
        </group>
      </>
    )
}

function EarthPage() {
    const [isClicked, setIsClicked] = useState(false)
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>
            <button className="btn btn-primary" style={{position: "absolute", top: '250px'}} onClick={() => setIsClicked(prev => !prev)}>Get back heart</button>
            <Canvas style={{width: '100vw', height: '100vh', backgroundColor: 'black'}}>
              {/* <ambientLight /> */}
              {/* <pointLight position={[10, 5, 400]}  color='#f9faf7'/>
              <pointLight position={[-10, -20, 900]} color='#f7f5fa'/> */}

              <Earth />
            </Canvas>
        </div>
    )
}

export default EarthPage