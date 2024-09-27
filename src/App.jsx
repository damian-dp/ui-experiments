import { Routes, Route } from "react-router-dom";
import "./styles/global.css";
import UILabPage from "./pages/UILabPage";

function App() {
	return (
		<div>
			<Routes>
				<Route path="/" element={<UILabPage />} />
			</Routes>
		</div>
	);
}

export default App;
