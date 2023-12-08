import { useMemo } from 'react';

import s from './UsersTableBody.module.scss';
import { IUser } from '@/models/user.model';
import { UsersTableRow } from '../UsersTableRow';

interface IUsersTableBodyProps {
  tableData: IUser[];
}

export const UsersTableBody = ({ tableData }: IUsersTableBodyProps) => {
  // рендерим только те элементы у которых нет родителя
  const onlyParentsData = useMemo(() => {
    return tableData.filter((el) => el.parentId === 0);
  }, [tableData]);

  return (
    <tbody className={s.tbody}>
      {onlyParentsData.map((item) => {
        return <UsersTableRow {...item} tableData={tableData} key={item.id} />;
      })}
    </tbody>
  );
};
