import {extend, useFrame, useThree} from '@react-three/fiber';
import React, {useRef} from 'react';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// Calling extend with the native OrbitControls class from Three.js
// will make orbitControls available as a native JSX element.
// Notice how the OrbitControls classname becomes lowercase orbitControls when used as JSX element.
extend({ OrbitControls });

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  const {
    camera,
    gl: { domElement }
  } = useThree();
  
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  
  //
  useFrame(state => controls.current.update());
  return (
      <orbitControls
          ref={controls}
          args={[camera, domElement]}
          enableZoom={true}
          // maxAzimuthAngle={Math.PI / 4}
          // maxPolarAngle={Math.PI}
          // minAzimuthAngle={-Math.PI / 4}
          // minPolarAngle={0}
      />
  );
}

export default CameraControls;
