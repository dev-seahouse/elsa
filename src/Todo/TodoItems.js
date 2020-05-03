import React from 'react';
import './TodoItems.scss';
import './TodoItem';
import TodoItem from './TodoItem';

const TodoItems = (props) => {
  if (!props.todoData || !props.todoData.length) {
    return <div className="has-text-center">~Inbox Zero State~</div>;
  }

  const sortByIsCompleted = (todoData, order = 'asc') =>
    todoData.sort((a, b) =>
      order === 'asc'
        ? a.is_completed - b.is_completed
        : b.is_completed - a.is_completed
    );

  const sortedTodo = sortByIsCompleted([...props.todoData]);

  const todoItems = sortedTodo.map((todo) => (
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
