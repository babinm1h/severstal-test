import { UsersTableHeader } from '../../components/UsersTableHeader';
import { UsersTableBody } from '../../components/UsersTableBody';
import { UsersTablePagination } from '../../components/UsersTablePagination';
import { useUsersTableFilters } from '../../hooks/useUsersTableFilters';

import s from './UsersTable.module.scss';

export const UsersTable = () => {
  const {
    activePage,
    activeSort,
    elementsToShow,
    filteredAndSortedData,
    filters,
    handleChangeFilter,
    handleChangeSort,
    onChangePage,
    pages,
  } = useUsersTableFilters();

  return (
    <main className={s.main}>
      <UsersTablePagination onChangePage={onChangePage} activePage={activePage} pages={pages} />
      <table className={s.table}>
        <UsersTableHeader
          handleChangeFilter={handleChangeFilter}
          handleChangeSort={handleChangeSort}
          activeSortDirection={activeSort?.direction}
          activeSortName={activeSort?.sort}
          filters={filters}
        />
        <UsersTableBody tableData={filteredAndSortedData} elementsToShow={elementsToShow} />
      </table>
    </main>
  );
};
