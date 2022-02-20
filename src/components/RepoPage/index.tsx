import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RepoContext from "../../RepoContext";
import "./RepoPage.css";

const RepoPage = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [repoInfo, setRepoInfo] = useState({
        full_name: "",
        stargazers_count: 0,
        description: "",
        html_url: ""
    });
    const { username, repo } = useParams();
    const { githubApiHeaders } = useContext(RepoContext);

    useEffect(() => {
        (async () => {
            try {
                var res = await fetch(
                    `https://api.github.com/repos/${username}/${repo}`,
                    { headers: githubApiHeaders }
                );
                if (!res.ok) throw new Error(`response code: ${res.status}`);
            } catch (err) {
                console.error(err);
                setError(true);
                return;
            }
            try {
                var json = await res.json();
            } catch (err) {
                console.error(err);
                return;
            }
            setRepoInfo(json);
            setLoading(false);
        })();
    }, [username, repo, githubApiHeaders]);

    return (
        <div className="repopage container">
            {error ? (
                <div>error</div>
            ) : loading ? (
                <div>loading...</div>
            ) : (
                <div className="card repopage-card">
                    <div className="card-body">
                        <h5 className="card-title">{repoInfo.full_name}</h5>
                        <div className="card-subtitle mb-2 text-muted">
                            stars: {repoInfo.stargazers_count}
                        </div>
                        <p className="card-text">{repoInfo.description}</p>
                        <a
                            className="card-link"
                            href={repoInfo.html_url}
                            target="_blank"
                            rel="external noreferrer noopener"
                        >
                            repo link
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RepoPage;
