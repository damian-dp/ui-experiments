import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import "./styles/nav.css";
import UILabPage from "./pages/UILabPage";
import Nav from "./components/nav";
import { useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";

function App() {
	const { isDark } = useTheme();

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	return (
		<div className="app">
			<Nav />
			<Routes>
				<Route path="/" element={<UILabPage />} />
			</Routes>
		</div>
	);
}

export default App;
