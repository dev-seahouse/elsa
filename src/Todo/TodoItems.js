import React from 'react';
import './TodoItems.scss';
import './TodoItem';
import TodoItem from './TodoItem';

const TodoItems = (props) => {
  if (!props.todoData || !props.todoData.length) {
    return <div className="has-text-center">~Inbox Zero State~</div>;
  }

  const sortTodoData = (sortedArr) => {
    const newArr = sortedArr.sort((a, b) => {
      if (a.is_completed === b.is_completed) {
        const aDate = new Date(a.date_updated);
        const bDate = new Date(b.date_updated);
        return bDate - aDate;
      }
      return a.is_completed - b.is_completed;
    });
    return newArr;
  };

  const sortedTodo = sortTodoData([...props.todoData]);
  console.log(sortedTodo);

  const todoItems = sortedTodo.map((todo) => (
    <TodoItem
      key={todo.id}
      id={todo.id}
      content={todo.content}
      userId={todo.app_juser_idj}
      isCompleted={todo.is_completed}
      dateUpdated={todo.date_updatedj}
      onClick={props.onClick}
    />
  ));

  return <div className="todo-items">{todoItems}</div>;
};

export default TodoItems;
