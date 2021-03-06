import React, { useEffect, useReducer, useState } from 'react';
import './TodoList';
import SearchBar from '../UIComponents/Widgets/SearchBar';
import TodoFilter from './TodoFilter';
import TodoItems from './TodoItems';
import AddTodoActionBar from './AddTodoActionBar';
import TodoEditor from './TodoEditor';
import axios from 'axios';

// todo: move this to config.js
const HOST = 'https://elsado.herokuapp.com';

const editorReducer = (currState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...currState,
        value: '',
        mode: 'create',
        show: true,
      };
    case 'CHANGE':
      return {
        ...currState,
        value: action.value,
        saveShouldBeDisabled: !(action.value && action.value.length),
      };
    case 'EDIT':
      return {
        ...currState,
        mode: 'update',
        show: true,
        editedItemId: action.todoId,
        value: action.value,
      };
    case 'CREATED':
      return {
        ...currState,
        value: '',
      };
    case 'DELETED':
      return {
        ...currState,
        value: '',
        show: false,
      };

    default:
      return currState;
  }
};

const TodoList = (props) => {
  const [todoData, setTodoData] = useState([]);
  const [filterTerm, setFilterTerm] = useState('');

  useEffect(() => {
    console.info('setTodo effect fired');
    // set data
    axios
      .get(HOST + '/todos')
      .then((res) => {
        setTodoData(res.data);
      })
      .catch(console.error);
  }, []);

  const [editorState, dispatch] = useReducer(editorReducer, {
    type: '',
    mode: 'create',
    show: false,
    value: '',
    saveShouldBeDisabled: true,
    editedItemId: '',
  });

  const toggleIsCompleted = (todo) => !todo.is_completed;

  const todoChkBoxClickedHandler = (todoId) => {
    setTodoData((prevData) => {
      const clickedTodoIndex = prevData.findIndex((todo) => todo.id === todoId),
        newData = [...prevData],
        newTodoObj = { ...newData[clickedTodoIndex] };
      newTodoObj.is_completed = toggleIsCompleted(newTodoObj);
      newData[clickedTodoIndex] = newTodoObj;
      axios
        .post(
          HOST + '/todos/' + todoId,
          { is_completed: newTodoObj.is_completed },
          {
            headers: {
              'X-HTTP-Method-Override': 'PUT',
            },
          }
        )
        .catch(console.error);
      return newData;
    });
  };

  const todoTitleClickedHandler = (todoId, content) => {
    dispatch({
      type: 'EDIT',
      todoId: todoId,
      value: content,
    });
  };

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

  const createRecordAndUpdateUI = (content) => {
    const newTodo = {
      content: content,
      is_completed: false,
      date_added: new Date(),
      date_updated: new Date(),
      app_user_id: 1,
      is_deleted: false,
    };

    axios
      .post(HOST + '/todos', newTodo)
      .then((res) => {
        newTodo.id = res.data.id;
        setTodoData((prevState) => [...prevState, newTodo]);
        dispatch({
          type: 'CREATED',
        });
      })
      .catch(console.error);
  };

  const updateRecordAndUI = (updatedTodo, todoId) => {
    const UPDATED_SUCESS_CODE = 1;

    axios
      .post(HOST + '/todos/' + todoId, updatedTodo, {
        headers: {
          'X-HTTP-Method-Override': 'PUT',
        },
      })
      .then((res) => {
        if (res.data && res.data.rowCount === UPDATED_SUCESS_CODE) {
          setTodoData((prevData) => {
            const editedTodoIndex = prevData.findIndex(
                (todo) => todo.id === todoId
              ),
              newData = [...prevData];
            newData[editedTodoIndex] = {
              ...newData[editedTodoIndex],
              ...updatedTodo,
            };
            return newData;
          });
        }
      })
      .catch(console.error);
  };

  const removeRecordAndUpdateUI = (editingItemId, UPDATED_SUCCESS_CODE) => {
    axios
      .post(
        HOST + '/todos/' + editingItemId,
        { is_deleted: true },
        {
          headers: {
            'X-HTTP-Method-Override': 'PUT',
          },
        }
      )
      .then((res) => {
        if (res.data && res.data.rowCount === UPDATED_SUCCESS_CODE) {
          dispatch({
            type: 'DELETED',
          });
          setTodoData((prevData) => {
            const newData = [...prevData];
            return newData.filter((item) => item.id !== editingItemId);
          });
        }
      })
      .catch(console.error);
  };

  const removeBtnClickedHandler = (e) => {
    const UPDATED_SUCCESS_CODE = 1;
    const editingItemId = editorState.editedItemId;
    removeRecordAndUpdateUI(editingItemId, UPDATED_SUCCESS_CODE);
  };

  const saveBtnClickedHandler = (e) => {
    e.preventDefault();
    if (editorState.saveShouldBeDisabled) {
      console.warn('this should never appear.');
    }
    const content = editorState.value;
    if (editorState.mode === 'create') createRecordAndUpdateUI(content);
    if (editorState.mode === 'update') {
      const updatedTodo = {
        content: content,
        is_completed: false,
        date_updated: new Date(),
        app_user_id: 1,
        is_deleted: false,
      };
      updateRecordAndUI(updatedTodo, editorState.editedItemId);
    }
  };

  const searchChangedHandler = (e) => {
    const searchTerm = e.target.value;
    setFilterTerm(() => searchTerm || '');
  };

  const filterChangedHandler = (e) => {
    setFilterTerm(':' + e.target.value.toLowerCase());
  };

  return (
    <div className="todo-list">
      <SearchBar onChange={searchChangedHandler} />
      <TodoFilter onChange={filterChangedHandler} />
      <TodoItems
        todoData={todoData}
        checkBoxOnClick={todoChkBoxClickedHandler}
        todoTitleOnClick={todoTitleClickedHandler}
        sortBy={{ completed: 'asc' }}
        filterTerm={filterTerm}
      />
      <AddTodoActionBar onClick={addTodoBtnClickedHandler} />
      {editorState.show && (
        <TodoEditor
          mode={editorState.mode}
          onChange={editorChangedHandler}
          saveBtnClicked={saveBtnClickedHandler}
          removeBtnClicked={removeBtnClickedHandler}
          saveShouldBeDisabled={editorState.saveShouldBeDisabled}
          editorValue={editorState.value || ''}
        />
      )}
    </div>
  );
};

export default TodoList;
