import React from 'react';
import Header from './Header';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
import TodoTab from './TodoTab';
import { useSelector } from '../../store';
import { selectors } from '../../store/TodoSlice';

export default function Dashboard() {
  const todoCount = useSelector(selectors.selectTotalTodo());

  return (
    <>
      <Header />
      {todoCount === 0 ? <CreateTodo /> : <TodoTab />}
    </>
  );
}
