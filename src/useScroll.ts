import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useScroll = (
    callback: Function,
    delay = 1000
): [boolean, Dispatch<SetStateAction<boolean>>] => {
    const [loading, setLoading] = useState(false);

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
                document.documentElement.offsetHeight &&
            !loading
        )
            setLoading(true);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (loading) {
            const timer = setTimeout(() => callback(), delay);
            return () => clearTimeout(timer);
        }
    }, [loading, callback, delay]);

    return [loading, setLoading];
};

export default useScroll;
