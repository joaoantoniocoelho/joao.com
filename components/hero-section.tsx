"use client";

import { useRef, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useGLTF } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// This component will load and display a 3D model
// Replace the model path with your own model URL when you have one
function Model({ mousePosition, scrollPosition }: { 
  mousePosition: { x: number; y: number };
  scrollPosition: number;
}) {
  // You can use a local model or a URL
  // Example: const { scene } = useGLTF('/path/to/your/model.glb')
  // For now, we'll keep using a sphere but show how to make it fancier
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);
  const initialRotation = useRef({ x: 0, y: 0, z: 0 });
  
  // Store initial rotation for cumulative effect
  useEffect(() => {
    if (meshRef.current) {
      initialRotation.current = {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI
      };
    }
  }, []);

  // Add continuous subtle animation with useFrame
  useFrame(({ clock }) => {
    time.current = clock.getElapsedTime();
    
    if (meshRef.current) {
      // Calculate scroll factor with non-linear mapping for more dramatic effect at certain scroll positions
      const normalizedScroll = scrollPosition / 1000; // Normalized between 0 and ~1 (depending on page height)
      const scrollFactor = Math.pow(normalizedScroll, 1.5) * 10; // Non-linear mapping with exponent
      
      // Subtle position changes with slight scroll influence
      meshRef.current.position.y = Math.sin(time.current * 0.5) * 0.1;
      meshRef.current.position.x = Math.sin(time.current * 0.3) * 0.1;
      
      // Create different rotation speeds for each axis to avoid repetitive patterns
      // X-axis: mostly influenced by scroll with sine wave modulation
      meshRef.current.rotation.x = initialRotation.current.x + 
                                  mousePosition.y * 0.05 + 
                                  scrollFactor * 1.2 + 
                                  Math.sin(normalizedScroll * 3) * 0.2;
      
      // Y-axis: continuous rotation with scroll acceleration
      meshRef.current.rotation.y = initialRotation.current.y + 
                                  mousePosition.x * 0.05 + 
                                  time.current * 0.1 * (1 + normalizedScroll) + 
                                  scrollFactor * 2;
      
      // Z-axis: slower continuous rotation with scroll direction changes
      meshRef.current.rotation.z = initialRotation.current.z + 
                                  time.current * 0.05 + 
                                  Math.sin(scrollFactor) * 0.5;
    }
  });

  // For a fancier sphere (still using a sphere until you pick a model)
  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        roughness={0.5}
        metalness={0.8}
      />
    </mesh>
  );
}

// Example of how to load a GLTF model (commented out until you have a model)
/*
function GLTFModel({ mousePosition, scrollPosition }) {
  const gltf = useGLTF('/path/to/your/model.glb');
  const modelRef = useRef();
  
  useFrame(({ clock }) => {
    if (modelRef.current) {
      // Similar animation logic as above
      const normalizedScroll = scrollPosition / 1000;
      modelRef.current.rotation.y = clock.getElapsedTime() * 0.1 + normalizedScroll * 2;
      // Add more animations as needed
    }
  });
  
  return (
    <primitive 
      object={gltf.scene} 
      ref={modelRef} 
      scale={[0.5, 0.5, 0.5]} // Adjust scale as needed
      position={[0, 0, 0]} // Adjust position as needed
    />
  );
}
*/

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Throttle function to limit the number of scroll event executions
  const throttle = (callback: Function, delay: number) => {
    let lastCall = 0;
    return (...args: any[]) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      return callback(...args);
    };
  };

  useEffect(() => {
    // Handle both mouse and touch events for position tracking
    const handleMouseMove = throttle((e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    }, 16); // ~60fps

    const handleTouchMove = throttle((e: TouchEvent) => {
      // Don't prevent default on touch events to allow scrolling
      // Just track the touch for the sphere movement
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        setMousePosition({
          x: (touch.clientX / window.innerWidth) * 2 - 1,
          y: -(touch.clientY / window.innerHeight) * 2 + 1
        });
      }
    }, 16); // ~60fps

    const handleScroll = throttle(() => {
      setScrollPosition(window.scrollY);
    }, 16); // ~60fps

    // Add all event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true }); // Make passive to allow scrolling
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
      style={{ touchAction: 'auto' }} // Allow all touch actions on the container
    >
      {/* Canvas wrapper with pointer-events-none to ensure it doesn't interfere with scrolling */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      >
        {/* Canvas itself with pointer-events-none to ensure it doesn't block scrolling */}
        <Canvas
          style={{ pointerEvents: 'none' }}
          gl={{ alpha: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <Model mousePosition={mousePosition} scrollPosition={scrollPosition} />
            {/* When you have a model, use this instead:
            <GLTFModel mousePosition={mousePosition} scrollPosition={scrollPosition} /> 
            */}
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
          />
        </Canvas>
      </div>

      {/* Content with pointer-events-auto to make it interactive */}
      <div className="relative z-10 text-center px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            transform: `translateY(${-scrollPosition * 0.2}px)`,
          }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            João Coelho
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Senior Software Engineer
          </p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href="#experience"
              className="inline-block bg-white text-black px-8 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}