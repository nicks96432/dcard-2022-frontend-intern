import { createContext, Dispatch, SetStateAction } from "react";

type RepoContextType = {
    allLoaded?: boolean;
    setAllLoaded?: Dispatch<SetStateAction<boolean>>;
    currentPage?: number;
    setCurrentPage?: Dispatch<SetStateAction<number>>;
    repos?: any[];
    setRepos?: Dispatch<SetStateAction<any[]>>;
    githubApiHeaders?: HeadersInit;
}

const githubApiHeaders: HeadersInit = {
    Accept: "application/vnd.github.v3+json"
};

if (process.env.REACT_APP_GITHUB_TOKEN !== undefined)
    githubApiHeaders.Authorization = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;

const RepoContext = createContext<RepoContextType>({ githubApiHeaders });

export default RepoContext;
