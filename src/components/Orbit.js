import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three'
import Moon from './Moon';
import {useFrame} from '@react-three/fiber';

const Orbit = () => {
  
  const lineRef = useRef();
  let planet = {
    orbitRadius: 80,
    inclination: 23
  }
  let pts = new THREE.Path().absarc(0, 0, planet.orbitRadius, 0, Math.PI * 2).getPoints(90);
  let lineGeometry = new THREE.BufferGeometry().setFromPoints(pts);
  lineGeometry.rotateX(Math.PI * 0.5);
  
  //
  useFrame((state, delta) => {
    let t = state.clock.getElapsedTime() * 0.5;
    // lineRef.current.rotation.x = t + Math.PI * 0.002;
  })
  
  //
  return(
      <line ref={lineRef} rotation={[Math.PI / 6, 0, 0]} geometry={lineGeometry}>
        <lineBasicMaterial attach="material" color={'yellow'} linewidth={10} linecap={'round'} linejoin={'round'} />
        <Moon planet={planet}/>
      </line>
  )
}

export default Orbit;
