import React from 'react';
let {
  Component
} = React;
import { connect } from 'react-redux';
import { Link } from 'react-router';

var styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
};

// Which part of the Redux global state does our component want to receive as props?
function mapStateToProps(state) {
  return {};
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch) {
  return {
    onAlert: (text) => dispatch(alert(text))
  };
}

class App extends Component {
  
  componentDidMount() {
    let { dispatch } = this.props;
  }
  
  render() {
    
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);