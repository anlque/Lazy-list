import { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import cls from './AppLink.module.scss';

export const AppLink:FC<LinkProps> = (props) => {
    const {
        to,
        children,
    } = props;

    return (
        <Link
            to={to}
            className={cls.AppLink}
        >
            {children}
        </Link>

    );
};
