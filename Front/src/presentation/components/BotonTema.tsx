import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

const BotonTema = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md transition-all hover:bg-gray-200 dark:hover:bg-gray-700"
        >
            {theme === "dark" ? (
                <FontAwesomeIcon icon={faSun} className="text-yellow-400 w-5 h-5" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="text-gray-800 dark:text-gray-300 w-5 h-5" />
            )}
        </button>
    );
};

export default BotonTema;