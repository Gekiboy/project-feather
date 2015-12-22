export const DISCOVER_VR_INPUTS_FULFILLED = 'DISCOVER_VR_INPUTS_FULFILLED';
export const REQUEST_VR_STATE_UPDATE = 'REQUEST_VR_STATE_UPDATE';

export function discoverVRInputDevices() {
  return {
    type: 'DISCOVER_VR_INPUTS',
    payload: {
      promise: navigator.getVRDevices()
    }
  }
}

export function requestVRStateUpdate() {
  return {
    type: REQUEST_VR_STATE_UPDATE
  }
}