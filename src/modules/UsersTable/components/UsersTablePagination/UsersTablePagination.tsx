import classNames from 'classnames';

import s from './UsersTablePagination.module.scss';

interface IUsersTablePaginationProps {
  pages: (number | null)[];
  activePage: number;
  onChangePage: (page: number) => VoidFunction;
}

export const UsersTablePagination = ({ pages, activePage, onChangePage }: IUsersTablePaginationProps) => {
  return (
    <div className={s.pagination}>
      {pages.map((page, idx) => {
        return page !== null ? (
          <button
            className={classNames(s.pageBtn, { [s.active]: activePage === page + 1 })}
            key={idx}
            onClick={onChangePage(page + 1)}
          >
            {page + 1}
          </button>
        ) : (
          <span key={idx}>...</span>
        );
      })}
    </div>
  );
};
