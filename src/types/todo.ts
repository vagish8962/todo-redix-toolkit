export interface LoginApiResponse {
  token: 'string';
}

export interface TodoState {
  priority: string;
  date: Date;
  status: string;
  description: string;
  id: string;
}
