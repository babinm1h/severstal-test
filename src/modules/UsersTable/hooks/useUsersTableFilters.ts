import { useState, useMemo, useCallback } from 'react';

import { useCustomSearchParams, usePagination, useSkipMountEffect } from '@/shared/hooks';
import { debounce } from '@/shared/utils';
import { IFiltersState, ISortState, SortDirections } from '../types/usersTableFilters.types';
import { IUser } from '@/models/user.model';

import JSON_DATA from '../../../../data/DATA.json';

const USERS_DATA: IUser[] = JSON_DATA;
const LIMIT = 20;

export const useUsersTableFilters = () => {
  const [params, setParams] = useCustomSearchParams();
  const [filters, setFilter] = useState<IFiltersState>({
    balance: params.balance || '',
    email: params.email || '',
    name: params.name || '',
    isActive: params.isActive || '',
  });

  const activePage = +params.page || 1;
  const offset = (activePage - 1) * LIMIT;
  const endIndex = activePage * LIMIT;

  const onChangePage = (page: number) => () => {
    setParams({ ...params, page: `${page || 1}` });
  };

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

  // рендерим только те элементы у которых нет родителя, дочерние показываем при клике на родителя
  const { elementsToShow, parentsLength } = useMemo(() => {
    const parentElements = filteredAndSortedData.filter((el) => el.parentId === 0);
    const elementsToShow = parentElements.slice(offset, endIndex);

    return { elementsToShow, parentsLength: parentElements.length };
  }, [filteredAndSortedData, endIndex, offset]);

  const { pages } = usePagination({
    totalCount: parentsLength,
    pageSize: LIMIT,
    offset: offset,
  });

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
    debouncedFilters({ ...params, ...filters, page: 1 });
  }, [filters]);

  return {
    onChangePage,
    activePage,
    pages,
    //
    handleChangeFilter,
    handleChangeSort,
    activeSort,
    filters,
    filteredAndSortedData,
    elementsToShow,
  };
};
