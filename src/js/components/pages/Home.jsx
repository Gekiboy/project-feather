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
  
  constructor() {
    super();
    this.state = {
      perspective: {
        fov: 75,
        aspect: 1,
        near: 1,
        far: 5000,
        position: new THREE.Vector3(0, 0, 200),
        lookat: new THREE.Vector3(0, 0, 0)
      }
    };
  }
  
  componentDidMount() {
    let renderer = this.refs.scene._THREErenderer;
    this.vrEffect = new THREE.VREffect(renderer, function (err) {
      console.error(err);
    });
    this.vrControls = new THREE.VRControls(this.refs.camera);
  }
  
  onFullscreenClick() {
    console.log(this.vrEffect);
    this.vrEffect.setFullScreen(true);
  }
  
  render() {
    
    return (
      <div>
        <Scene
          ref="scene"
          height={400}
          width={400}
          camera="main"
          VRControls={this.vrControls}
          VRControlsTarget="car">
          <PerspectiveCamera name="main" {...this.state.perspective}/>
          <DirectionalLight position={new THREE.Vector3(10, 10, 10)} />
          <AmbientLight color={0x050505}/>
          <Car name="car" model="veyron"/>
        </Scene>
        <br />
        <button onClick={this.onFullscreenClick.bind(this)} className="fullscreen fa fa-arrows-alt"></button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);