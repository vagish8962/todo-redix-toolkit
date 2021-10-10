import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';

import { useSelector, useDispatch } from '../../store';
import { loginUser, userSelector, clearState } from '../../store/LoginSlice';

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const { register, handleSubmit } = useForm();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      history.push('/');
    }
  }, [isError, isSuccess]);

  return (
    <Fragment>
      <div>
        <div>
          <div>
            <img
              src='todo.png'
              alt='logo'
              style={{
                position: 'absolute',
                top: '50%',
                left: '25%',
                transform: 'translateX(-50%) translateY(-50%)',
              }}
            />
            <form
              style={{
                padding: '21px 100px',
                border: '1px solid #ccc',
                position: 'absolute',
                top: '50%',
                left: '75%',
                transform: 'translateX(-50%) translateY(-50%)',
              }}
              onSubmit={onSubmit}
              method='POST'
            >
              <h2>Sign in to your account</h2>
              <div>
                <FormControl sx={{ m: 1, width: 320 }}>
                  <TextField
                    id='outlined-basic'
                    label='email'
                    variant='outlined'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </div>

              <div>
                <FormControl sx={{ m: 1, width: 320 }}>
                  <TextField
                    id='outlined-basic'
                    label='password'
                    variant='outlined'
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
              </div>

              <div>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={!email || !password}
                >
                  {isFetching ? (
                    <svg
                      className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        stroke-width='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
                  ) : null}
                  Sign in
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </Fragment>
  );
};

export default Login;
