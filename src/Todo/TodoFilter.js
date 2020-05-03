import React from 'react';
import './TodoFilter.scss';

const TodoFilter = (props) => {
  return (
    <div className="todo-filter">
      <div className="pretty p-default p-round p-fill">
        <input type="radio" name="todo-filter" defaultChecked />
        <div className="state">
          <label>All</label>
        </div>
      </div>
      <div className="pretty p-default p-round p-fill">
        <input type="radio" name="todo-filter" />
        <div className="state">
          <label>Completed</label>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
