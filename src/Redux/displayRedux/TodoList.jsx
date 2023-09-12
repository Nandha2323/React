import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../Reducers/todoSlice';

function TodoList() {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todo);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="todo-list-container">
      <h1 className="todo-list-title">Todo List</h1>
      {loading === 'loading' && <div className="loading-text loading">Loading...</div>}
      {loading === 'failed' && <div className="error-text">Error: {error}</div>}
      {loading === 'succeeded' && (
        <table className="todo-table table text-center">
          <thead>
            <tr >
              <th>ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr className="todo-item " key={todo.id}>
                <td className='text-center'>{todo.id}</td>
                <td className='text-center'>{todo.title}</td>
                <td className='text-center'>{todo.completed ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TodoList;
