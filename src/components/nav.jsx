// Import necessary dependencies and components
// React is the core library for building user interfaces in React
import React, { useState, useEffect, useRef } from "react";
// Link is used for navigation in React Router, useLocation helps get the current URL
import { Link, useLocation } from "react-router-dom";
// Import CSS styles for the navigation component
import "../styles/nav.css";
// Import the ThemeToggle component for switching between light and dark modes
import { ThemeToggle } from "./ThemeToggle";

// Define an array of navigation items
// This array contains objects, each representing a navigation link
// label: The text displayed for the link
// path: The URL path the link leads to
const navItems = [
	{ label: "All", path: "#all" },
	{ label: "Design", path: "#design" },
	{ label: "Development", path: "#development" },
	{ label: "Projects", path: "#projects" },
	{ label: "Articles", path: "#articles" },
	{ label: "About", path: "#about" },
];

// Define the main Nav component as a functional component
// Functional components are a way to write components as JavaScript functions
export default function Nav() {
	    // State: A way for React components to remember and update data

	// State Hooks: useState is a Hook that lets you add React state to function components
	// activeTab keeps track of which navigation item is currently selected
	// setActiveTab is the function used to update this state
	const [activeTab, setActiveTab] = useState(navItems[0].label);
	
	// windowWidth keeps track of the current window width for responsive design
	// setWindowWidth is the function used to update this state
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	
	// Refs: References to DOM elements
    // DOM (Document Object Model) is a programming interface for HTML documents
	// Ref Hooks: useRef returns a mutable ref object that persists for the full lifetime of the component
	// These refs will be attached to DOM elements to manipulate them directly
	const containerRef = useRef(null); // Reference to the container element
	const activeTabElementRef = useRef(null); // Reference to the active tab element
	
	// useLocation Hook: This hook returns the location object that represents the current URL
	const location = useLocation();

	// Effect Hook: useEffect lets you perform side effects in function components
	// This effect handles window resizing
	useEffect(() => {
		// Function to update windowWidth state when the window is resized
		const handleResize = () => setWindowWidth(window.innerWidth);
		// Add an event listener for the 'resize' event
		window.addEventListener('resize', handleResize);
		// Return a cleanup function to remove the event listener when the component unmounts
		// This prevents memory leaks
		return () => window.removeEventListener('resize', handleResize);
	}, []); // Empty dependency array means this effect runs once on mount and cleanup on unmount

	// Determine which nav items to show based on window width
	// This creates a responsive design that shows fewer items on smaller screens
	const visibleNavItems = windowWidth < 680
		? navItems.filter(item => !['Projects', 'Articles', 'About'].includes(item.label))
		: navItems;

	// Effect to update active tab based on current location
	useEffect(() => {
		const currentPath = location.pathname;
		// Find the nav item that matches the current path
		const currentTab = navItems.find((item) => item.path === currentPath);
		if (currentTab) {
			setActiveTab(currentTab.label);
		}
	}, [location]); // This effect runs whenever the location changes

	// Effect to handle the clip-path animation for the active tab
	useEffect(() => {
		// Get the container element using the ref
		const container = containerRef.current;

		if (activeTab && container) {
			// Get the active tab element using the ref
			const activeTabElement = activeTabElementRef.current;

			if (activeTabElement) {
				// Get the position and size of the active tab element
				const { offsetLeft, offsetWidth } = activeTabElement;

				// Calculate the clip path values
				const clipLeft = offsetLeft;
				const clipRight = offsetLeft + offsetWidth;
				// Apply the clip-path CSS property to create the animation effect
				// clip-path is a CSS property that creates a clipping region that sets what part of an element should be shown
				container.style.clipPath = `inset(0 ${Number(
					100 - (clipRight / container.offsetWidth) * 100
				).toFixed()}% 0 ${Number(
					(clipLeft / container.offsetWidth) * 100
				).toFixed()}% round 100px)`;
			}
		}
	}, [activeTab, activeTabElementRef, containerRef]); // This effect runs when activeTab or refs change

	// Render the navigation component
	// JSX is returned here, which describes what the UI should look like
	return (
		<nav>
			<div className="nav-wrapper">
				<div className="nav-link-wrapper">
					<ul className="list">
						{/* Map over visible navigation items to create list items */}
						{visibleNavItems.map((item, index) => (
							<React.Fragment key={item.path}>
								<li>
									<Link
										ref={activeTab === item.label ? activeTabElementRef : null}
										to={item.path}
										onClick={() => setActiveTab(item.label)}
										className="nav-button"
									>
										{item.label}
									</Link>
								</li>
								{/* Add a separator after the "Articles" item if the window is wide enough */}
								{item.label === "Articles" && windowWidth >= 680 && (
									<div className="separatorY navSeparator"></div>
								)}
							</React.Fragment>
						))}
					</ul>

					{/* This div creates an overlay for the clip-path animation */}
					<div aria-hidden className="clip-path-container" ref={containerRef}>
						<ul className="list list-overlay">
							{visibleNavItems.map((item, index) => (
								<React.Fragment key={item.path}>
									<li>
										<Link
											to={item.path}
											onClick={() => setActiveTab(item.label)}
											className="nav-button-overlay nav-button"
											tabIndex={-1}
										>
											{item.label}
										</Link>
									</li>
									{item.label === "Articles" && windowWidth >= 680 && (
										<div className="separatorY navSeparator"></div>
									)}
								</React.Fragment>
							))}
						</ul>
					</div>
				</div>
			</div>
			{/* Render the ThemeToggle component */}
			<ThemeToggle />
		</nav>
	);
}