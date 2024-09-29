import React from "react";
import { Link } from "react-router-dom";
import ArrowRight from "./icons/arrow-right";

const BackButton = () => {
	return (
		<div className="back-button-container">
			<Link to="/" className="back-button">
				<div className="back-button-icon-wrapper">
					<ArrowRight height="20" width="20" />
				</div>
				BACK
			</Link>
		</div>
	);
};

export default BackButton;
