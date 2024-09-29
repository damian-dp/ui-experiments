import React from "react";
import ToolTipMenu from "../components/toolTipMenu";
import "../styles/tooltip.css";
import BackButton from "../components/backButton";

const ToolTipPage = () => {
	return (
		<div className="tool-tip-page">
			<ToolTipMenu />
			<BackButton />
		</div>
	);
};

export default ToolTipPage;
