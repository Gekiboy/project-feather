import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { Mesh, PerspectiveCamera, Scene } from 'react-three';

window.THREE = THREE;

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

class HudPanel extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let geometry = new THREE.PlaneGeometry( 40, 40, 4, 4 );
    let scale = new THREE.Vector3(1, 1, 1);
    let position = new THREE.Vector3(70, 20, 70);
    let quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0.2), Math.PI / 2);
    let material = new THREE.MeshBasicMaterial( { side: THREE.FrontSide } );

    return (
      <Mesh
        name={this.props.name}
        geometry={geometry}
        material={material}
        scale={scale}
        position={position}
        quaternion={quaternion}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HudPanel);
