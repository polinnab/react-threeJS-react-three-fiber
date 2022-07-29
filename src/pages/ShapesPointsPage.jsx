import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import { BufferAttribute } from "three";

// TODO: add all comments for tutorial

// creates 900 random coordinates for star-points 
const starVertices = [];
for (let i = 0; i < 300; i++) {
  const x = (Math.random() - 0.5) * 30;
  const y = (Math.random() - 0.5) * 20;
  const z = -Math.random() * 10;
  starVertices.push(x, y, z)
};

// joins coordinates to matrix. [x, y, z] in each line 
const arrOfStarsPositions = []
for (let i=0; i < starVertices.length / 3; i++) {
  const index0 = (i+(i*2))
  const index1 = (i+(i*2)+1)
  const index2 = (i+(i*2)+2)
  const item = [starVertices[index0], starVertices[index1], starVertices[index2]]
  arrOfStarsPositions.push(item)
};

// California shape by vectors
const californiaPts = [];

californiaPts.push( new THREE.Vector2( 6.10, (3.20-6) ) );
californiaPts.push( new THREE.Vector2( 4.50, (3.00-6) ) );
californiaPts.push( new THREE.Vector2( 3.92, (3.92-6) ) );
californiaPts.push( new THREE.Vector2( 2.66, (4.38-6) ) );
californiaPts.push( new THREE.Vector2( 1.90, (5.70-6) ) );
californiaPts.push( new THREE.Vector2( 1.90, (6.00-6) ) );
californiaPts.push( new THREE.Vector2( 1.60, (6.20-6) ) );
californiaPts.push( new THREE.Vector2( 1.60, (6.50-6) ) );
californiaPts.push( new THREE.Vector2( 1.80, (6.40-6) ) );
californiaPts.push( new THREE.Vector2( 1.65, (6.80-6) ) );
californiaPts.push( new THREE.Vector2( 1.50, (6.70-6) ) );
californiaPts.push( new THREE.Vector2( .90, (7.37-6) ) );
californiaPts.push( new THREE.Vector2( .80, (7.95-6) ) );
californiaPts.push( new THREE.Vector2( .50, (8.35-6) ) );
californiaPts.push( new THREE.Vector2( .64, (8.70-6) ) );
californiaPts.push( new THREE.Vector2( .60, (9.45-6) ) );
californiaPts.push( new THREE.Vector2( 3.00, (9.45-6) ) );
californiaPts.push( new THREE.Vector2( 3.00, (7.43-6) ) );
californiaPts.push( new THREE.Vector2( 6.00, (4.73-6) ) );
californiaPts.push( new THREE.Vector2( 6.26, (4.25-6) ) );
californiaPts.push( new THREE.Vector2( 6.00, (3.70-6) ) );
californiaPts.push( new THREE.Vector2( 6.10, (3.20-6) ) );

// creates THREE.Shape by californiaPts
const californiaShape = new THREE.Shape( californiaPts );
californiaShape.autoClose = true;

// get 300 points on Shape
const californiaSpacedPoints = californiaShape.getSpacedPoints( 300 );

// get 300 Vectors based on californiaSpacedPoints
const arrOfStarsVectors = []
californiaSpacedPoints.forEach(item => {
  const vector = new THREE.Vector3(item.x, item.y, -0.5)
  arrOfStarsVectors.push(vector)
});

// California Shape by points
function CaliforniaShape() {
  const shapeRef = useRef()

  // creates array based on californiaSpacedPoints, adds z coordinate to each x-y pair
  const shapeVertices = []
  californiaSpacedPoints.forEach(vector => {
    shapeVertices.push((vector.x-5), vector.y, -0.5)
  });

  const pointsFromShape =  new BufferAttribute(new Float32Array(shapeVertices), 3);

  return(
    <>
      <points ref={shapeRef}>
        <bufferGeometry>
          <bufferAttribute attach={"attributes-position"} {...pointsFromShape} />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={.03}></pointsMaterial>
      </points>
    </>
  )
}

// Mesh like a point
function Mesh({position, vector}) {
  console.log('position:', position)
  console.log('vector:', vector)
  const ref = useRef()

  useFrame(() => {
    ref.current.position.lerp(vector, 0.005)
  })
  return(
    <mesh
      ref={ref}
      position={position}
      scale={.2}>
      <boxGeometry args={[.1,.1,.1]} />
      <meshStandardMaterial color={'white'} roughness={0.7}/>
    </mesh>
  )
}

function ShapesPointsPage() {
    return(
        <div>
            <Link to="/"><button className="btn btn-primary" 
                 type="button"
                 style={{position: "absolute"}}>
                     Back Home</button></Link>
            <Canvas style={{width: '100vw', height: '100vh', backgroundColor: 'black'}}>
              <ambientLight></ambientLight>
              {arrOfStarsPositions.map((item, index) => {
                return(
                  <Mesh key={index} position={item} vector={arrOfStarsVectors[index]}></Mesh>
                )
              })}
              <CaliforniaShape></CaliforniaShape>
            </Canvas>
        </div>
    )
}

export default ShapesPointsPage