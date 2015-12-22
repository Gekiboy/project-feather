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
    let geometry = new THREE.PlaneGeometry( 70, 70, 4, 4 );
    let scale = new THREE.Vector3(1, 1, 1);
    let position = new THREE.Vector3(90, 20, 0);
    let quaternion = new THREE.Quaternion();
    quaternion.setFromAxisAngle(new THREE.Vector3(-0.2, -0.3, 0), Math.PI / 2);

    let map = THREE.ImageUtils.loadTexture( '/textures/panel-swatch.png' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    let material = new THREE.MeshLambertMaterial( { map: map, side: THREE.DoubleSide } );

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
