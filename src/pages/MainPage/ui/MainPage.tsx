import {
    useEffect, useState, useRef, useCallback, MutableRefObject,
} from 'react';
import { BeerRecipeCard } from 'entities/BeerRecipe';
import useStore from 'shared/lib/store/store';
// import { FixedSizeList as List } from 'react-window';
const ITEM_HEIGHT = 140;

const MainPage = () => {
    const recipes = useStore((state) => state.recipes);

    const selectedRecipes = useStore((state) => state.selectedRecipes);
    const page = useStore((state) => state.page);
    const startPoint = useStore((state) => state.startPoint);
    // const endPoint = useStore((state) => state.endPoint);
    const setRecipes = useStore((state) => state.setRecipes);

    const selectRecipe = useStore((state) => state.selectRecipe);
    const removeSelectedRecipes = useStore((state) => state.removeSelectedRecipes);
    const incrementPage = useStore((state) => state.incrementPage);
    const moveStartPoint = useStore((state) => state.moveStartPoint);
    const moveStartPointBack = useStore((state) => state.moveStartPointBack);
    const [isEndFetch, setIsEndFetch] = useState(false);
    const containerRef = useRef(null);
    // const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
    // const [scrollTop, setScrollTop] = useState(0);
    // const moveEndPoint = useStore((state) => state.moveEndPoint);
    const observerTarget = useRef(null);
    const observerTargetStart = useRef(null);

    // const firstVisibleItemIndex = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT));
    // const lastVisibleItemIndex = Math.min(
    //     recipes.length,
    //     firstVisibleItemIndex + Math.ceil(viewportHeight / ITEM_HEIGHT),
    // );

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}`);
            const data = await response.json();

            if (data.length) {
                setRecipes(data);
                incrementPage();
            }

            if (data.length === 0) {
                setIsEndFetch(true);
            }
        } catch (e) {
            console.log(e);
        }
    }, [page]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (startPoint !== recipes.length - 15) {
                        moveStartPoint();
                    }

                    if (recipes.length && !isEndFetch) {
                        fetchData();
                    }
                }
            },
            { threshold: 1 },
        );

        if (observerTarget.current) {
            observer.observe(observerTarget.current);
        }

        return () => {
            if (observerTarget.current) {
                observer.unobserve(observerTarget.current);
            }
        };
    }, [fetchData, moveStartPoint,
        observerTarget, startPoint, isEndFetch]);

    useEffect(() => {
        const observer2 = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    if (startPoint) {
                        const currentScrollPosition = containerRef.current.scrollHeight;
                        console.log('currentScrollPosition', currentScrollPosition);

                        moveStartPointBack();
                        requestAnimationFrame(() => {
                            // после того как браузер завершит рендеринг и обновит DOM, восстанавливаем положение скролла
                            containerRef.current.scrollTop = containerRef.current.scrollHeight
                             - currentScrollPosition;
                        });
                    }
                }
            },
            { threshold: 1 },
        );

        if (observerTarget.current) {
            observer2.observe(observerTargetStart.current);
        }

        return () => {
            if (observerTarget.current) {
                observer2.unobserve(observerTargetStart.current);
            }
        };
    }, [fetchData, moveStartPoint,
        observerTargetStart, startPoint]);

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     const handleResize = () => {
    //         setViewportHeight(window.innerHeight);
    //     };

    //     window.addEventListener('resize', handleResize);

    //     return () => {
    //         window.removeEventListener('resize', handleResize);
    //     };
    // }, []);
    // useEffect(() => {
    //     const handleScroll = () => {
    //         setScrollTop(window.scrollY);
    //     };

    //     window.addEventListener('scroll', handleScroll);

    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        <section ref={containerRef}>
            Главная страница
            <div ref={observerTargetStart} />
            <button type="button" onClick={removeSelectedRecipes}>Delete</button>
            {recipes.length > 0 && recipes.slice(startPoint, startPoint + 15).map((recipe) => {
                const {
                    id, name, firstBrewed, image, tagline,
                } = recipe;
                return (
                    <BeerRecipeCard
                        onClick={() => selectRecipe(Number(id))}
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

            <div ref={observerTarget} />

        </section>

    );
};

export default MainPage;
