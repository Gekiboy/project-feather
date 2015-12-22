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

  componentDidUpdate() {
    var timer = Date.now() * 0.0001;
    console.log(timer);
    let rotation = new THREE.Vector3(timer * 5, timer * 2.5, 0);
    this.setState({rotation: rotation});
  }

  render() {
    let geometry = new THREE.PlaneGeometry( 100, 100, 4, 4 );
    let scale = new THREE.Vector3(1, 1, 1);
    let position = new THREE.Vector3(0, 0, 0);
    let rotation = this.state.rotation || new THREE.Vector3(0, 0, 0);

    let map = THREE.ImageUtils.loadTexture( '/textures/concrete-256.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    let material = new THREE.MeshLambertMaterial( { map: map, side: THREE.FrontSide } );

    return (
      <Mesh
        name={this.props.name}
        geometry={geometry}
        material={material}
        scale={scale}
        position={position}
        rotation={rotation}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Floor);
