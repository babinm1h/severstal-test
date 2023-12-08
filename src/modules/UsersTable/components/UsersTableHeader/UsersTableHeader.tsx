import React from 'react';
import classNames from 'classnames';

import { IFiltersState, SortDirections } from '../../types/usersTableFilters.types';

import s from './UsersTableHeader.module.scss';
import { IsActiveOptions } from '../../constants';

interface IUsersTableHeaderProps {
  handleChangeFilter: <T extends keyof IFiltersState>(field: T, value: IFiltersState[T]) => void;
  handleChangeSort: <T extends keyof IFiltersState>(field: T) => void;
  activeSortName?: keyof IFiltersState;
  activeSortDirection?: SortDirections;
  filters: IFiltersState;
}

export const UsersTableHeader = ({
  handleChangeFilter,
  handleChangeSort,
  activeSortName,
  activeSortDirection,
  filters,
}: IUsersTableHeaderProps) => {
  return (
    <thead className={s.thead}>
      <tr>
        <th className={s.headCell}></th>
        <UsersTableHeaderCell
          handleChangeFilter={handleChangeFilter}
          handleChangeSort={handleChangeSort}
          name={'isActive'}
          activeSortDirection={activeSortDirection}
          activeSortName={activeSortName}
          valueType="select"
          value={filters.isActive}
          options={IsActiveOptions}
        />
        <UsersTableHeaderCell
          handleChangeFilter={handleChangeFilter}
          handleChangeSort={handleChangeSort}
          name={'name'}
          activeSortDirection={activeSortDirection}
          activeSortName={activeSortName}
          value={filters.name}
        />
        <UsersTableHeaderCell
          handleChangeFilter={handleChangeFilter}
          handleChangeSort={handleChangeSort}
          value={filters.email}
          name={'email'}
          activeSortDirection={activeSortDirection}
          activeSortName={activeSortName}
        />
        <UsersTableHeaderCell
          handleChangeFilter={handleChangeFilter}
          handleChangeSort={handleChangeSort}
          name={'balance'}
          activeSortDirection={activeSortDirection}
          activeSortName={activeSortName}
          value={filters.balance}
          valueType="number"
        />
      </tr>
    </thead>
  );
};

interface IUsersTableHeaderCellProps {
  handleChangeFilter: <T extends keyof IFiltersState>(field: T, value: IFiltersState[T]) => void;
  handleChangeSort: <T extends keyof IFiltersState>(field: T) => void;
  activeSortName?: keyof IFiltersState;
  activeSortDirection?: SortDirections;
  name: keyof IFiltersState;
  value: any;
  valueType?: 'select' | 'string' | 'number';
  options?: { value: string; name: string }[];
}

export const UsersTableHeaderCell = ({
  handleChangeFilter,
  handleChangeSort,
  activeSortDirection,
  activeSortName,
  name,
  valueType = 'string',
  value,
  options,
}: IUsersTableHeaderCellProps) => {
  const isAscSort = activeSortDirection === SortDirections.ASC;
  const isActive = activeSortName === name;

  const renderField = () => {
    return valueType === 'select' ? (
      <select onChange={(e) => handleChangeFilter(name, e.target.value)} value={value}>
        {options?.map((op) => (
          <option value={op.value} key={op.name}>
            {op.name}
          </option>
        ))}
      </select>
    ) : valueType === 'number' ? (
      <input
        type="number"
        placeholder={name}
        onChange={(e) => handleChangeFilter(name, e.target.value)}
        value={value}
      />
    ) : (
      <input type="text" placeholder={name} onChange={(e) => handleChangeFilter(name, e.target.value)} value={value} />
    );
  };

  return (
    <th className={s.headCell}>
      <div className={s.cellName}>{name}</div>
      <span className={s.cellContent}>
        {renderField()}
        <button className={classNames(s.sort, { [s.active]: isActive })} onClick={() => handleChangeSort(name)}>
          {isActive && isAscSort ? <>&#9660;</> : <>&#9650;</>}
        </button>
      </span>
    </th>
  );
};
