export interface LoginApiResponse {
  token: 'string';
}

export interface LoginState {
  email: string;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage: string;
}
