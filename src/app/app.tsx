import React from 'react';

import { UsersTable } from '@/modules/UsersTable';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/normalize.css';
import './styles/base.scss';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersTable />} />
      </Routes>
    </BrowserRouter>
  );
};
