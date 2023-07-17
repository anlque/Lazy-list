import { create } from 'zustand';
import { MEASURE } from 'shared/constants/common';

export type Recipe = {
    name: string;
    id:string;
    first_brewed: string;
    image_url: string;
    tagline: string;
    onClick: any;
    selected: boolean
};

type Store = {
  recipes: Recipe[];
  selectedRecipes: number[];
  startPoint: number;
  page: number;
  setRecipes: (newRecipes: Recipe[]) => void;
  selectRecipe: (recipeId: number) => void;
  removeSelectedRecipes: () => void;
  incrementPage: () => void;
  moveStartPoint: () => void
  moveStartPointBack: ()=> void
};

const useStore = create<Store>((set) => ({
    recipes: [],
    activeRecipes: [],
    selectedRecipes: [],
    startPoint: 0,
    page: 1,

    setRecipes: (newRecipes) => set((state) => ({
        recipes: [...state.recipes, ...newRecipes],

    })),

    selectRecipe: (recipeId) => set((state) => ({
        selectedRecipes: state.selectedRecipes.includes(recipeId)
            ? [...state.selectedRecipes].filter((id) => id !== recipeId)
            : [...state.selectedRecipes, recipeId],
    })),

    removeSelectedRecipes: () => set((state) => ({
        recipes:
        state.recipes.filter((recipe) => (
            !state.selectedRecipes.includes(Number(recipe.id)))),

        selectedRecipes: [],

    })),

    incrementPage: () => set((state) => ({ page: state.page + 1 })),

    moveStartPoint: () => set((state) => ({
        startPoint: state.recipes.length
            ? state.startPoint + MEASURE
            : state.startPoint,
    })),
    moveStartPointBack: () => set((state) => ({
        startPoint: state.recipes.length
            ? state.startPoint - MEASURE
            : state.startPoint,
    })),

}));

export default useStore;
