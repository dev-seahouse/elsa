import React from 'react';
import './TodoFilter.scss';

const TodoFilter = (props) => {
  return (
    <div className="todo-filter">
      <div className="pretty p-default p-round p-fill">
        <input
          type="radio"
          name="todo-filter"
          value="all"
          defaultChecked
          onChange={props.onChange}
        />
        <div className="state">
          <label>All</label>
        </div>
      </div>
      <div className="pretty p-default p-round p-fill">
        <input
          type="radio"
          name="todo-filter"
          value="completed"
          onChange={props.onChange}
        />
        <div className="state">
          <label>Completed</label>
        </div>
      </div>
    </div>
  );
};

export default TodoFilter;
