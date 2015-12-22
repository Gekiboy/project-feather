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

class Floor extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let geometry = new THREE.PlaneGeometry( 100, 100, 4, 4 );
    let scale = new THREE.Vector3(20, 20, 20);
    let position = new THREE.Vector3(0, -50, 0);
    let quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

    let map = THREE.ImageUtils.loadTexture( '/textures/concrete-256.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.repeat.set( 10, 10 );
    map.anisotropy = 16;
    let material = new THREE.MeshLambertMaterial( { map: map, side: THREE.BackSide } );

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
)(Floor);
