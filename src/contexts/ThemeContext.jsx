import React, { createContext, useState, useEffect, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [userPreference, setUserPreference] = useState(() => {
		const savedPreference = localStorage.getItem("themePreference");
		return savedPreference ? JSON.parse(savedPreference) : null;
	});

	const isDark = userPreference !== null 
		? userPreference 
		: window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

	useEffect(() => {
		if (userPreference !== null) {
			document.documentElement.setAttribute("data-theme", userPreference ? "dark" : "light");
		} else {
			document.documentElement.removeAttribute("data-theme");
		}
	}, [userPreference]);

	const toggleTheme = () => {
		setUserPreference(prev => {
			const newPreference = prev === null ? !isDark : !prev;
			localStorage.setItem("themePreference", JSON.stringify(newPreference));
			return newPreference;
		});
	};

	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme, userPreference }}>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
