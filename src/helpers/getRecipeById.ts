import { Recipe } from 'pages/SingleRecipePage/store/store';

export const getRecipeById = async (id: number):Promise<Recipe> => {
    try {
        const response = await fetch(`https://api.punkapi.com/v2/beers/${id}`);
        const data = await response.json();
        return data[0];
    } catch (e) {
        console.error(e);
        throw e;
    }
};
