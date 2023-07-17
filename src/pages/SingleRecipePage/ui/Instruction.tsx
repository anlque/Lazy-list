import React from 'react';
import { Recipe } from '../store/store';
import cls from './SingleRecipePage.module.scss';

export const Instruction: React.FC<{ recipe: Recipe }> = ({ recipe }) => (
    <div className={cls.Instruction}>
        <h1>Preparation Method</h1>
        <p>
            To start the brewing process, you&apos;ll
            need to heat your mash to a temperature
            of
            {' '}
            <strong>
                {recipe?.method?.mash_temp[0]?.temp?.value}
                {' '}
                {recipe?.method?.mash_temp[0]?.temp?.unit}
            </strong>
            . If a specific
            duration is provided, maintain this temperature for that duration.
            Otherwise, maintain the temperature until the conversion is complete.
        </p>
        <p>
            Once the mash step is complete, move on to the fermentation stage. The
            fermentation temperature should be set to
            <strong>
                {' '}
                {recipe?.method?.fermentation?.temp?.value}
                {' '}
                {recipe?.method?.fermentation?.temp?.unit}
            </strong>
            .
            Maintain this temperature until the fermentation is complete.
        </p>

        <div>
            <h4>Tips:</h4>
            <span>{recipe.brewers_tips}</span>
        </div>
        <div>
            <h5>Drink with:</h5>
            {recipe.food_pairing.map((pair) => (
                <span key={pair}>
                    {pair}
                    ,
                    {' '}
                </span>
            ))}
        </div>
    </div>
);
