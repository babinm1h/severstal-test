import React, { CSSProperties, useMemo } from 'react';
import classNames from 'classnames';

import { IUser } from '@/models/user.model';
import { useBooleanState } from '@/shared/hooks';

import s from './UsersTableRow.module.scss';

interface IUsersTableRowProps extends IUser {
  tableData: IUser[];
  isChild?: boolean;
  childLevel?: number; // уровень вложенности дочернего элемента
}

export const UsersTableRow = React.memo(
  ({ balance, email, id, isActive, name, parentId, tableData, isChild, childLevel = 0 }: IUsersTableRowProps) => {
    const { isTrue, toggleValue } = useBooleanState();

    const childRows = useMemo(() => {
      return tableData.filter((el) => el.parentId === id);
    }, [id]);

    const hasChilds = childRows.length > 0;
    const cellClassname = classNames(s.cell, {
      [s.hasChilds]: hasChilds,
      [s[`cell${childLevel}`]]: !!childLevel && isChild,
    });

    return (
      <>
        <tr>
          <td className={cellClassname}>
            {hasChilds ? (
              <button onClick={toggleValue} className={s.showBtn}>
                {isTrue ? 'Скрыть дочерние -' : 'Показать дочерние +'}
              </button>
            ) : null}
          </td>
          <td className={cellClassname}>{`${isActive}`}</td>
          <td className={cellClassname}>{name}</td>
          <td className={cellClassname}>{email}</td>
          <td className={cellClassname}>{balance}</td>
        </tr>

        {hasChilds && isTrue
          ? childRows.map((child) => (
              <UsersTableRow {...child} tableData={tableData} isChild key={child.id} childLevel={childLevel + 1} />
            ))
          : null}
      </>
    );
  },
);
