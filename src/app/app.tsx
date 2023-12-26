import { UsersTable } from '@/modules/UsersTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/normalize.css';
import './styles/base.scss';

import { Effects } from './effects';
import Ref from './ref';
import { SameSetState } from './sameSetState';
import { DebouncedEffect } from './debouncedEffect';
import SetStateExample from './setStateExample';

export const App = () => {
  return (
    <BrowserRouter>
      <DebouncedEffect />
      <SameSetState />
      <SetStateExample />
      {/* <Ref /> */}
      <Effects />
      <Routes>
        <Route path="/" element={<UsersTable />} />
      </Routes>
    </BrowserRouter>
  );
};
