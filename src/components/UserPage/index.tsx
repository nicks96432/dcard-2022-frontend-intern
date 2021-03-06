import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RepoContext from "../../RepoContext";
import useScroll from "../../useScroll";
import "./UserPage.css";

const UserPage = ({ load = 10 }) => {
    const [error, setError] = useState(false);
    const { username } = useParams();
    const {
        allLoaded,
        setAllLoaded,
        currentPage,
        setCurrentPage,
        repos,
        setRepos,
        githubApiHeaders
    } = useContext(RepoContext);

    const [loading, setLoading] = useScroll(getRepos);

    useEffect(() => {
        if (repos!.length === 0) getRepos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function getRepos() {
        if (allLoaded) return;

        try {
            var res = await fetch(
                `https://api.github.com/users/${username}/repos?per_page=${load}&page=${currentPage}`,
                { headers: githubApiHeaders }
            );
            if (!res.ok) throw new Error(`response code: ${res.status}`);
        } catch (err) {
            console.error(err);
            setError(true);
            return;
        }
        try {
            var json: any[] = await res.json();
        } catch (err) {
            console.error(err);
            return;
        }
        setCurrentPage!(currentPage! + 1);
        setLoading(false);
        setRepos!([...repos!, ...json]);
        setAllLoaded!(json.length !== load);
    }

    return (
        <div className="userpage container">
            <h1>all repositories of {username}</h1>
            <div className="userpage-repos list-group">
                {error ? (
                    <div>error</div>
                ) : (
                    repos!.map((repo, index) => (
                        <Link
                            className="userpage-repo list-group-item list-group-item-action"
                            to={`/users/${username}/repos/${repo.name}`}
                            key={index}
                        >
                            <h5 className="fw-bold">
                                repo name: {repo.full_name}
                            </h5>
                            <div>stars: {repo.stargazers_count}</div>
                        </Link>
                    ))
                )}
                {!allLoaded && loading ? <div>loading...</div> : null}
            </div>
        </div>
    );
};

export default UserPage;
