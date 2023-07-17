import { MouseEventHandler } from 'react';
import { convertDate } from './convertDate';
import cls from './BeerRecipeCard.module.scss';

interface BeerRecipeCardProps {
    name: string;
    id:number;
    firstBrewed: string;
    image: string;
    tagline: string;
    onRightClick: MouseEventHandler<HTMLDivElement>;
    onLeftClick: (id:number)=>void;
    selected: boolean
}

export const BeerRecipeCard = ({
    name, id, firstBrewed, image, tagline, onRightClick, onLeftClick, selected,
}: BeerRecipeCardProps) => (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
        data-testid={`beer-recipe-card-${id}`}
        className={`${cls.BeerRecipeCard} ${selected ? cls.selected : ''}`}
        onContextMenu={onRightClick}
        onClick={() => onLeftClick(id)}
    >
        <div className={cls.imgContainer}><img src={image} alt="beer" /></div>
        <div className={cls.infoContainer}>
            <h2>{name}</h2>

            <span className={cls.tagline}>{tagline}</span>

            <span className={cls.date}>
                since
                {' '}
                {convertDate(firstBrewed)}
            </span>
        </div>

    </div>
);
