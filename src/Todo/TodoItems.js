import React from 'react';
import './TodoItems.scss';
import './TodoItem';
import TodoItem from './TodoItem';

const TodoItems = (props) => {
  if (!props.todoData || !props.todoData.length) {
    return <div className="has-text-center">~Inbox Zero State~</div>;
  }

  const sortTodoData = (sortedArr) => {
    return sortedArr.sort((a, b) => {
      if (a.is_completed === b.is_completed) {
        const aDate = new Date(a.date_updated);
        const bDate = new Date(b.date_updated);
        return bDate - aDate;
      }
      return a.is_completed > b.is_completed;
    });
  };

  const sortedTodo = sortTodoData([...props.todoData]);

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
