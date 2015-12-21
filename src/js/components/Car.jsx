import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { Mesh, PerspectiveCamera, Scene } from 'react-three';
const MeshFaceMaterial = THREE.MeshFaceMaterial;

window.THREE = THREE;

require('../BinaryLoader');

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

const CARS = {
  "veyron": 	{
    name:	"Bugatti Veyron",
    url: 	"objects/VeyronNoUv_bin.js",
    author: '<a href="http://artist-3d.com/free_3d_models/dnm/model_disp.php?uid=1129" target="_blank">Troyano</a>',
    init_rotation: [ 0, 0, 0 ],
    scale: 5.5,
    init_material: 4,
    body_materials: [ 2 ],

    object: null,
    buttons: null,
    materials: null
  }
};

let loader = new THREE.BinaryLoader();

class Car extends Component {
  
  constructor() {
    super();
    this.state = {
      geometry: new THREE.Geometry()
    };
  }
  componentWillMount() {
    loader.load(CARS.veyron.url, (geometry) => {
      this.setState({ geometry });
    });
  }
  
  render() {
    let car = CARS[this.props.model];
    let scale, position, rotation;
    let material = new MeshFaceMaterial();
    if (car) {
      let { scale, init_rotation, materials, init_materials, body_materials, mmap } = car;
      let rotation = init_rotation;
      
      for (let i in mmap) {
        material.materials[i] = mmap[i];
      }
      
      scale = scale ? new THREE.Vector3(scale, scale, scale) : 1;
      position = new THREE.Vector3(0, 0, 0);
      rotation = new THREE.Vector3(rotation[0], rotation[1], rotation[2]);
    }
    
    return car ? (
      <Mesh
        name={this.props.name}
        geometry={this.state.geometry}
        material={material}
        scale={scale}
        position={position}
        rotation={rotation}
        {...this.props}
      />
    ) : null;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Car);