import { FC } from 'react';
import cls from './Button.module.scss';

interface ButtonProps{
    onClick:()=>void
}

export const Button:FC<ButtonProps> = ({ children, onClick }) => (
    <button
        type="button"
        className={cls.Button}
        onClick={onClick}
    >
        {children}
    </button>
);
