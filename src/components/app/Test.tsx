import React, { Component } from 'react';
import { EditorState, Editor } from 'draft-js';
import { Provider, connect } from 'react-redux';
import store from './../redux/store';
import {createStore} from 'redux';
import testReducer from './../redux/reducers/testReducer';

// const store = createStore(testReducer);

const AppEditor = ({ editorState, onSaveEditorState }) => (
  <Editor
    editorState={editorState}
    onChange={onSaveEditorState}
  />
);

const mapStateToProps = ({ editorState }) => ({ editorState });

const mapDispatchToProps = (dispatch) => ({
  onSaveEditorState: (editorState) => {
    dispatch({
      type: 'UPDATE_EDITOR_STATE',
      payload: editorState,
    })
  }
});

const ConnectedEditor = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppEditor);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedEditor/>
      </Provider>
    );
  }
}

export default App;