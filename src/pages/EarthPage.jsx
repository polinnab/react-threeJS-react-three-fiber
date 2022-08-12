import React, { useState, useRef, useEffect, createRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import * as THREE from "three";
import { TextureLoader, BufferAttribute, SphereGeometry } from "three";
import gsap  from "gsap";
import { OrbitControls } from "@react-three/drei";



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

const tubeFragment = `
  varying vec2 vertexUV;
  void main(){
    float dash = sin(vertexUV.x*100.);
    if(dash<0.) discard;
    gl_FragColor = vec4(0.820,0.841,0.908,0.9);
  }`


const starVertices = [];
for (let i = 0; i < 13000; i++) {
  const x = (Math.random() - 0.5) * 3000;
  const y = (Math.random() - 0.5) * 2500;
  const z = (Math.random() - 0.5) * 1500;
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

function Earth() {
    // This reference will give us direct access to the mesh
    const refSphere = useRef()
    const refAtmosphere = useRef()
    const groupRef = useRef()
    // const satelliteRef = useRef()

    const [mouse, setMouse] = useState({
      x: undefined,
      y: undefined
    })

    window.addEventListener('mousemove', (event) => {
      setMouse({x: (event.clientX / window.innerWidth) * 2 - 1, y: (event.clientY / window.innerHeight) * 2 - 1})
    })

    // Change position/roration... meshe every frame, this is outside of React without overhead
    useFrame(() => {
      //!!!! It helps you to set your start camera position XYZ, so you be able to set current part of the Earth to see first.
      // console.log('camera:', camera.position)

        refSphere.current.rotation.y += 0.002

        // mouse move parallax. Doesn't work with pins and curves here.
        // if(mouse.x) {
        //   gsap.to(groupRef.current.rotation, {
        //     x: mouse.y * 0.3,
        //     y: mouse.x * 0.5,
        //     duration: 2
        //   })
        // }
    })

    // const mapTexture = useLoader(TextureLoader, "/earthmap.jpg") //natural
    const mapTexture = useLoader(TextureLoader, "/earth-uv-map.jpeg")  //design
    return (
      <>
      <group ref={groupRef}>
        <mesh
          position={[0, 0, 0]}
          ref={refSphere}
          scale={1}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial attach='material' vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={{globeTexture: {value: mapTexture}}}/>
          </mesh>

          <mesh
          position={[0, 0, 0]}
          ref={refAtmosphere}
          scale={1.2}>
          <sphereGeometry args={[1, 64, 64]} />
          <shaderMaterial attach='material' 
                          vertexShader={atmosphereVertexShader} 
                          fragmentShader={atmosphereFragmentShader}
                          blending={THREE.AdditiveBlending}
                          side={THREE.BackSide}
                          transparent={true}/>
          </mesh>
        </group>
      </>
    )
}

// Getting coordinates x,y,z on the sphere by latitude and longitude. Sphere scale should be '1'
function getCoordinates(lat, lng) {
  // convert latitude and longitude to Phi and Theta
  const Phi = (90-lat)*(Math.PI/180)
  const Theta = (lng+180)*(Math.PI/180)
  // r = radius of SphereGeometry (should be 1 to be better)
  // x = -r * (sin(Phi) * cos(Theta))
  // y = cos(Phi)
  // z = sin(Phi) * sin(Theta)
  const x = -(Math.sin(Phi) * Math.cos(Theta))
  const y = Math.cos(Phi)
  const z = Math.sin(Phi) * Math.sin(Theta)

  return ({x,y,z})
}

// const pinsCoordinates = [
//   {lat: 38.8951, lng: -77.0364},
//   {lat: 48.450001, lng: 34.983334},
//   {lat: 31.628674, lng: -7.992047},
//   {lat: -18.7669, lng: 46.8691},
//   {lat: -8.409518, lng: 115.188919},
//   {lat: -37.840935, lng: 144.946457}
// ]

const pinsCoordinates = [
  {lat: 50.450001, lng: 30.523333},  //Kyiv
  {lat: 25.276987, lng: 55.296249},  //Dubai
  {lat: 14.599512, lng: 120.984222},  //Manila
  {lat: 34.672314, lng: 135.484802},  //Osaka
  {lat: 21.315603, lng: -157.858093},  //Honolulu
  {lat: 47.608013, lng: -122.335167},  //Seattle
  {lat: 51.509865, lng: -0.118092},  //London
  {lat: 49.842957, lng: 24.031111}  //Lviv
]

const pinsXYZCoordinates = [];
pinsCoordinates.forEach(pin => {
  const pinXYZ = getCoordinates(pin.lat, pin.lng)
  pinsXYZCoordinates.push(pinXYZ)
})

function Pins() {
  const ref = useRef()

  useFrame(() => {
    ref.current.rotation.y += 0.002
  })

  return(
    <>
      <group ref={ref}>
      {pinsXYZCoordinates.map(pin => {
        return(
          <mesh key={pin.x} position={[pin.x,pin.y,pin.z]}>
            <sphereGeometry args={[.02, 30, 30]}></sphereGeometry>
            <meshStandardMaterial color={0xDC296C}></meshStandardMaterial>
          </mesh>
        )
      })}
      </group>
    </>
  )
}



function Curves() {
  const [pathes, setPathes] = useState([])
  const ref = useRef()

  useEffect(() => {
    const vectors = []

    for (let i = 0; i < pinsXYZCoordinates.length; i++) {

      const vector = new THREE.Vector3(pinsXYZCoordinates[i].x, pinsXYZCoordinates[i].y, pinsXYZCoordinates[i].z)
      vectors.push(vector)

      if(i >= 1) {
        let points = []
        for (let j = 0; j <= 20; j++) {
          let p = new THREE.Vector3().lerpVectors(vectors[i-1], vectors[i], j/20)
          p.normalize();
          p.multiplyScalar(1 + 0.05 * Math.sin(Math.PI * j/20))
          points.push(p)
        }
        const path = new THREE.CatmullRomCurve3(points) 
        setPathes(prev => [...prev, path]) 
      }
    }
  }, [])

  useFrame(() => {
    ref.current.rotation.y += 0.002
  })
  
  return(
    <>
    <group ref={ref}>
    {pathes.map((path, index) => {
      return(
        <mesh key={index}>
          <tubeGeometry args={[path, 20, 0.007, 8, false]}></tubeGeometry>
          <shaderMaterial transparent={true} 
                          fragmentShader={tubeFragment}
                          vertexShader={vertexShader}
                          side={THREE.DoubleSide}/>
          {/* <meshStandardMaterial color={'blue'}></meshStandardMaterial> */}
        </mesh>
      )
    })}
    </group>
    </>
  )
}


function Satellite() {
  const ref = useRef()

  const moonTexture = useLoader(TextureLoader, '/moon.jpeg');

  useFrame(() => {
    // circle trajectory
    let date = Date.now() * 0.0005 + 1;
    ref.current.position.set(
      Math.cos(date) * 2 + 0,
      0,
      Math.sin(date) * 2 + 0
    );
    // rotation
    ref.current.rotation.y += 0.004
  })

  return(
    <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[.2, 30, 30]}></sphereGeometry>
        <meshStandardMaterial map={moonTexture}></meshStandardMaterial>
    </mesh> 
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
              <Link to="/anadea"><button className="btn btn-primary" type="button">Anadea Logo</button></Link>
              <Link to="/ukraine"><button className="btn btn-primary" type="button">Ukraine</button></Link>
            </div>
            <Canvas style={{width: '100vw', height: '100vh', backgroundColor: 'black'}} camera={{fov: 70, near: 0.001, position: [2.03,0.716,-2.3999]}}>
              <Earth />
              <ambientLight></ambientLight>
              <Pins></Pins>
              <Curves></Curves>
              <Stars></Stars>
              <Satellite></Satellite>
              <OrbitControls />
            </Canvas>
        </div>
    )
}

export default EarthPage