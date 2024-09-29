import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import "./styles/nav.css";
import NavPage from "./pages/navPage";
import BentoPage from "./pages/bentoPage";
import { useTheme } from "./contexts/ThemeContext";
import { useEffect } from "react";
import ToolTipPage from "./pages/toolTipPage";
import NotFound from "./pages/NotFound"; // Create this component

function App() {
	const { isDark } = useTheme();

	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	return (
		<div className="app">
			<Routes>
				<Route path="/nav" element={<NavPage />} />
				<Route path="/bento" element={<BentoPage />} />
				<Route path="/tooltip" element={<ToolTipPage />} />
				<Route path="*" element={<NotFound />} /> {/* Add this line */}
			</Routes>
		</div>
	);
}

export default App;
