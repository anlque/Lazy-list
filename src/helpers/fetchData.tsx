const API_URL = 'https://api.punkapi.com/v2/beers';

export type Recipe = {
    id: number;
    name: string;
    description: string;
  };

export const fetchData = async (page: number): Promise<Recipe[]> => {
    try {
        const response = await fetch(`${API_URL}?page=${page}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        }
        console.error('Error fetching recipes:', response.status);
        return [];
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return [];
    }
};
