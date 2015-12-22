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

class Crosshair extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let geometry = new THREE.RingGeometry( 0.5, 1, 32 );
    let material = new THREE.MeshBasicMaterial( {
      color: 0x00bb00,
      transparent: true,
      opacity: 0.5
    } );

    let quaternion = new THREE.Quaternion();
    quaternion.copy(this.props.cameraProps.quaternion);
    let position = new THREE.Vector3(0, 0, 0);
    // position.copy(this.props.cameraProps.position);
    // position.z = Math.min(Math.abs(quaternion.x), Math.abs(quaternion.y));
    // position.z += (Math.cos(quaternion.x * Math.PI) * -10) + (Math.cos(quaternion.y * Math.PI) * -10);
    // position.y += (Math.sin(quaternion.x * Math.PI) * -10) +  (Math.sin(quaternion.z * Math.PI) * -10);

    // position.x += -20 + Math.sqrt(Math.pow((quaternion.y * 20), 2) + Math.pow((quaternion.z * 20), 2));
    //position.y += Math.sqrt(Math.pow((quaternion.x * 20), 2) + Math.pow((quaternion.z * 20), 2));
    //position.z += -20 + Math.sqrt(Math.pow((quaternion.x * 20), 2) + Math.pow((quaternion.y * 20), 2));

    if (window.debug) {
      debugger;
    }

    return (
      <Mesh
        name={this.props.name}
        geometry={geometry}
        material={material}
        quaternion={this.props.cameraProps.quaternion}
        position={position}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Crosshair);
