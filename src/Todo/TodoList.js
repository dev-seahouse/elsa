import React, { useState, useEffect, useReducer } from 'react';
import './TodoList';
import SearchBar from '../UIComponents/Widgets/SearchBar';
import TodoFilter from './TodoFilter';
import TodoItems from './TodoItems';
import AddTodoActionBar from './AddTodoActionBar';
import TodoEditor from './TodoEditor';
import axios from 'axios';

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
    console.info('setTodo effect fired');
    // set data
    axios
      .get('http://localhost:5000/todos')
      .then((res) => {
        setTodoData(res.data);
      })
      .catch(console.error);
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
      content: content,
      is_completed: false,
      date_added: new Date(),
      date_updated: new Date(),
      app_user_id: 1,
      is_deleted: false,
    };

    axios.post('http://localhost:5000/todos', newTodo).then((res) => {
      newTodo.id = res.data.id;
      setTodoData((prevState) => {
        const newData = [...prevState, newTodo];
        return newData;
      });
    });
    // make http request and get the returned inserted id
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
