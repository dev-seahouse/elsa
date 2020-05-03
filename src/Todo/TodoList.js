import React, { useState, useEffect } from 'react';
import './TodoList';
import SearchBar from '../UIComponents/Widgets/SearchBar';
import TodoFilter from './TodoFilter';
import TodoItems from './TodoItems';
import AddTodoActionBar from './AddTodoActionBar';
import todoMockData from './mockdata';
import TodoEditor from './TodoEditor';

const TodoList = (props) => {
  const [todoData, setTodoData] = useState([]);

  const toggleIsCompleted = (todo) => !todo.is_completed;

  const todoChkBoxClickedHandler = (todoId) => {
    setTodoData((prevData) => {
      const clickedTodoIndex = prevData.findIndex((todo) => todo.id === todoId);
      const newData = [...prevData];
      const newTodoObj = { ...newData[clickedTodoIndex] };
      newTodoObj.is_completed = toggleIsCompleted(newTodoObj);
      newData[clickedTodoIndex] = newTodoObj;
      return newData;
    });
  };

  useEffect(() => {
    // set data
    console.log('only run once');
    setTodoData(todoMockData);
  }, []);

  return (
    <div className="todo-list">
      <SearchBar />
      <TodoFilter />
      <TodoItems
        todoData={todoData}
        onClick={todoChkBoxClickedHandler}
        sortBy={{ completed: 'asc' }}
      />
      <AddTodoActionBar />
      <TodoEditor />
    </div>
  );
};

export default TodoList;
