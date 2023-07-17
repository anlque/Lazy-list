import cls from './PageError.module.scss';

export const PageError = () => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={cls.PageError}>
            page_error
            <button type="button" onClick={reloadPage}>
                reload_page
            </button>
        </div>
    );
};
