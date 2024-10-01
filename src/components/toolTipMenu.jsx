// Import necessary dependencies from React
// React is the core library for building user interfaces in React
// useState is a hook for adding state to functional components
// useRef is a hook for creating mutable references that persist across re-renders
// useEffect is a hook for performing side effects in functional components
import React, { useState, useRef, useEffect } from "react";

// Import icon components
import Heart from "./icons/heart";
import MoonOutline from "./icons/moon-outline";
import Exit from "./icons/exit";
import SunOutline from "./icons/sun-outline";
import Timer from "./icons/timer";
import UserSub from "./icons/user-sub";

// Define and export the main ToolTipMenu component
export default function ToolTipMenu() {
	// State hook: useState
	// tooltip is the state variable, setTooltip is the function to update it
	// The initial state is an object with show (boolean), text (string), and index (number) properties
	const [tooltip, setTooltip] = useState({ show: false, text: "", index: -1 });
	
	// Ref hook: useRef
	// menuRef is a mutable reference to the menu container DOM element
	const menuRef = useRef(null);

	// Define an array of menu items
	// Each item is an object with icon (a React component) and label (string) properties
	const menuItems = [
		{ icon: Heart, label: "Favorite" },
		{ icon: UserSub, label: "User" },
		{ icon: SunOutline, label: "Light Mode" },
		{ icon: Timer, label: "Timer" },
		{ icon: MoonOutline, label: "Dark Mode" },
		{ icon: Exit, label: "Exit" },
	];

	// Effect hook: useEffect
	// This effect runs once when the component mounts (empty dependency array)
	useEffect(() => {
		// Define a function to handle mouse movement
		const handleMouseMove = (e) => {
			// Check if the menuRef has a current value (i.e., the DOM element exists)
			if (menuRef.current) {
				// Get the bounding rectangle of the menu element
				const menuRect = menuRef.current.getBoundingClientRect();
				// Calculate the mouse position relative to the menu
				const relativeX = e.clientX - menuRect.left;
				const relativeY = e.clientY - menuRect.top;

				// Check if the mouse is within the bounds of the menu
				if (
					relativeY >= 0 &&
					relativeY <= menuRect.height &&
					relativeX >= 0 &&
					relativeX <= menuRect.width
				) {
					// Calculate which menu item the mouse is over
					const menuWidth = menuRect.width;
					const itemWidth = menuWidth / menuItems.length;
					const index = Math.floor(relativeX / itemWidth);

					// If the mouse is over a valid menu item, update the tooltip state
					if (index >= 0 && index < menuItems.length) {
						setTooltip({
							show: true,
							text: menuItems[index].label,
							index: index,
						});
					} else {
						// If not over a valid item, hide the tooltip
						setTooltip({ show: false, text: "", index: -1 });
					}
				} else {
					// If the mouse is outside the menu, hide the tooltip
					setTooltip({ show: false, text: "", index: -1 });
				}
			}
		};

		// Add the mousemove event listener to the window
		window.addEventListener("mousemove", handleMouseMove);
		
		// Return a cleanup function to remove the event listener when the component unmounts
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [menuItems.length]); // Dependency array includes menuItems.length in case it changes

	// Render the ToolTipMenu component
	return (
		// Main container div for the menu
		// The ref attribute attaches the menuRef to this DOM element
		<div className="menu-container" ref={menuRef}>
			{/* Map over the menuItems array to render each icon */}
			{menuItems.map((item, index) => (
				// Wrapper div for each menu icon
				<div key={index} className="menu-icon-wrapper">
					{/* Render the icon component */}
					{/* The spread operator {...} passes all properties of the item.icon component */}
					<item.icon className="menu-icon" width="25px" height="25px" />
				</div>
			))}
			{/* Conditional rendering of the tooltip */}
			{tooltip.show && (
				// Tooltip div
				<div
					className="tooltip"
					style={{
						// Position the tooltip based on the active menu item
						left: `calc(${(tooltip.index + 0.5) * (100 / menuItems.length)}%)`,
						transform: "translateX(-50%)",
					}}
				>
					{/* Display the tooltip text */}
					{tooltip.text}
				</div>
			)}
		</div>
	);
}