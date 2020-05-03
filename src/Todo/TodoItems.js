import React from 'react';
import './TodoItems.scss';
import './TodoItem';
import TodoItem from './TodoItem';

const TodoItems = (props) => {
  if (!props.todoData || !props.todoData.length) {
    return <div className="has-text-center">~Inbox Zero State~</div>;
  }

  const todoItems = props.todoData.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      content={todo.content}
      userId={todo.user_id}
      isCompleted={todo.is_completed}
      onClick={props.onClick}
    />
  ));

  return <div className="todo-items">{todoItems}</div>;
};

export default TodoItems;
