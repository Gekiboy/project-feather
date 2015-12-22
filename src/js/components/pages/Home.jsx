import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { AmbientLight, DirectionalLight, Mesh, PerspectiveCamera, Scene } from 'react-three';
import Car from '../Car.jsx';

window.THREE = THREE;

require('../../VRControls');
require('../../VREffect');

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
  
  onFullscreenClick() {
    let renderer = this.refs.scene._THREErenderer;
    let vrEffect = new THREE.VREffect(renderer, function (err) {
      console.error(err);
    });
  }
  
  render() {
    let cameraProps = {
      fov: 75,
      aspect: 1,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(0, 0, 200),
      lookat: new THREE.Vector3(0, 0, 0)
    };
    
    return (
      <div>
        <h1 onClick={this.onFullscreenClick.bind(this)}>Hi</h1>
        <Scene
          ref="scene"
          height={400}
          width={400}
          camera="main"
          VRControls={THREE.VRControls}
          VRControlsTarget="car">
          <PerspectiveCamera name="main" {...cameraProps}/>
          <DirectionalLight position={new THREE.Vector3(10, 10, 10)} />
          <AmbientLight color={0x050505}/>
          <Car name="car" model="veyron"/>
        </Scene>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);