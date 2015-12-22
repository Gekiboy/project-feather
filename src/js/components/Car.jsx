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

const mlib = {
	"Orange": 	new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MixOperation, reflectivity: 0.3 } ),
	"Blue": 	new THREE.MeshLambertMaterial( { color: 0x001133, combine: THREE.MixOperation, reflectivity: 0.3 } ),
	"Red": 		new THREE.MeshLambertMaterial( { color: 0x660000, combine: THREE.MixOperation, reflectivity: 0.25 } ),
	"Black": 	new THREE.MeshLambertMaterial( { color: 0x000000, combine: THREE.MixOperation, reflectivity: 0.15 } ),
	"White":	new THREE.MeshLambertMaterial( { color: 0xffffff, combine: THREE.MixOperation, reflectivity: 0.25 } ),

	"Carmine": 	new THREE.MeshPhongMaterial( { color: 0x770000, specular:0xffaaaa, combine: THREE.MultiplyOperation } ),
	"Gold": 	new THREE.MeshPhongMaterial( { color: 0xaa9944, specular:0xbbaa99, shininess:50, combine: THREE.MultiplyOperation } ),
	"Bronze":	new THREE.MeshPhongMaterial( { color: 0x150505, specular:0xee6600, shininess:10, combine: THREE.MixOperation, reflectivity: 0.25 } ),
	"Chrome": 	new THREE.MeshPhongMaterial( { color: 0xffffff, specular:0xffffff, combine: THREE.MultiplyOperation } ),

	"Orange metal": new THREE.MeshLambertMaterial( { color: 0xff6600, combine: THREE.MultiplyOperation } ),
	"Blue metal": 	new THREE.MeshLambertMaterial( { color: 0x001133, combine: THREE.MultiplyOperation } ),
	"Red metal": 	new THREE.MeshLambertMaterial( { color: 0x770000, combine: THREE.MultiplyOperation } ),
	"Green metal": 	new THREE.MeshLambertMaterial( { color: 0x007711, combine: THREE.MultiplyOperation } ),
	"Black metal":	new THREE.MeshLambertMaterial( { color: 0x222222, combine: THREE.MultiplyOperation } ),

	"Pure chrome": 	new THREE.MeshLambertMaterial( { color: 0xffffff } ),
	"Dark chrome":	new THREE.MeshLambertMaterial( { color: 0x444444 } ),
	"Darker chrome":new THREE.MeshLambertMaterial( { color: 0x222222 } ),

	"Black glass": 	new THREE.MeshLambertMaterial( { color: 0x101016, opacity: 0.975, transparent: true } ),
	"Dark glass":	new THREE.MeshLambertMaterial( { color: 0x101046, opacity: 0.25, transparent: true } ),
	"Blue glass":	new THREE.MeshLambertMaterial( { color: 0x668899, opacity: 0.75, transparent: true } ),
	"Light glass":	new THREE.MeshBasicMaterial( { color: 0x223344, opacity: 0.25, transparent: true, combine: THREE.MixOperation, reflectivity: 0.25 } ),

	"Red glass":	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.75, transparent: true } ),
	"Yellow glass":	new THREE.MeshLambertMaterial( { color: 0xffffaa, opacity: 0.75, transparent: true } ),
	"Orange glass":	new THREE.MeshLambertMaterial( { color: 0x995500, opacity: 0.75, transparent: true } ),

	"Orange glass 50":	new THREE.MeshLambertMaterial( { color: 0xffbb00, opacity: 0.5, transparent: true } ),
	"Red glass 50": 	new THREE.MeshLambertMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ),

	"Fullblack rough":	new THREE.MeshLambertMaterial( { color: 0x000000 } ),
	"Black rough":		new THREE.MeshLambertMaterial( { color: 0x050505 } ),
	"Darkgray rough":	new THREE.MeshLambertMaterial( { color: 0x090909 } ),
	"Red rough":		new THREE.MeshLambertMaterial( { color: 0x330500 } ),

	"Darkgray shiny":	new THREE.MeshPhongMaterial( { color: 0x000000, specular: 0x050505 } ),
	"Gray shiny":		new THREE.MeshPhongMaterial( { color: 0x050505, shininess: 20 } )
};

CARS[ "veyron" ].materials = {
	body: [
		[ "Orange metal", 	mlib[ "Orange metal" ] ],
		[ "Blue metal", 	mlib[ "Blue metal" ] ],
		[ "Red metal", 		mlib[ "Red metal" ] ],
		[ "Green metal",	mlib[ "Green metal" ] ],
		[ "Black metal", 	mlib[ "Black metal" ] ],
		[ "Gold", 		mlib[ "Gold" ] ],
		[ "Bronze", 	mlib[ "Bronze" ] ],
		[ "Chrome", 	mlib[ "Chrome" ] ]
	],
};
CARS[ "veyron" ].mmap = {
	0: mlib[ "Black rough" ],		// tires + inside
	1: mlib[ "Pure chrome" ],		// wheels + extras chrome
	2: CARS['veyron'].materials.body[ CARS[ "veyron" ].init_material ][ 1 ], 			// back / top / front torso
	3: mlib[ "Dark glass" ],		// glass
	4: mlib[ "Pure chrome" ],		// sides torso
	5: mlib[ "Pure chrome" ],		// engine
	6: mlib[ "Red glass 50" ],		// backlights
	7: mlib[ "Orange glass 50" ]	// backsignals
};

let loader = new THREE.BinaryLoader();

class Car extends Component {
  
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    loader.load(CARS.veyron.url, (geometry) => {
      this.setState({ geometry });
    });
  }
  
  render() {
    let car = CARS[this.props.model];
    let geometry, scale, position, rotation;
    let material = new MeshFaceMaterial();
    if (car && this.state.geometry) {
      let { scale, init_rotation, materials, init_materials, body_materials, mmap } = car;
      let rotation = init_rotation;
      
      for (let i in mmap) {
        material.materials[i] = mmap[i];
      }
      
      scale = scale ? new THREE.Vector3(scale, scale, scale) : new THREE.Vector3(1, 1, 1);
      position = new THREE.Vector3(0, 0, 0);
      rotation = new THREE.Vector3(rotation[0], rotation[1], rotation[2]);
      geometry = this.state.geometry;
    }
    else {
      material = new THREE.MeshBasicMaterial();
      position = new THREE.Vector3(0, 0, 0);
      scale = new THREE.Vector3(1, 1, 1);
      rotation = new THREE.Vector3(0, 0, 0);
      geometry = new THREE.Geometry();
    }
    
    return (
      <Mesh
        name={this.props.name}
        geometry={this.state.geometry}
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
)(Car);
