import { IUser } from '@/models/user.model';
import { UsersTableRow } from '../UsersTableRow';

import s from './UsersTableBody.module.scss';

interface IUsersTableBodyProps {
  tableData: IUser[];
  elementsToShow: IUser[];
}

export const UsersTableBody = ({ tableData, elementsToShow }: IUsersTableBodyProps) => {
  return (
    <tbody className={s.tbody}>
      {elementsToShow.map((item) => {
        return <UsersTableRow {...item} tableData={tableData} key={item.id} />;
      })}
    </tbody>
  );
};
