import {Canvas, useFrame} from '@react-three/fiber';
import React, {useRef} from 'react';

const Lights = () => {
  
  const lightsRef = useRef();
  
  useFrame(() => {
    // lightsRef.current.rotation.x += 0.01;
    // lightsRef.current.rotation.y += 0.01;
  })

  return(
      <group ref={lightsRef}>
        <pointLight />
        <ambientLight />
        <directionalLight intensity={0.5}/>
      </group>
  )
}

export default Lights;
