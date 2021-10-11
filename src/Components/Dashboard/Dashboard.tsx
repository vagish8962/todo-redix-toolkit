import React, { useEffect } from 'react';
import Header from './Header';
import CreateTodo from './CreateTodo';
import TodoTab from './TodoTab';
import { useSelector, useDispatch } from '../../store';
import { selectors, addManyTodo } from '../../store/TodoSlice';

export default function Dashboard() {
  const todoCount = useSelector(selectors.selectTotalTodo());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(addManyTodo(JSON.parse(localStorage.getItem('todo'))));
  }, []);

  return (
    <>
      <Header />
      {todoCount === 0 ? <CreateTodo /> : <TodoTab />}
    </>
  );
}
