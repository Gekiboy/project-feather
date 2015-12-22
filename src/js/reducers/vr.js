import {
  DISCOVER_VR_INPUTS_FULFILLED,
  REQUEST_VR_STATE_UPDATE
} from '../actions/vr';

const defaultState = {
  inputs: [],
  orientation: {
    w: 1,
    x: -0.05,
    y: 0.3,
    z: 0
  },
  position: {
    x: 0.3,
    y: 0.2,
    z: 0.05
  }
};

function getInputs(devices) {
  let vrDevices = devices.filter(device => device.deviceName
      && (device.deviceName.toLowerCase().indexOf('oculus') !== -1
      || device.deviceName.toLowerCase().indexOf('vive') !== -1));

  if (vrDevices.length >= 1) {
    vrDevices = vrDevices.filter(device => device.deviceName && device.deviceName.toLowerCase().indexOf('cardboard') === -1);
  }
  
  return vrDevices.filter(device => device instanceof PositionSensorVRDevice);
}

function getInputStates(inputs) {
  let inputStates = {};
  
  if (inputs.length > 0) {
    inputs.forEach(input => {
      let state = input.getState();
      
      if (state.orientation !== null) {
        inputStates.orientation = state.orientation;
      }
      
      if (state.position !== null) {
        inputStates.position = state.position;
      }
    });
  }
  
  if (inputStates.orientation && inputStates.position) {
    console.log(JSON.stringify({
      orientation: {
        w: inputStates.orientation.w,
        x: inputStates.orientation.x,
        y: inputStates.orientation.y,
        z: inputStates.orientation.z
      },
      position: {
        x: inputStates.position.x,
        y: inputStates.position.y,
        z: inputStates.position.z
      }
    }));
  }
  
  return inputStates;
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_VR_STATE_UPDATE:
      return Object.assign({}, state, getInputStates(state.inputs));
    case DISCOVER_VR_INPUTS_FULFILLED:
      return Object.assign({}, state, { inputs: getInputs(action.payload) });
    default:
      return state;
  }
};