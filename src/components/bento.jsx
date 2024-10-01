// Import necessary dependencies and hooks from React
import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
// ReactDOM is used for rendering React elements
import ReactDOM from "react-dom/client";
// GSAP (GreenSock Animation Platform) is a popular animation library
import { gsap } from "gsap";
// useGSAP is a custom hook for using GSAP with React
import { useGSAP } from "@gsap/react";
// Flip is a GSAP plugin for fluid layout animations
import { Flip } from "gsap/Flip";

// Register GSAP plugins
// This tells GSAP to include these plugins in its core functionality
gsap.registerPlugin(useGSAP, Flip);

// Initialize a counter for unique IDs
// This is used to give each item a unique identifier
let count = 0;

// Create a function to cycle through colors
// gsap.utils.wrap creates a function that cycles through the given array
const wrapColor = gsap.utils.wrap(["blue", "green", "red", "orange"]);

// Function to create a new item with unique ID and color
function createItem() {
	return { id: ++count, color: wrapColor(count), status: "entered" };
}

// Define the main Bento component
export default function Bento() {
	// Create a ref for the main container element
	// useRef is a hook that creates a mutable reference object
	const el = useRef();
	
	// Create a GSAP selector function for the container
	// This function allows easy selection of elements within the container
	const q = gsap.utils.selector(el);

	// Define a callback function to remove items
	// useCallback is a hook that returns a memoized version of the callback function
	// This optimization helps prevent unnecessary re-renders
	const removeItems = useCallback(
		(exitingItems) => {
			if (!exitingItems.length) return;

			// Update the layout state, removing exiting items
			setLayout((prev) => ({
				// Flip.getState captures the current state of the elements for animation
				state: Flip.getState(q(".bento-box, .bento-button")),
				// Filter out the exiting items from the previous items array
				items: prev.items.filter((item) => !exitingItems.includes(item)),
			}));
		},
		[q] // This function depends on q, so it's included in the dependency array
	);

	// Initialize the layout state with four items
	// useState is a hook that lets you add state to functional components
	const [layout, setLayout] = useState(() => ({
		items: [createItem(), createItem(), createItem(), createItem()].reverse(),
	}));

	// Use GSAP to handle animations when the layout changes
	// useGSAP is a custom hook from GSAP for React that sets up animations
	useGSAP(
		() => {
			if (!layout.state) return;

			// Find items that are exiting in this update
			const exiting = layout.items.filter((item) => item.status === "exiting");
			// Create a GSAP timeline for the animation
			// Flip.from creates a timeline that animates elements from their previous state to their new state
			const timeline = Flip.from(layout.state, {
				absolute: true,
				ease: "power1.inOut",
				targets: q(".bento-box, .bento-button"),
				scale: true,
				simple: true,
				onEnter: (elements) => {
					// Animation for entering elements
					return gsap.fromTo(
						elements,
						{
							opacity: 0,
							scale: 0,
						},
						{
							opacity: 1,
							scale: 1,
							delay: 0.2,
							duration: 0.3,
						}
					);
				},
				onLeave: (elements) => {
					// Animation for leaving elements
					return gsap.to(elements, {
						opacity: 0,
						scale: 0,
					});
				},
				onComplete() {
					// Workaround for a Safari rendering bug
					let boxes = document.querySelector(".bento-boxes"),
						lastChild = boxes.lastChild;
					boxes.appendChild(lastChild);
				},
			});

			// Remove exiting items from the DOM after the animation
			timeline.add(() => removeItems(exiting));
		},
		{
			dependencies: [layout, q, removeItems],
		}
	);

	// Function to add a new item to the layout
	const addItem = () => {
		setLayout({
			// Capture the current state of the elements
			state: Flip.getState(q(".bento-box, .bento-button")),
			// Add a new item to the beginning of the items array
			items: [createItem(), ...layout.items],
		});
	};

	// Function to shuffle the existing items
	const shuffle = () => {
		setLayout({
			// Capture the current state of the elements
			state: Flip.getState(q(".bento-box, .bento-button")),
			// Create a new array with the items in a random order
			// gsap.utils.shuffle is a utility function that randomly reorders an array
			items: [...gsap.utils.shuffle(layout.items)],
		});
	};

	// Function to remove a specific item
	const remove = (item) => {
		// Mark the item as exiting
		item.status = "exiting";

		// Update the layout state
		setLayout({
			...layout,
			// Capture the current state of the elements
			state: Flip.getState(q(".bento-box, .bento-button")),
		});
	};

	// Render the Bento component
	return (
		<div className="text-center" ref={el}>
			<div>
				<button className="bento-button" onClick={addItem}>
					Add Box
				</button>
				<button className="bento-button" onClick={shuffle}>
					Shuffle
				</button>
			</div>
			<div className="bento-boxes">
				{layout.items.map((item) => (
					<div
						id={`box-${item.id}`}
						key={item.id}
						className={`bento-box gradient-${item.color} ${item.status}`}
						onClick={() => remove(item)}
					>
						Click Me
					</div>
				))}
			</div>
		</div>
	);
}