import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import { TodoState } from '../types/todo';
import { RootState } from './index';

export const entityAdapter = createEntityAdapter<TodoState>();

const todoSlice = createSlice({
  name: 'todo',
  initialState: entityAdapter.getInitialState(),

  // reducers: builder => {
  //   builder.addCase(addTodo , (state) => {
  //     entityAdapter.addOne(state, action.pa)
  //   })
  // }
  // updateTodo: entityAdapter.updateOne(state, {
  //   id,
  //   changes: { action.payload },
  // }),
  reducers: {
    addTodo: entityAdapter.addOne,
    removeTodo: entityAdapter.removeOne,
    updateTodo: {
      reducer: (state, { payload }: PayloadAction<TodoState>) => {
        const { id } = payload;
        entityAdapter.updateOne(state, {
          id,
          changes: payload,
        });
      },
      prepare: (
        priority: string,
        date: Date,
        status: string,
        description: string,
        id: string
      ) => {
        return {
          payload: {
            priority,
            date,
            status,
            description,
            id,
          },
        };
      },
    },
  },
});

export const todoSelector = entityAdapter.getSelectors(
  (state: RootState) => state.todo
);

const selectAllTodo =
  () =>
  (state: RootState): ReturnType<typeof todoSelector.selectAll> =>
    todoSelector.selectAll(state);

const selectTodoById =
  (id: string) =>
  (state: RootState): ReturnType<typeof todoSelector.selectById> =>
    todoSelector.selectById(state, id);

const selectTotalTodo =
  () =>
  (state: RootState): ReturnType<typeof todoSelector.selectTotal> =>
    todoSelector.selectTotal(state);

const selectors = {
  selectAllTodo,
  selectTodoById,
  selectTotalTodo,
};
const { addTodo, removeTodo, updateTodo } = todoSlice.actions;

export { selectors, addTodo, removeTodo, updateTodo };

export default todoSlice.reducer;
