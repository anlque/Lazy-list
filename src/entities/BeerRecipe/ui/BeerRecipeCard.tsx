import cls from './BeerRecipeCard.module.scss';

interface BeerRecipeCardProps {
    name: string;
    id:number;
    firstBrewed: string;
    image: string;
    tagline: string;
    onClick: any;
    selected: boolean
}

export const BeerRecipeCard = ({
    name, id, firstBrewed, image, tagline, onClick, selected,
}: BeerRecipeCardProps) => {
    const color = selected ? 'aqua' : 'transparent';
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    return (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <div
            style={{ background: color }}
            className={`${cls.BeerRecipeCard} ${selected ? 'selected' : ''}`}
            onClick={onClick}
        >
            <img src={image} alt="beer" />
            <h5>{name}</h5>
            <h3>{id}</h3>
            <span>
                since
                {' '}
                {firstBrewed}
            </span>
            <span>{tagline}</span>
        </div>
    );
};
