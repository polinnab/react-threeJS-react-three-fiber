import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from "three";
import { BufferAttribute } from "three";

// creates 500 random coordinates for star-points 
const starVertices = [];
for (let i = 0; i < 500; i++) {
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
const ukrainePts = [];

ukrainePts.push( new THREE.Vector2( (2.40+3), (3.30-6) ) );
ukrainePts.push( new THREE.Vector2( (2.73+3), (3.25-6) ) );
ukrainePts.push( new THREE.Vector2( (2.92+3), (3.42-6) ) );
ukrainePts.push( new THREE.Vector2( (2.96+3), (3.48-6) ) );
ukrainePts.push( new THREE.Vector2( (3.27+3), (3.52-6) ) );
ukrainePts.push( new THREE.Vector2( (3.39+3), (3.77-6) ) );
ukrainePts.push( new THREE.Vector2( (3.66+3), (3.67-6) ) );
ukrainePts.push( new THREE.Vector2( (3.69+3), (3.74-6) ) );
ukrainePts.push( new THREE.Vector2( (3.89+3), (3.74-6) ) );
ukrainePts.push( new THREE.Vector2( (3.89+3), (3.99-6) ) );
ukrainePts.push( new THREE.Vector2( (3.69+3), (3.98-6) ) );
ukrainePts.push( new THREE.Vector2( (3.69+3), (4.02-6) ) );
ukrainePts.push( new THREE.Vector2( (3.48+3), (4.01-6) ) );
ukrainePts.push( new THREE.Vector2( (3.45+3), (3.92-6) ) );
ukrainePts.push( new THREE.Vector2( (3.16+3), (4.08-6) ) );
ukrainePts.push( new THREE.Vector2( (3.19+3), (4.18-6) ) );
ukrainePts.push( new THREE.Vector2( (3.09+3), (4.23-6) ) );
ukrainePts.push( new THREE.Vector2( (3.09+3), (4.43-6) ) );
ukrainePts.push( new THREE.Vector2( (3.19+3), (4.43-6) ) );
ukrainePts.push( new THREE.Vector2( (3.52+3), (4.93-6) ) );
ukrainePts.push( new THREE.Vector2( (3.72+3), (4.86-6) ) );
ukrainePts.push( new THREE.Vector2( (4.00+3), (5.00-6) ) );
ukrainePts.push( new THREE.Vector2( (4.10+3), (5.00-6) ) );
ukrainePts.push( new THREE.Vector2( (4.10+3), (5.08-6) ) );
ukrainePts.push( new THREE.Vector2( (4.30+3), (5.12-6) ) );
ukrainePts.push( new THREE.Vector2( (4.34+3), (5.28-6) ) );
ukrainePts.push( new THREE.Vector2( (4.64+3), (5.28-6) ) );
ukrainePts.push( new THREE.Vector2( (4.64+3), (5.68-6) ) );
ukrainePts.push( new THREE.Vector2( (4.94+3), (5.90-6) ) );
ukrainePts.push( new THREE.Vector2( (5.34+3), (5.90-6) ) );
ukrainePts.push( new THREE.Vector2( (5.34+3), (6.40-6) ) );
ukrainePts.push( new THREE.Vector2( (5.24+3), (6.45-6) ) );
ukrainePts.push( new THREE.Vector2( (5.24+3), (6.55-6) ) );
ukrainePts.push( new THREE.Vector2( (5.39+3), (6.58-6) ) );
ukrainePts.push( new THREE.Vector2( (5.39+3), (7.00-6) ) );
ukrainePts.push( new THREE.Vector2( (5.29+3), (7.15-6) ) );
ukrainePts.push( new THREE.Vector2( (5.20+3), (7.09-6) ) );
ukrainePts.push( new THREE.Vector2( (4.39+3), (7.40-6) ) );
ukrainePts.push( new THREE.Vector2( (4.39+3), (7.32-6) ) );
ukrainePts.push( new THREE.Vector2( (4.15+3), (7.40-6) ) );
ukrainePts.push( new THREE.Vector2( (3.99+3), (7.72-6) ) );
ukrainePts.push( new THREE.Vector2( (3.95+3), (7.55-6) ) );
ukrainePts.push( new THREE.Vector2( (3.25+3), (7.55-6) ) );
ukrainePts.push( new THREE.Vector2( (3.15+3), (7.68-6) ) );
ukrainePts.push( new THREE.Vector2( (3.21+3), (7.74-6) ) );
ukrainePts.push( new THREE.Vector2( (2.95+3), (8.16-6) ) );
ukrainePts.push( new THREE.Vector2( (2.57+3), (8.11-6) ) );
ukrainePts.push( new THREE.Vector2( (2.53+3), (8.41-6) ) );
ukrainePts.push( new THREE.Vector2( (2.63+3), (8.40-6) ) );
ukrainePts.push( new THREE.Vector2( (2.63+3), (8.52-6) ) );
ukrainePts.push( new THREE.Vector2( (2.47+3), (8.60-6) ) );
ukrainePts.push( new THREE.Vector2( (2.47+3), (8.77-6) ) );
ukrainePts.push( new THREE.Vector2( (2.40+3), (8.85-6) ) );
ukrainePts.push( new THREE.Vector2( (2.26+3), (8.83-6) ) );
ukrainePts.push( new THREE.Vector2( (2.15+3), (8.93-6) ) );
ukrainePts.push( new THREE.Vector2( (2.05+3), (8.83-6) ) );
ukrainePts.push( new THREE.Vector2( (1.80+3), (8.86-6) ) );
ukrainePts.push( new THREE.Vector2( (1.61+3), (8.59-6) ) );
ukrainePts.push( new THREE.Vector2( (1.15+3), (8.62-6) ) );
ukrainePts.push( new THREE.Vector2( (1.00+3), (8.12-6) ) );
ukrainePts.push( new THREE.Vector2( (0.60+3), (8.29-6) ) );
ukrainePts.push( new THREE.Vector2( (0.46+3), (8.12-6) ) );
ukrainePts.push( new THREE.Vector2( (0.26+3), (8.35-6) ) );
ukrainePts.push( new THREE.Vector2( (0.20+3), (8.28-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.45+3), (8.41-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.45+3), (8.47-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.45+3), (8.67-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.65+3), (8.60-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.75+3), (8.65-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.81+3), (8.47-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.05+3), (8.47-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.08+3), (8.27-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.00+3), (7.80-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.04+3), (7.65-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.11+3), (7.65-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.65+3), (7.10-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.65+3), (6.70-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.75+3), (6.76-6) ) );
ukrainePts.push( new THREE.Vector2( (-3.00+3), (6.40-6) ) );
ukrainePts.push( new THREE.Vector2( (-3.00+3), (6.32-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.68+3), (6.00-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.73+3), (5.95-6) ) );
ukrainePts.push( new THREE.Vector2( (-2.60+3), (6.00-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.90+3), (5.84-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.70+3), (5.70-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.55+3), (5.84-6) ) );
ukrainePts.push( new THREE.Vector2( (-1.26+3), (5.80-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.88+3), (6.06-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.40+3), (6.06-6) ) );
ukrainePts.push( new THREE.Vector2( (0.28+3), (5.65-6) ) );
ukrainePts.push( new THREE.Vector2( (0.20+3), (5.48-6) ) );
ukrainePts.push( new THREE.Vector2( (0.30+3), (5.28-6) ) );
ukrainePts.push( new THREE.Vector2( (0.40+3), (5.28-6) ) );
ukrainePts.push( new THREE.Vector2( (0.37+3), (5.05-6) ) );
ukrainePts.push( new THREE.Vector2( (0.65+3), (4.85-6) ) );
ukrainePts.push( new THREE.Vector2( (0.65+3), (4.62-6) ) );
ukrainePts.push( new THREE.Vector2( (0.27+3), (4.72-6) ) );
ukrainePts.push( new THREE.Vector2( (0.14+3), (4.60-6) ) );
ukrainePts.push( new THREE.Vector2( (0.14+3), (4.40-6) ) );
ukrainePts.push( new THREE.Vector2( (0.07+3), (4.41-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.10+3), (4.05-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.30+3), (4.05-6) ) );
ukrainePts.push( new THREE.Vector2( (-0.05+3), (3.80-6) ) );
ukrainePts.push( new THREE.Vector2( (0.25+3), (4.00-6) ) );
ukrainePts.push( new THREE.Vector2( (0.45+3), (3.80-6) ) );
ukrainePts.push( new THREE.Vector2( (0.82+3), (4.40-6) ) );
ukrainePts.push( new THREE.Vector2( (1.00+3), (4.67-6) ) );
ukrainePts.push( new THREE.Vector2( (1.44+3), (4.73-6) ) );
ukrainePts.push( new THREE.Vector2( (1.69+3), (4.47-6) ) );
ukrainePts.push( new THREE.Vector2( (1.99+3), (4.43-6) ) );
ukrainePts.push( new THREE.Vector2( (2.37+3), (4.43-6) ) );
ukrainePts.push( new THREE.Vector2( (2.44+3), (4.23-6) ) );
ukrainePts.push( new THREE.Vector2( (2.13+3), (4.13-6) ) );
ukrainePts.push( new THREE.Vector2( (1.93+3), (3.93-6) ) );
ukrainePts.push( new THREE.Vector2( (1.93+3), (3.87-6) ) );
ukrainePts.push( new THREE.Vector2( (2.17+3), (3.87-6) ) );
ukrainePts.push( new THREE.Vector2( (2.17+3), (3.79-6) ) );
ukrainePts.push( new THREE.Vector2( (2.36+3), (3.79-6) ) );
ukrainePts.push( new THREE.Vector2( (2.45+3), (3.65-6) ) );
ukrainePts.push( new THREE.Vector2( (2.45+3), (3.55-6) ) );
ukrainePts.push( new THREE.Vector2( (2.40+3), (3.30-6) ) );

// creates THREE.Shape by ukrainePts
const ukraineShape = new THREE.Shape( ukrainePts );
ukraineShape.autoClose = true;

// get 500 points on Shape
const ukraineSpacedPoints = ukraineShape.getSpacedPoints( 500 );

// get 500 Vectors based on ukraineSpacedPoints
const arrOfStarsVectors = []
ukraineSpacedPoints.forEach(item => {
  const vector = new THREE.Vector3(item.x, item.y, -0.5)
  arrOfStarsVectors.push(vector)
});

// California Shape by points
function UkraineShape() {
  const shapeRef = useRef()

  // creates array based on ukraineSpacedPoints, adds z coordinate to each x-y pair
  const shapeVertices = []
  ukraineSpacedPoints.forEach(vector => {
    shapeVertices.push((vector.x-9), (vector.y), -0.5)
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

  // vector = new THREE.Vector3(x, y, z) // set the direction of mesh movement

  useFrame(() => {
    ref.current.position.lerp(vector, 0.008) // 0.008 - part of vector's path wich mesh goes by one frame
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

function UkrainePointsPage() {
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
              <UkraineShape></UkraineShape>
            </Canvas>
        </div>
    )
}

export default UkrainePointsPage