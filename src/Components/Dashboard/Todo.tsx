import React from 'react';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { removeTodo } from '../../store/TodoSlice';
import { useDispatch } from '../../store';
import { TodoState } from '../../types/todo';

type Props = TodoState & {
  showAllData?: boolean;
  editTodo(id): void;
};

const Todo: React.FC<Props> = (props) => {
  const { id, priority, date, status, description, showAllData, editTodo } =
    props;

  const dispatch = useDispatch();
  const isSelected = (status: string) => status === 'Selected';

  const isItemSelected = isSelected(status);
  return (
    <TableRow
      hover
      role='checkbox'
      tabIndex={-1}
      key={id}
      selected={isItemSelected}
    >
      <TableCell padding='checkbox' align='right'>
        <Checkbox color='primary' checked={isItemSelected} />
      </TableCell>
      <TableCell align='right'>{priority}</TableCell>
      <TableCell align='right'>{description}</TableCell>
      {showAllData && (
        <TableCell align='right'>
          {new Date(date).toISOString().slice(0, 10).replace(/-/g, '/')}
        </TableCell>
      )}
      {showAllData && (
        <TableCell align='right'>
          <EditIcon onClick={() => editTodo(id)} />
          <DeleteIcon onClick={() => dispatch(removeTodo(id))} />
        </TableCell>
      )}
    </TableRow>
  );
};

export default Todo;
