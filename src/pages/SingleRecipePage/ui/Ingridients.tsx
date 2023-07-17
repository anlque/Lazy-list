import React from 'react';
import cls from './SingleRecipePage.module.scss';
import { Recipe } from '../store/store';

export const Ingridients: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
    <div className={cls.Ingridients}>
        <h1>Ingredients</h1>
        <h3>Malt</h3>
        <ul>
            {recipe.ingredients?.malt?.map((malt:any, index:number) => (
                <li key={malt.name}>
                    <span>{malt.amount.value}</span>
                    {' '}
                    <span>{malt.amount.unit}</span>
                    {' '}
                    of
                    {' '}
                    <span>{malt.name}</span>
                </li>
            ))}
        </ul>
        <h3>Hops</h3>
        <ul>
            {recipe.ingredients?.hops?.map((hop:any, index:number) => (
                <li key={hop.name}>
                    <span>{hop.amount.value}</span>
                    {' '}
                    <span>{hop.amount.unit}</span>
                    {' '}
                    of
                    {' '}
                    {hop.name}
                    {' '}
                    {hop.attribute}
                    {' '}
                    (phase:
                    {' '}
                    {hop.add}
                    )

                </li>
            ))}
        </ul>
        <h3>Yeast</h3>
        <p>{recipe.ingredients?.yeast}</p>
    </div>
);
