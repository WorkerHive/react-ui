import React from 'react';
import { Engine, Scene, Vector3, ArcRotateCamera, SceneLoader } from 'babylonjs';
import 'babylonjs-loaders';


export interface GLBCardProps {
  data: string;
  rootUrl: string;
}

export const GLBCard : React.FC<GLBCardProps> = (props) => {
  let canvas;
  let scene;
  let engine;


  React.useEffect(() => {
    const onResizeWindow = () => {
      if (engine) {
        engine.resize();
      }
    }
    if (props.data) {


      if (!engine) {
        engine = new Engine(
          canvas,
          true
        )
      }

      if (!scene) {
        scene = new Scene(engine)
        scene.createDefaultEnvironment();
      }

      var camera = new ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 3, new Vector3(0, 0, 10), scene);

      camera.setTarget(Vector3.Zero());
      camera.minZ = 0;
      camera.wheelPrecision = 7;
      camera.speed = 0.5;

      console.log(props.data)

      SceneLoader.ImportMesh(null, props.rootUrl, props.data, scene, (e) => {
        console.log(e)
      }, null, null, ".glb")

      camera.attachControl(canvas, false);
      window.addEventListener("resize", onResizeWindow);
      engine.runRenderLoop(function () {
        scene.render();
      });


    }
    return () => {
      if (engine) {
        engine.stopRenderLoop()
      }
      if (scene) {
        scene.dispose()
        scene = null
      }

      window.removeEventListener('resize', onResizeWindow)
    }
  }, [props.data])

  const onCanvasLoad = (c) => {
    if (c !== null) {
      canvas = c;
    }
  }

  return (
    <canvas style={{ width: '100%' }} ref={onCanvasLoad} />
  )
}
