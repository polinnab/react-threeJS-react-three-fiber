import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from "three";
import { TextureLoader, BufferAttribute } from "three";
import gsap  from "gsap";


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

const starVertices = [];
for (let i = 0; i < 10000; i++) {
  const x = (Math.random() - 0.5) * 3000;
  const y = (Math.random() - 0.5) * 2500;
  const z = -Math.random() * 1500;
  starVertices.push(x, y, z)
}
// vector for moving stars like neture
const vector = new THREE.Vector3(50,100,-0.2)

function Stars() {
  const ref = useRef()
  console.log(ref)

  // little movings for stars
  useFrame(() => {
    ref.current.position.lerp(vector, 0.001)
  })


  const points =  new BufferAttribute(new Float32Array(starVertices), 3);
  return(
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      <pointsMaterial color={0xffffff}></pointsMaterial>
    </points>
  )
}

function Earth({mesh, setHeart}) {
    // This reference will give us direct access to the mesh
    const refSphere = useRef()
    const refAtmosphere = useRef()
    const groupRef = useRef()

    const [mouse, setMouse] = useState({
      x: undefined,
      y: undefined
    })

    window.addEventListener('mousemove', (event) => {
      setMouse({x: (event.clientX / window.innerWidth) * 2 - 1, y: (event.clientY / window.innerHeight) * 2 - 1})
    })

    // Change position/roration... meshe every frame, this is outside of React without overhead
    useFrame(() => {
        refSphere.current.rotation.y += 0.002
        if(mouse.x) {
          gsap.to(groupRef.current.rotation, {
            x: mouse.y * 0.3,
            y: mouse.x * 0.5,
            duration: 2
          })
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
    return(
        <div>
            <div className="d-grid gap-2 mx-auto" style={{position: 'absolute', zIndex: '99999', left: '50px', top: '140px'}}>
              <Link to="/sphere"><button className="btn btn-primary" type="button">Explore the Sphere</button></Link>
              <Link to="/3d-model"><button className="btn btn-primary" type="button">See simple heart</button></Link>
              <Link to="/heart"><button className="btn btn-primary" type="button">Feel the heart</button></Link>
              <Link to="/donut"><button className="btn btn-primary" type="button">Donut</button></Link>
              <Link to="/shapepoints"><button className="btn btn-primary" type="button">Shape</button></Link>
            </div>
            <Canvas style={{width: '100vw', height: '100vh', backgroundColor: 'black'}}>
              <Earth />
              <Stars></Stars>
            </Canvas>
        </div>
    )
}

export default EarthPage