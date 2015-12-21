import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { Mesh, PerspectiveCamera, Scene } from 'react-three';
import Car from '../Car.jsx';

window.THREE = THREE;

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
        <h1>Hi</h1>
        <Scene height={400} width={400} camera="main">
          <PerspectiveCamera name="main" {...cameraProps}/>
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