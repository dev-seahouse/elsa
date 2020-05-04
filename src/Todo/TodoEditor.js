import React from 'react';
import './TodoEditor.scss';

const TodoEditor = (props) => {
  console.log(props.saveShouldBeDisabled);
  const showRemoveBtn = () => {
    return (
      <button className="action-btn" onClick={props.removeBtnClicked}>
        <i className="fas fa-times-circle"/>remove
      </button>
    );
  };
  return (
    <div className="todo-editor">
      <div className="todo-editor-content">
        <textarea
    onChange={props.onChange}
    value={props.editorValue}
    />
      </div>
      <div className="todo-editor-actions">
        {props.mode === 'update' && showRemoveBtn()}
        <button
          className="action-btn"
          onClick={props.saveBtnClicked}
          disabled={props.saveShouldBeDisabled}
        >
          <i className="fas fa-check-circle"/>
          save
        </button>
      </div>
    </div>
  );
};

export default TodoEditor;
