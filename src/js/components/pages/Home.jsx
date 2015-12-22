import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { Mesh, PerspectiveCamera, Scene } from 'react-three';

window.THREE = THREE;

require('../../TeapotBufferGeometry');

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    config: state.config
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    
  };
}

class Home extends Component {
  render() {
    
    let teapotSize = 1;
		let newTess = 15;
 		let bottom = false;
		let lid = true;
		let body = true;
		let fitLid = false;
		let nonblinn = false;
		let teapotGeometry = new THREE.TeapotBufferGeometry(teapotSize, newTess, bottom, lid, body, fitLid, nonblinn);
    let teapotMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    
    let cameraProps = {
      fov: 75,
      aspect: 1,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(0, 0, 10),
      lookat: new THREE.Vector3(0, 0, 0)
    };
    
    return (
      <div>
        <Scene height={400} width={400} camera="main">
          <PerspectiveCamera name="main" {...cameraProps}/>
          <Mesh
            name="teapot"
            geometry={teapotGeometry}
            material={teapotMaterial}
            scale={new THREE.Vector3(1, 1, 1)}
            position={new THREE.Vector3(0, 0, 0)}
          />
        </Scene>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);