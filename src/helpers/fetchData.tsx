import { Recipe } from 'pages/RecipesPage/store/store';

export const fetchData = async (page: number):Promise<Recipe[]> => {
    try {
        const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
        const data = await response.json();
        return data;
    } catch (e) {
        console.log(e);
        throw e;
    }
};
