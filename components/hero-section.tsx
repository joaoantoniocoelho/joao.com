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
  const meshRef = useRef<THREE.Mesh>(null);
  const initialRotation = useRef({ x: 0, y: 0, z: 0 });
  const timeRef = useRef(0);
  
  // Store initial rotation for reference
  useEffect(() => {
    if (meshRef.current) {
      // Set sphere to center position
      meshRef.current.position.set(0, 0, 0);
      
      initialRotation.current = {
        x: Math.random() * Math.PI,
        y: Math.random() * Math.PI,
        z: Math.random() * Math.PI
      };
    }
  }, []);

  // Animation based purely on mouse position
  useFrame((state, delta) => {
    if (meshRef.current) {
      timeRef.current += delta;
      
      // Base rotation with mouse interaction
      meshRef.current.rotation.x = initialRotation.current.x + mousePosition.y * 0.5;
      meshRef.current.rotation.y = initialRotation.current.y - mousePosition.x * 0.8;
      meshRef.current.rotation.z = initialRotation.current.z + (mousePosition.x * mousePosition.y) * 0.1;

      // Subtle pulse animation
      const pulseScale = 1 + Math.sin(timeRef.current * 2) * 0.02;
      meshRef.current.scale.set(pulseScale, pulseScale, pulseScale);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.0, 16, 16]} /> {/* Reduced segments from 64,64 to 16,16 */}
      <meshStandardMaterial
        color="#ffffff"
        wireframe
        roughness={0.1}
        metalness={0.9}
        transparent
        opacity={0.7}
        emissive="#ffffff"
        emissiveIntensity={0.2}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Throttle function to limit the number of mouse event executions
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
      // Use a smaller amplifier for more subtle effect
      const amplifier = 1.0; // Reduced from 2.0 to 1.0
      setMousePosition({
        x: ((e.clientX / window.innerWidth) * 2 - 1) * amplifier,
        y: (-(e.clientY / window.innerHeight) * 2 + 1) * amplifier
      });
    }, 16); // ~60fps

    const handleTouchMove = throttle((e: TouchEvent) => {
      // Don't prevent default on touch events to allow scrolling
      // Just track the touch for the sphere movement
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const amplifier = 1.0; // Reduced from 2.0 to 1.0
        setMousePosition({
          x: ((touch.clientX / window.innerWidth) * 2 - 1) * amplifier,
          y: (-(touch.clientY / window.innerHeight) * 2 + 1) * amplifier
        });
      }
    }, 16); // ~60fps

    // Add all event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true }); // Make passive to allow scrolling
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black"
      style={{ touchAction: 'auto' }}
    >
      {/* Canvas wrapper with pointer-events-none to ensure it doesn't interfere with scrolling */}
      <div 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      >
        {/* Canvas itself with pointer-events-none to ensure it doesn't block scrolling */}
        <Canvas
          style={{ pointerEvents: 'none' }}
          gl={{ 
            alpha: true,
            antialias: true,
            powerPreference: "high-performance"
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />
          <pointLight position={[0, 0, 10]} intensity={0.8} />
          <fog attach="fog" args={['#000000', 5, 15]} />
          <Suspense fallback={null}>
            <Model mousePosition={mousePosition} scrollPosition={0} />
            {/* When you have a model, use this instead:
            <GLTFModel mousePosition={mousePosition} scrollPosition={scrollPosition} /> 
            */}
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            rotateSpeed={0.2}
            autoRotate={false}
          />
        </Canvas>
      </div>

      {/* Content with pointer-events-auto to make it interactive */}
      <div className="relative z-10 text-center px-4 pointer-events-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            João Coelho
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto font-light tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Senior Software Engineer
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a
              href="#experience"
              className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/20 hover:border-white/40"
            >
              View My Work
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}