import React from 'react';
import './TodoEditor.scss';

const TodoEditor = (props) => {
  return (
    <div className="todo-editor">
      <div className="todo-editor-content">
        <textarea></textarea>
      </div>
      <div className="todo-editor-actions">
        <button className="action-btn">
          <i className="fas fa-times-circle"></i>remove
        </button>
        <button className="action-btn">
          <i className="fas fa-check-circle"></i>save
        </button>
      </div>
    </div>
  );
};

export default TodoEditor;
