import { useCallback, useMemo, useState } from 'react';

import { IUser } from '@/models/user.model';
import { UsersTableHeader } from '../../components/UsersTableHeader';
import { UsersTableBody } from '../../components/UsersTableBody';
import { IFiltersState, ISortState, SortDirections } from '../../types/usersTableFilters.types';
import { useCustomSearchParams, useSkipMountEffect } from '@/shared/hooks';
import { debounce } from '@/shared/utils';

import JSON_DATA from '../../../../../data/DATA.json';
import s from './UsersTable.module.scss';

export const UsersTable = () => {
  const [params, setParams] = useCustomSearchParams();
  // const [activeSort, setActiveSort] = useState<null>(null);
  const [filters, setFilter] = useState<IFiltersState>({
    balance: params.balance || '',
    email: params.email || '',
    name: params.name || '',
    isActive: params.isActive || '',
  });

  const activeSort: ISortState | null = useMemo(() => {
    if (params.direction && params.sort) {
      return {
        direction: params.direction as SortDirections,
        sort: params.sort as keyof IFiltersState,
      };
    }

    return null;
  }, [params.direction, params.sort]);

  const filtersParams = useMemo(() => {
    return {
      balance: params.balance || '',
      email: params.email || '',
      name: params.name || '',
      isActive: params.isActive || '',
    };
  }, [params.balance, params.email, params.name, params.isActive]);

  const USERS_DATA: IUser[] = JSON_DATA;

  const filteredData = useMemo(() => {
    const { balance, email, isActive, name } = filtersParams;

    const filtered = USERS_DATA.filter((user) => {
      return (
        (name ? user.name.match(new RegExp(name, 'i')) : true) &&
        (balance ? user.balance.match(new RegExp(balance, 'i')) : true) &&
        (email ? user.email.match(new RegExp(email, 'i')) : true) &&
        (isActive ? `${user.isActive}` === isActive : true)
      );
    });

    return filtered;
  }, [filtersParams]);

  const filteredAndSortedData = useMemo(() => {
   
    return activeSort
      ? [...filteredData].sort((a, b) => {
          const isAsc = activeSort.direction === SortDirections.ASC;
          const sortFieldName = activeSort.sort;

          if (sortFieldName === 'isActive') {
            return isAsc
              ? Number(a[sortFieldName]) - Number(b[sortFieldName])
              : Number(b[sortFieldName]) - Number(a[sortFieldName]);
          } else {
            return isAsc
              ? a[sortFieldName].toLocaleLowerCase().localeCompare(b[sortFieldName].toLocaleLowerCase())
              : b[sortFieldName].toLocaleLowerCase().localeCompare(a[sortFieldName].toLocaleLowerCase());
          }
        })
      : filteredData;
  }, [filteredData, activeSort]);

  const handleChangeFilter = <T extends keyof IFiltersState>(field: T, value: IFiltersState[T]) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangeSort = <T extends keyof IFiltersState>(sort: T) => {
    // при первом клике сортируем по ASC
    let direction: SortDirections = SortDirections.ASC;

    if (sort === activeSort?.sort) {
      // при втором клике сортируем по DESC
      if (activeSort.direction === SortDirections.ASC) {
        direction = SortDirections.DESC;
      } else {
        // при третьем клике убираем сортировку
        return setParams({ ...params, sort: '', direction: '' });
      }
    }

    setParams({ ...params, sort, direction });
  };

  const debouncedFilters = useCallback(
    debounce((params: Record<string, string>) => {
      setParams(params);
    }, 400),
    [],
  );

  useSkipMountEffect(() => {
    debouncedFilters({ ...params, ...filters });
  }, [filters]);

  return (
    <main className={s.main}>
      <table className={s.table}>
        <UsersTableHeader
          handleChangeFilter={handleChangeFilter}
          handleChangeSort={handleChangeSort}
          activeSortDirection={activeSort?.direction}
          activeSortName={activeSort?.sort}
          filters={filters}
        />
        <UsersTableBody tableData={filteredAndSortedData} />
      </table>
    </main>
  );
};
