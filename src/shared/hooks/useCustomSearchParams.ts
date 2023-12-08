import { SetURLSearchParams, URLSearchParamsInit, useSearchParams } from 'react-router-dom';

export const useCustomSearchParams = (params?: URLSearchParamsInit): [Record<string, string>, SetURLSearchParams] => {
  const [search, setSearch] = useSearchParams(params);
  const searchAsObject = Object.fromEntries(new URLSearchParams(search));

  return [searchAsObject, setSearch];
};
