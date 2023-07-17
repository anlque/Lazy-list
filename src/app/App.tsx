import { Suspense } from 'react';
import { Sidebar } from 'widgets/Sidebar';
import { Route, Routes } from 'react-router-dom';
import { PageLoader } from 'widgets/PageLoader/PageLoader';
import { RecipesPage } from 'pages/RecipesPage';
import './styles/index.scss';
import { SingleRecipePage } from 'pages/SingleRecipePage';

const App = () => (
    <div className="app">
        <Suspense fallback="">
            <div className="content-page">
                <Sidebar />

                <Suspense fallback={<PageLoader />}>
                    <Routes>
                        <Route
                            path="/"
                            element={(
                                <div className="page-wrapper"><RecipesPage /></div>
                            )}
                        />
                        <Route
                            path="/recipe/:id"
                            element={(
                                <div className="page-wrapper"><SingleRecipePage /></div>
                            )}
                        />

                    </Routes>
                </Suspense>
            </div>
        </Suspense>

    </div>
);

export default App;
