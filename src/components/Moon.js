import React, {useEffect, useRef} from 'react';
import {useFrame} from '@react-three/fiber';

const Moon = ({planet}) => {
  const moonRef = useRef();

  //
  useEffect(() => {
    moonRef.current.rotation.order = "YZX";
  }, [])
  
  //
  useFrame((state, delta) => {
  
    let t = state.clock.getElapsedTime() * 0.5;
  
    moonRef.current.position.set(Math.cos(t), 0, -Math.sin(t)).multiplyScalar(planet.orbitRadius);
    moonRef.current.rotation.y = t - Math.PI * 0.5;
    moonRef.current.rotation.z = Math.PI * 0.5;
  })
  
  //
  return(
      <>
        {/*<mesh ref={moonRef} scale={[1, 2, 1]}>
          <coneBufferGeometry args={[5, 20, 5]} />
          <meshLambertMaterial color={'aqua'} />
        </mesh>*/}
        <mesh ref={moonRef}>
          <sphereBufferGeometry args={[5, 32, 16]}/>
          <meshStandardMaterial color="#0040ff" roughness={1}/>
        </mesh>
      </>
      
  )
}

export default Moon;
