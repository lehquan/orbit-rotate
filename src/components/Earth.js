import React from 'react';

const Earth = () => {
  
  return(
      <mesh castShadow receiveShadow>
        <sphereBufferGeometry args={[15, 32, 16]}/>
        <meshStandardMaterial color="#ffbf00" roughness={1}/>
      </mesh>
  )
  
}

export default Earth
