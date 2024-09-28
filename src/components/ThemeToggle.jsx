import React from "react";
import { useTheme } from "../contexts/ThemeContext";
import Sun from "./icons/sun";
import Moon from "./icons/moon";

export function ThemeToggle() {
	const { isDark, toggleTheme } = useTheme();

	return (
		<div className="theme-toggle">
			{isDark ? (
				<div onClick={toggleTheme}>
					<Sun className="theme-toggle-icon" />
				</div>
			) : (
				<div onClick={toggleTheme}>
					<Moon className="theme-toggle-icon" />
				</div>
			)}
		</div>
	);
}
