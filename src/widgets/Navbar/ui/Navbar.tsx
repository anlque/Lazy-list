import { AppLink } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

export const Navbar = () => (
    <div className={cls.Navbar}>

        <div className={cls.links}>
            <AppLink
                to="/"
                className={cls.mainLink}
            >
                Главная страница

            </AppLink>
            <AppLink to="/about">О сайте</AppLink>
        </div>

    </div>
);
