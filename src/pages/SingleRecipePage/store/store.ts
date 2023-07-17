import { create } from 'zustand';

export type Recipe = {
    name: string;
    id:string;
    first_brewed: string;
    image_url: string;
    tagline: string;
    onClick: any;
    selected: boolean
    ingredients: any
    method: any
    brewers_tips:string
    food_pairing:string[]
};

type Store = {
  recipe: Recipe | null;
  setRecipe: (recipe: Recipe) => void;

};

const useStore = create<Store>((set) => ({
    recipe: null,

    setRecipe: (recipe) => set(() => ({ recipe })),

}));

export default useStore;
