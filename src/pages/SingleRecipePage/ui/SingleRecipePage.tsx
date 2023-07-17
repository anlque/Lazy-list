import { useParams } from 'react-router-dom';
import { useEffect, useCallback } from 'react';
import { getRecipeById } from 'helpers/getRecipeById';
import { convertDate } from 'entities/BeerRecipe/ui/convertDate';
import cls from './SingleRecipePage.module.scss';
import useStore, { Recipe } from '../store/store';
import { Instruction } from './Instruction';
import { Ingridients } from './Ingridients';

interface SingleRecipePageProps {
    className?: string;
}

const SingleRecipePage = () => {
    const recipe = useStore((state) => state.recipe);
    const setRecipe = useStore((state) => state.setRecipe);

    const { id } = useParams<{ id: string }>();

    const loadRecipe = useCallback(async (): Promise<void> => {
        const data: Recipe = await getRecipeById(Number(id));

        if (data) {
            setRecipe(data);
        }
    }, []);

    useEffect(() => {
        loadRecipe();
        return (() => { setRecipe(null); });
    }, []);

    console.log('recipe', recipe);

    return (
        <div className={cls.SingleRecipePage}>
            {recipe
            && (
                <>
                    <div className={cls.mainInfoContainer}>
                        <div className={cls.imgContainer}>
                            <img src={recipe.image_url} alt="recipe" />
                        </div>
                        <div>
                            <h2>{recipe.name}</h2>
                            <span>{recipe.tagline}</span>
                            <p className={cls.date}>
                                since
                                {' '}
                                {convertDate(recipe.first_brewed)}
                            </p>

                        </div>
                    </div>

                    <Ingridients recipe={recipe} />
                    <div>
                        <Instruction recipe={recipe} />

                    </div>

                </>

            )}

        </div>
    );
};

export default SingleRecipePage;
