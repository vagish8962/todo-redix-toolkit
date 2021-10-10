import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';

import { useDispatch, useSelector } from '../../store';
import { addTodo, updateTodo } from '../../store/TodoSlice';
import { selectors } from '../../store/TodoSlice';

interface Props {
  handleClose?(): void;
  selectedId?: number;
}

const CreateTodo: React.FC<Props> = (props) => {
  const { handleClose, selectedId } = props;

  const dispatch = useDispatch();
  const storeData = useSelector(selectors.selectTodoById(String(selectedId)));
  const {
    priority: storePriority = '',
    date: storeDate = new Date(),
    status: storeStatus = '',
    description: storeDescription = '',
  } = storeData || {};

  const [date, setDate] = useState<Date>(storeDate);
  const [priority, setPriority] = useState<string>(storePriority);
  const [status, setStatus] = useState<string>(storeStatus);
  const [description, setDescription] = useState<string>(storeDescription);

  const todoSubmitHandler = () => {
    selectedId
      ? dispatch(
          updateTodo(priority, date, status, description, String(selectedId))
        )
      : dispatch(
          addTodo({
            date,
            priority,
            status,
            description,
            id: uuidv4(),
          })
        );
    handleClose && handleClose();
  };

  return (
    <div
      style={{
        width: 'fit-content',
        margin: 'auto',
        border: '1px solid rgba(0, 0, 0, 0.12)',
        marginTop: '19px',
      }}
    >
      {selectedId ? <h3>Update Item</h3> : <h3>Add new Item</h3>}
      <Divider />
      <Box>
        <FormControl sx={{ m: 1, width: 320, marginTop: '50px' }}>
          <InputLabel id='demo-simple-select-label'>Status</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={status}
            label='status'
            onChange={(e) => setStatus(e.target.value)}
          >
            <MenuItem value='Selected'>Selected</MenuItem>
            <MenuItem value='In progress'>In Progress</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <FormControl sx={{ m: 1, width: 320 }}>
          <InputLabel id='demo-simple-select-label'>Priority</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={priority}
            label='priority'
            onChange={(e) => setPriority(e.target.value)}
          >
            <MenuItem value='Low priority'>Low Priority</MenuItem>
            <MenuItem value='Medium priority'>Medium Priority</MenuItem>
            <MenuItem value='High Priority'>High Priority</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <FormControl sx={{ m: 1, width: 320 }}>
          <TextField
            id='outlined-basic'
            label='Description'
            variant='outlined'
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </FormControl>
      </Box>

      <Box>
        <FormControl sx={{ m: 1, width: 320 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Select Date'
              value={date}
              onChange={(newValue: Date) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </FormControl>
      </Box>
      <Divider />
      <Box
        sx={{
          minWidth: 320,
          margin: '50px 10px 10px 50px',
          textAlign: 'right',
        }}
      >
        <Button
          variant='contained'
          disabled={!date || !priority || !status || !description}
          onClick={todoSubmitHandler}
        >
          {selectedId ? 'Update' : 'Add New'}
        </Button>
      </Box>
    </div>
  );
};

export default CreateTodo;
