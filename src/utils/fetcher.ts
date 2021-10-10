export const thunkFetcher = async <Data = unknown>(
  url: string,
  config: RequestInit
): Promise<Data> => {
  const response = await fetch(url, config);
  if (response.ok) {
    return response.json() as Promise<Data>;
  }

  throw new Error('Response was not OK');
};
