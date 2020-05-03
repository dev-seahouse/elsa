import React, { useState, useEffect } from 'react';
import './TodoList';
import SearchBar from '../UIComponents/Widgets/SearchBar';
import TodoFilter from './TodoFilter';
import TodoItems from './TodoItems';

import todoMockData from './mockdata';

const TodoList = (props) => {
  const sortByIsCompleted = (todoData) =>
    todoData.sort((a, b) => a.is_completed - b.is_completed);

  const [todoData, setTodoData] = useState([]);

  const toggleIsCompleted = (todo) => !todo.is_completed;

  const todoChkBoxClickedHandler = (todoId) => {
    setTodoData((prevData) => {
      const clickedTodoIndex = prevData.findIndex((todo) => todo.id === todoId);
      const newData = [...prevData];
      const newTodoObj = { ...newData[clickedTodoIndex] };
      newTodoObj.is_completed = toggleIsCompleted(newTodoObj);
      newData[clickedTodoIndex] = newTodoObj;
      return sortByIsCompleted(newData);
    });
  };

  useEffect(() => {
    // set data
    console.log('only run once');
    const sortedData = sortByIsCompleted(todoMockData);
    setTodoData(sortedData);
  }, []);

  return (
    <div className="todo-list">
      <SearchBar />
      <TodoFilter />
      <TodoItems todoData={todoData} onClick={todoChkBoxClickedHandler} />
      <div className="actions">
        <button>+</button>
      </div>
      <div className="editor">
        <div className="editor-content">
          <textarea name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div className="editor-actions"></div>
      </div>
    </div>
  );
};

export default TodoList;
