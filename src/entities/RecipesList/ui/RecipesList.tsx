// import React, { useEffect } from 'react';
// import useStore from 'shared/lib/store/store';
// import { fetchData, Recipe } from 'helpers/fetchData';

// const RecipeList: React.FC = () => {
//     const recipes = useStore((state) => state.recipes);
//     const selectedRecipes = useStore((state) => state.selectedRecipes);
//     const page = useStore((state) => state.page);
//     const setRecipes = useStore((state) => state.setRecipes);
//     const setActiveRecipes = useStore((state) => state.setRecipes);
//     const selectRecipe = useStore((state) => state.selectRecipe);
//     const removeSelectedRecipes = useStore((state) => state.removeSelectedRecipes);
//     const incrementPage = useStore((state) => state.incrementPage);

//     useEffect(() => {
//         const fetchRecipes = async () => {
//             const newRecipes = await fetchData(page);
//             setRecipes(newRecipes.slice(0, 15));
//         };

//         fetchRecipes();
//     }, [page, setRecipes]);

//     const handleRecipeClick = (recipeId: number) => {
//         selectRecipe(recipeId);
//     };

//     const handleDeleteClick = () => {
//         removeSelectedRecipes();
//     };

//     const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
//         const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

//         if (scrollHeight - scrollTop === clientHeight) {
//             incrementPage();
//         }
//     };

//     return (
//         <div onScroll={handleScroll} style={{ height: '500px', overflow: 'auto' }}>
//             {recipes?.map((recipe: Recipe) => (
//                 // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
//                 <div
//                     key={recipe.id}
//                     onClick={() => handleRecipeClick(recipe.id)}
//                     style={{
//                         backgroundColor: selectedRecipes.includes(recipe.id)
//                             ? 'lightblue'
//                             : 'white',
//                     }}
//                 >
//                     <h3>{recipe.name}</h3>
//                     <h1>{recipe.id}</h1>
//                     <p>{recipe.description}</p>
//                 </div>
//             ))}
//             {selectedRecipes.length > 0 && (
//                 <button
//                     type="button"
//                     onClick={handleDeleteClick}
//                 >
//                     Delete
//                 </button>
//             )}
//         </div>
//     );
// };

// export default RecipeList;
