import React, { PropsWithChildren } from 'react';

import s from './Button.module.scss';
import classNames from 'classnames';

interface IButtonProps extends React.HtmlHTMLAttributes<HTMLButtonElement> {}

export const Button = ({ children, className, ...props }: PropsWithChildren<IButtonProps>) => {
  return (
    <button {...props} className={classNames(s.btn, className)}>
      {children}
    </button>
  );
};
