import React from 'react';
import './TodoItem.scss';

const extractTitle = (string) => string.slice(0, 31) + '..';

const TodoItem = (props) => {
  return (
    <div className="todo-item">
      <div className="pretty p-icon p-smooth">
        <input
          type="checkbox"
          defaultChecked={props.isCompleted}
          onClick={props.onClick.bind(this, props.id)}
        />
        <div className="state">
          <i className="icon far fa-check"></i>
          <label />
        </div>
      </div>
      <span
        className={`todo-item-text ${
          props.isCompleted && 'todo-item-is-completed'
        } `}
      >
        {extractTitle(props.content)}
      </span>
    </div>
  );
};

export default TodoItem;
