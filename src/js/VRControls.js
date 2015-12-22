/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 */

THREE.VRControls = function ( object, onError ) {

	var scope = this;

	var vrInputs = [];

	// the Rift SDK returns the position in meters
	// this scale factor allows the user to define how meters
	// are converted to scene units.

	this.scale = 1;

	this.update = function (state) {
    
    object.quaternion.copy( state.orientation || object.quaternion );
    object.position.copy( state.position || object.position ).multiplyScalar( scope.scale );
	};

	this.resetSensor = function () {

		for ( var i = 0; i < vrInputs.length; i ++ ) {

			var vrInput = vrInputs[ i ];

			if ( vrInput.resetSensor !== undefined ) {

				vrInput.resetSensor();

			} else if ( vrInput.zeroSensor !== undefined ) {

				vrInput.zeroSensor();

			}

		}

	};

	this.zeroSensor = function () {

		console.warn( 'THREE.VRControls: .zeroSensor() is now .resetSensor().' );
		this.resetSensor();

	};

	this.dispose = function () {

		vrInputs = [];

	};

};
