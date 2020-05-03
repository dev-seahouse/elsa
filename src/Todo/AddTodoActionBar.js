import React from 'react';
import './AddTodoActionBar.scss';

const AddTodo = (props) => {
  return (
    <div className="action-bar">
      <button className="button addTodoBtn" type="button">
        <span>
          <i className="fas fa-plus"></i>
        </span>
      </button>
    </div>
  );
};

export default AddTodo;
