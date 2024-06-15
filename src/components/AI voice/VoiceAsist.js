// src/components/voiceasist/Voice.js
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const Voice = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        // Make a local copy of the containerRef.current
        const container = containerRef.current;

        // Initialize the scene
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000);

        // Initialize the camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 1, 5);

        // Initialize the renderer
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Initialize the light
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(5, 5, 5).normalize();
        scene.add(light);

        // Load the GLTF model
        const loader = new GLTFLoader();
        loader.load('src/components/AI voice/assets/realistic_room.glb', function (gltf) {
            scene.add(gltf.scene);
            console.log('Model loaded:', gltf); // Debug log
        }, undefined, function (error) {
            console.error('Error loading model:', error);
        });

        // Initialize the orbit controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        // Handle window resize
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', onResize);

        // Animate the scene
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            window.removeEventListener('resize', onResize);
            if (container) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={containerRef}></div>;
};

export default Voice;
