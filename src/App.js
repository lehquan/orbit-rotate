import React, {Suspense, useEffect, useRef, useState} from 'react';
import * as THREE from 'three'
import {Canvas, extend, useFrame, useThree} from '@react-three/fiber';
import Lights from './components/Lights';
import CameraControls from './components/CameraControls';
import Earth from './components/Earth';
import Orbit from './components/Orbit';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

extend({ EffectComposer, RenderPass, UnrealBloomPass })

function Bloom({ children }) {
  const { gl, camera, size } = useThree()
  const [scene, setScene] = useState()
  const composer = useRef()
  useEffect(() => void scene && composer.current.setSize(size.width, size.height), [size])
  useFrame(() => scene && composer.current.render(), 1)
  return (
      <>
        <scene ref={setScene}>{children}</scene>
        <effectComposer ref={composer} args={[gl]}>
          <renderPass attachArray="passes" scene={scene} camera={camera} />
          <unrealBloomPass attachArray="passes" args={[undefined, 3, 1, 0]} />
        </effectComposer>
      </>
  )
}

function Main({ children }) {
  console.log(children)
  const scene = useRef()
  const { gl, camera } = useThree()
  useFrame(() => {
    gl.autoClear = false
    gl.clearDepth()
    gl.render(scene.current, camera)
  }, 2)
  return <scene ref={scene}>{children}</scene>
}

export default function App() {
  return (
      <Canvas
          linear
          style={{ background: '#171717' }}
          camera={{ position: [0, 50, 200], fov: 60 }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.outputEncoding = THREE.sRGBEncoding;
            // gl.setClearColor(0x404040);
          }}>
        <CameraControls/>
        {/*<gridHelper args={[200, 10]}/>*/}
        <Main>
          <Lights/>
          <Suspense fallback={null}>
            <Earth/>
            <Orbit/>
          </Suspense>
        </Main>
        <Bloom>
          <ambientLight />
          <Suspense fallback={null}>
            <Earth/>
            {/*<Orbit/>*/}
          </Suspense>
        </Bloom>
      </Canvas>
  )
}
