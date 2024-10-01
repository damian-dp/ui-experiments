import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import Sun from "./icons/sun";
import Moon from "./icons/moon";

// Define and export a functional component called ThemeToggle
export function ThemeToggle() {
	// Use the useTheme hook to get the current theme state and toggle function
	// isDark is a boolean indicating whether the dark theme is active
	// toggleTheme is a function to switch between light and dark themes
	const { isDark, toggleTheme } = useTheme();

	// The component returns JSX, which describes what should be rendered
	return (
		// Container div for the theme toggle button
		<div className="theme-toggle">
			{/* Conditional rendering based on the current theme */}
			{isDark ? (
				// If the theme is dark, show the Sun icon
				<div onClick={toggleTheme}>
					{/* Sun icon component */}
					{/* onClick event is attached to the parent div for better touch area */}
					<Sun className="theme-toggle-icon" />
				</div>
			) : (
				// If the theme is light, show the Moon icon
				<div onClick={toggleTheme}>
					{/* Moon icon component */}
					{/* onClick event is attached to the parent div for better touch area */}
					<Moon className="theme-toggle-icon" />
				</div>
			)}
		</div>
	);
}
