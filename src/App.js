import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RepoContext from "./RepoContext";

const Repopage = lazy(() => import("./components/RepoPage"));
const UserPage = lazy(() => import("./components/UserPage"));

const App = () => {
    const [repos, setRepos] = useState([]);
    const [allLoaded, setAllLoaded] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <RepoContext.Provider
            value={{
                allLoaded,
                setAllLoaded,
                currentPage,
                setCurrentPage,
                repos,
                setRepos
            }}
        >
            <Router>
                <Suspense fallback={<div>loading...</div>}>
                    <Routes>
                        <Route
                            path="/users/:username/repos"
                            element={<UserPage />}
                        />
                        <Route
                            path="/users/:username/repos/:repo"
                            element={<Repopage />}
                        />
                    </Routes>
                </Suspense>
            </Router>
        </RepoContext.Provider>
    );
};

export default App;
