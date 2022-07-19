import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as dat from "dat.gui";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


import './sphere.css';

let isCanvas = false;
const controls = {
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left'
}

function Sphere() {
    isCanvas = false
    const refContainer = useRef();
    const [renderer, setRenderer] = useState();
    const [isAnimate, setIsAnimate] = useState(true);
    const [timeOut, setTimeOut] = useState();

    useEffect(() => {
        console.log('ty', renderer)
        const {current: container} = refContainer;
        if(container && !renderer && !isCanvas) {
            const width = container.clientWidth;
            const height = container.clientHeight;
            const renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true
            })
            renderer.setSize(width, height)
            renderer.outputEncoding = THREE.sRGBEncoding
            container.appendChild(renderer.domElement);
            isCanvas = true;
            setRenderer(renderer);
            // renderer.render(scene, camera)

        }
        if (renderer) {
            tick()

        }

    },)

    const scene = new THREE.Scene()

    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight
    }

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(0,0,2)

    const geometry = new THREE.SphereGeometry(.7, 64, 64)
    // const normalTexture = new THREE.TextureLoader().load("./NormalMap.png");
    const normalTexture = new THREE.TextureLoader().load("./NormalMapBrick.png");
    
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7
    material.roughness = 0.2
    material.normalMap = normalTexture; 
    material.color = new THREE.Color(0x292929)
    const sphere = new THREE.Mesh(geometry,material)
    scene.add(sphere)


    const pointLight = new THREE.PointLight(0xffffff, 0.1)
    pointLight.position.set(2,3,4)
    scene.add(pointLight)

    const pointLight2 = new THREE.PointLight(0xff0000, 2)
    pointLight2.position.set(-1.86,1,-1,65)
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x75de, 2)
    pointLight3.position.set(1.6,-1.52,-1.589)
    scene.add(pointLight3)

    const clock = new THREE.Clock()

    const tick = () => {

        const elapsedTime = clock.getElapsedTime()
        // Update objects

        if (isAnimate) {
            sphere.rotation.y = .5 * elapsedTime
        }

        // Render
        renderer.render(scene, camera)
        // Call tick again on the next frame
        window.requestAnimationFrame(tick)
    }



    const onControlClick = (control) => {

        setIsAnimate(false)
        const elapsedTime = clock.getElapsedTime()

        if (control === 'bottom') {
            sphere.rotation.x += (.02 * elapsedTime)
        }
        if (control === 'top') {
            sphere.rotation.x += -(.02 * elapsedTime)
        }
        if (control === 'right') {
            sphere.rotation.y += -(.02 * elapsedTime)
            sphere.rotation.z += -(.005 * elapsedTime)
        }
        if (control === 'left') {
            sphere.rotation.z += -(.005 * elapsedTime)
            sphere.rotation.y += (.02 * elapsedTime)
        }

        console.log('camera', camera)
    }

    return(
        <>
            <div ref={refContainer} className="three-container">
            </div>
            <ul className="model-controls">
                <li className="control-top" onClick={() => onControlClick(controls.top)}></li>
                <li className="control-right" onClick={() => onControlClick(controls.right)}></li>
                <li className="control-bottom" onClick={() => onControlClick(controls.bottom)}></li>
                <li className="control-left" onClick={() => onControlClick(controls.left)}></li>
            </ul>
        </>
    )
}

export default Sphere