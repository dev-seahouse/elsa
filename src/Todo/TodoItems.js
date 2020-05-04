import React from 'react';
import './TodoItems.scss';
import './TodoItem';
import TodoItem from './TodoItem';
import Fuse from 'fuse.js';

const TodoItems = (props) => {
  if (!props.todoData || !props.todoData.length) {
    return <div className="has-text-center">~Inbox Zero State~</div>;
  }

  const filterData = (data, searchTerm) => {
    if (!searchTerm || searchTerm.length < 3) return data;
    const options = {
      includeScore: false,
      keys: ['content'],
      // findAllMatches: true,
    };
    const fuse = new Fuse(data, options);
    const result = fuse.search(searchTerm);
    return result.map((obj) => obj.item);
  };

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

  console.log(props.filterTerm);
  const filteredData = filterData([...props.todoData], props.filterTerm);
  const sortedTodo = sortTodoData([...filteredData]);

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
