import React from 'react';

import TableBody from '@mui/material/TableBody';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import { styled, Box } from '@mui/system';

import CreateTodo from './CreateTodo';
import { TodoState } from '../../types/todo';
import Todo from './Todo';

const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'white',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

interface Props {
  list: TodoState[];
  showAllData: boolean;
}

const TodoList: React.FC<Props> = (props) => {
  const { list = [], showAllData } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedId, setSelectedID] = React.useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const editTodoHandler = (id) => {
    T;
    setOpen(true);
    setSelectedID(id);
  };

  return (
    <>
      <TableContainer>
        <Table>
          <TableBody>
            {list.map((todo) => (
              <Todo
                showAllData={showAllData}
                {...todo}
                editTodo={editTodoHandler}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <button
        type='button'
        onClick={handleOpen}
        style={{
          fontSize: '44px',
          background: 'no-repeat',
          border: 'none',
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
      >
        +
      </button>
      <StyledModal
        aria-labelledby='unstyled-modal-title'
        aria-describedby='unstyled-modal-description'
        open={open}
        onClose={handleClose}
        BackdropComponent={Backdrop}
      >
        <Box sx={style}>
          <div style={{ textAlign: 'center' }}>
            <CreateTodo handleClose={handleClose} selectedId={selectedId} />
          </div>
        </Box>
      </StyledModal>
    </>
  );
};

export default TodoList;
