import React from "react";
import { Link } from "react-router-dom";
import ArrowRight from "./icons/arrow-right";

// Define a functional component called BackButton
// Functional components are JavaScript functions that return React elements (JSX)
const BackButton = () => {
	// The component returns JSX, which describes what should be rendered
	return (
		// Container div for the back button
		// className is used to apply CSS styles to the element
		<div className="back-button-container">
			{/* Link component from react-router-dom */}
			{/* It creates a navigable link in the application */}
			{/* The "to" prop specifies the destination path (in this case, the home page "/") */}
			{/* className is used to apply CSS styles to the link */}
			<Link to="/" className="back-button">
				{/* Wrapper div for the arrow icon */}
				{/* This allows for more precise positioning and styling of the icon */}
				<div className="back-button-icon-wrapper">
					{/* Render the ArrowRight icon component */}
					{/* The height and width props set the size of the icon */}
					<ArrowRight height="20" width="20" />
				</div>
				{/* Text for the back button */}
				{/* This will appear next to the arrow icon */}
				BACK
			</Link>
		</div>
	);
};

// Export the BackButton component as the default export
// This allows the component to be imported and used in other parts of the application
export default BackButton;
