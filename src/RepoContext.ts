import { Context, createContext, Dispatch, SetStateAction } from "react";

type RepoContextType = {
    allLoaded?: boolean;
    setAllLoaded?: Dispatch<SetStateAction<boolean>>;
    currentPage?: number;
    setCurrentPage?: Dispatch<SetStateAction<number>>;
    repos?: any[];
    setRepos?: Dispatch<SetStateAction<any[]>>;
};

const RepoContext: Context<RepoContextType> = createContext({});

export default RepoContext;
