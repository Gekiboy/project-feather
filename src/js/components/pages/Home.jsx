import React from 'react';
const { Component } = React;
import { connect } from 'react-redux';
import THREE from 'three';
import { AmbientLight, SpotLight, Mesh, PerspectiveCamera, Scene } from 'react-three';
import Car from '../Car.jsx';
import Floor from '../Floor.jsx';
import HudPanel from '../HudPanel.jsx';
import * as VRActions from '../../actions/vr';

window.THREE = THREE;

require('../../VREffect');
require('../../StereoEffect');

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
    this.vrEffect = new THREE.VREffect(renderer);
  }
  
  onFullscreenClick() {
    this.vrEffect.setFullScreen(true);
  }
  
  render() {
    
    let position = this.props.vr.position;
    let orientation = this.props.vr.orientation;
    
    let cameraProps = {
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(position.x * 50, position.y * 50, position.z * 50),
      quaternion: new THREE.Quaternion(orientation.x, orientation.y, orientation.z, orientation.w)
    };
    
    return (
      <div>
        <Scene
          ref="scene"
          height={window.innerHeight}
          width={window.innerWidth}
          camera="main">
          <PerspectiveCamera name="main" {...cameraProps}/>
          <SpotLight
            position={new THREE.Vector3(0, 600, 100)}
          />
          <Car name="car" model="veyron"/>
          <HudPanel name="hudPanel"/>
          <Floor name="floor"/>
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
