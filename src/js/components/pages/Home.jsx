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
require('../../VRControls');
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

window.carColor = 4;

class Home extends Component {
  
  constructor() {
    super();
    this.state = {
      aspect: window.innerWidth / window.innerHeight
    };
  }
  
  animate() {
    this.props.requestVRStateUpdate();
    this.vrControls.update(this.props.vr);
    requestAnimationFrame(::this.animate);
  }
  
  componentWillMount() {
    this.props.discoverVRInputDevices();
    this.props.requestVRStateUpdate();
  }
  
  componentDidMount() {
    let renderer = this.refs.scene.getRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener('resize', ::this.onWindowResize, false);
    this.vrControls = new THREE.VRControls(this.refs.camera);
    this.animate();
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', ::this.onWindowResize);    
  }
  
  onFullscreenClick() {
    this.refs.scene.getEffect().setFullScreen(true);
  }
  
  onWindowResize() {
    this.refs.scene.getEffect().setSize(window.innerWidth, window.innerHeight);
    this.setState({
      aspect: window.innerWidth / window.innerHeight
    });
  }
  
  render() {
    
    let position = this.props.vr.position;
    let orientation = this.props.vr.orientation;
    
    let cameraProps = {
      aspect: this.state.aspect,
      fov: 75,
      aspect: window.innerWidth / window.innerHeight,
      near: 1,
      far: 5000,
      position: new THREE.Vector3(position.x, position.y, position.z),
      quaternion: new THREE.Quaternion(orientation.x, orientation.y, orientation.z, orientation.w)
    };

    return (
      <div>
        <Scene
          ref="scene"
          height={window.innerHeight}
          width={window.innerWidth}
          camera="main"
          effect={THREE.VREffect}>
          <PerspectiveCamera ref="camera" name="main" {...cameraProps}/>
          <SpotLight
            position={new THREE.Vector3(0, 600, 100)}
          />
          <Car name="car" model="veyron" carColor={carColor}/>
          <HudPanel name="hudPanel"/>
          <Floor name="floor"/>
        </Scene>
        <div>
          <button onClick={this.onFullscreenClick.bind(this)} className="fullscreen"><i className="fa fa-arrows-alt"></i><i className="fa fa-play-circle"></i> Launch VR</button>
        </div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
