import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { AmbientLight, DirectionalLight, Mesh, PerspectiveCamera, Scene } from 'react-three';
import Car from '../Car.jsx';
import * as VRActions from '../../actions/vr';

window.THREE = THREE;

require('../../VRControls');
require('../../VREffect');

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {
    config: state.config,
    vr: state.vr
  };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    discoverVRInputDevices: () => dispatch(VRActions.discoverVRInputDevices()),
    requestVRStateUpdate: () => dispatch(VRActions.requestVRStateUpdate())
  };
}

class Home extends Component {
  
  animate() {
    this.props.requestVRStateUpdate();
    requestAnimationFrame(this.animate.bind(this));
  }
  
  componentWillMount() {
    this.props.discoverVRInputDevices();
    this.props.requestVRStateUpdate();
    this.animate();
  }
  
  componentDidMount() {
    let renderer = this.refs.scene._THREErenderer;
    this.vrEffect = new THREE.VREffect(renderer, function (err) {
      console.error(err);
    });
  }
  
  onFullscreenClick() {
    this.vrEffect.setFullScreen(true);
  }
  
  render() {
    
    let position = this.props.vr.position;
    
    window.update
    
    let cameraProps = {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(position.x, position.y, position.z),
      lookat: new THREE.Vector3(0, 0, 0)
    };
    
    return (
      <div>
        <Scene
          ref="scene"
          height={window.innerHeight}
          width={window.innerWidth}
          camera="main">
          <PerspectiveCamera name="main" {...cameraProps}/>
          <DirectionalLight position={new THREE.Vector3(10, 10, 10)} />
          <AmbientLight color={0x050505}/>
          <Car name="car" model="veyron"/>
        </Scene>
        <div>
          <button onClick={this.onFullscreenClick.bind(this)} className="fullscreen"><i className="fa fa-arrows-alt"></i> Launch VR</button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);