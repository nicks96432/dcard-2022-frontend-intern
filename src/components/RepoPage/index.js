import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RepoPage.css";


const RepoPage = () => {
	const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const [repoInfo, setRepoInfo] = useState({});
    const { username, repo } = useParams();

    useEffect(() => {
        fetch(`https://api.github.com/repos/${username}/${repo}`, {
            headers: { Accept: "application/vnd.github.v3+json" }
        })
            .then(res => {
                setError(!res.ok);
                if (res.ok) return res.json();
                else throw new Error(`response satus: ${res.status}`);
            })
            .then(json => {
                setRepoInfo(json);
                setLoading(false);
            })
            .catch(err => console.error(err));
    }, [username, repo]);

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
