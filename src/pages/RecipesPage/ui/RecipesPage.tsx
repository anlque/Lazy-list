import React, {
    useEffect, useState, useRef, useCallback,
} from 'react';
import { BeerRecipeCard } from 'entities/BeerRecipe';
import useStore, { Recipe } from 'pages/RecipesPage/store/store';
import { fetchData } from 'helpers/fetchData';
import { RENDER_SIZE } from 'shared/constants/common';
import { useNavigate } from 'react-router-dom';
import cls from './RecipesPage.module.scss';

const RecipesPage = () => {
    const [isEndFetch, setIsEndFetch] = useState(false);

    const containerRef = useRef(null);
    const bottomObserverTarget = useRef(null);
    const topObserverTarget = useRef(null);

    const recipes = useStore((state) => state.recipes);
    const setRecipes = useStore((state) => state.setRecipes);
    const selectedRecipes = useStore((state) => state.selectedRecipes);
    const selectRecipe = useStore((state) => state.selectRecipe);
    const removeSelectedRecipes = useStore((state) => state.removeSelectedRecipes);
    const page = useStore((state) => state.page);
    const incrementPage = useStore((state) => state.incrementPage);
    const startPoint = useStore((state) => state.startPoint);
    const moveStartPoint = useStore((state) => state.moveStartPoint);
    const moveStartPointBack = useStore((state) => state.moveStartPointBack);

    const navigate = useNavigate();

    const loadData = useCallback(async (): Promise<void> => {
        const data: Recipe[] = await fetchData(page);

        if (data?.length) {
            setRecipes(data);
            incrementPage();
        }
        if (data?.length === 0) {
            setIsEndFetch(true);
        }
    }, [page]);

    // useEffect to handle bottom observer
    useEffect(() => {
        const bottomObserver: IntersectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (startPoint !== recipes.length - RENDER_SIZE) {
                        moveStartPoint();
                    }

                    if (recipes?.length && !isEndFetch) {
                        loadData();
                    }
                }
            },
            { threshold: 1 },
        );

        if (bottomObserverTarget.current) {
            bottomObserver.observe(bottomObserverTarget.current);
        }

        return () => {
            if (bottomObserverTarget.current) {
                bottomObserver.unobserve(bottomObserverTarget.current);
            }
        };
    }, [loadData, moveStartPoint,
        bottomObserverTarget, startPoint, isEndFetch]);

    // useEffect to handle top observer
    useEffect(() => {
        const topObserver: IntersectionObserver = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (startPoint) {
                        moveStartPointBack();
                    }
                }
            },
            { threshold: 1 },
        );

        if (topObserverTarget.current) {
            topObserver.observe(topObserverTarget.current);
        }

        return () => {
            if (topObserverTarget.current) {
                topObserver.unobserve(topObserverTarget.current);
            }
        };
    }, [loadData, moveStartPoint,
        topObserverTarget, startPoint]);

    // useEffect to fetch data after 1st render
    useEffect(() => {
        loadData();
    }, []);

    const onRightClick = (event: React.MouseEvent<HTMLDivElement>, id:number) => {
        event.preventDefault();
        selectRecipe(Number(id));
    };

    const onLeftClick = (id:number) => {
        navigate(`recipe/${id}`);
    };

    return (
        <section className={cls.RecipesPage} ref={containerRef}>
            <div ref={topObserverTarget} />
            <div className={cls.container}>
                <div>
                    {recipes?.length > 0 && recipes.slice(startPoint, startPoint + RENDER_SIZE)
                        .map((recipe) => {
                            const {
                                id, name, first_brewed: firstBrewed, image_url: image, tagline,
                            } = recipe;
                            return (
                                <BeerRecipeCard
                                    // eslint-disable-next-line max-len
                                    onRightClick={(event) => onRightClick(event, Number(id))}
                                    onLeftClick={onLeftClick}
                                    key={id}
                                    id={Number(id)}
                                    name={name}
                                    firstBrewed={firstBrewed}
                                    image={image}
                                    tagline={tagline}
                                    selected={selectedRecipes.includes(Number(id))}
                                />
                            );
                        })}
                </div>
                <button
                    disabled={!selectedRecipes?.length}
                    type="button"
                    onClick={removeSelectedRecipes}
                    data-testid="delete-button"
                >
                    Delete selected
                </button>
            </div>
            <div ref={bottomObserverTarget} />
        </section>

    );
};

export default RecipesPage;
