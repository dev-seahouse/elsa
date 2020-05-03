import React, { useState, useEffect, useReducer } from 'react';
import './TodoList';
import SearchBar from '../UIComponents/Widgets/SearchBar';
import TodoFilter from './TodoFilter';
import TodoItems from './TodoItems';
import AddTodoActionBar from './AddTodoActionBar';
import todoMockData from './mockdata';
import TodoEditor from './TodoEditor';

const editorReducer = (currState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...currState,
        show: true,
      };
    case 'CHANGE':
      return {
        ...currState,
        value: action.value,
        saveShouldBeDisabled: !(action.value && action.value.length),
      };
    default:
      return currState;
  }
};

const TodoList = (props) => {
  const [todoData, setTodoData] = useState([]);
  const [editorState, dispatch] = useReducer(editorReducer, {
    type: '',
    show: false,
    value: '',
    saveShouldBeDisabled: true,
  });

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
    console.info('setTodo effect fired');
    setTodoData(todoMockData);
  }, []);

  const addTodoBtnClickedHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: 'ADD',
    });
  };

  const editorChangedHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
    });
  };

  const handleSave = (content) => {
    const newTodo = {
      id: Math.random() * 100,
      content: content,
      is_completed: false,
      date_added: new Date(),
      date_updated: new Date(),
      user_id: 2,
      is_deleted: false,
    };
    // make http request and get the returned inserted id

    setTodoData((prevState) => {
      const newData = [...prevState, newTodo];
      return newData;
    });
  };

  const handleSaveBtnClicked = (e) => {
    e.preventDefault();
    if (editorState.saveShouldBeDisabled) {
      console.warn('this should never appear.');
    }

    const content = editorState.value;
    handleSave(content);
  };

  return (
    <div className="todo-list">
      <SearchBar />
      <TodoFilter />
      <TodoItems
        todoData={todoData}
        onClick={todoChkBoxClickedHandler}
        sortBy={{ completed: 'asc' }}
      />
      <AddTodoActionBar onClick={addTodoBtnClickedHandler} />
      {editorState.show && (
        <TodoEditor
          mode={editorState.mode}
          onChange={editorChangedHandler}
          saveBtnClicked={handleSaveBtnClicked}
          saveShouldBeDisabled={editorState.saveShouldBeDisabled}
        />
      )}
    </div>
  );
};

export default TodoList;
