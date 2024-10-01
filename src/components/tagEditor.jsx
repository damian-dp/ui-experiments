// Import necessary dependencies from React
import React, { useState, useRef, useEffect } from "react";
// Import components from react-transition-group for animations
import { CSSTransition, TransitionGroup } from "react-transition-group";
// Import the Xmark icon component
import Xmark from "./icons/x-mark";

// Define and export the TagEditor component
export default function TagEditor() {
	// State to store the list of tags
	// useState is a hook that lets you add state to functional components
	const [tags, setTags] = useState([
			"Accounting",
			"Marketing",
			"Ops",
			"Sales",
			"Retail",
			"Customer Service",
		]);
	
	// State to store the current input value
	const [inputValue, setInputValue] = useState("");
	
	// Refs for DOM elements
	// useRef is a hook that lets you create a mutable reference that persists across re-renders
	const wrapperRef = useRef(null);
	const newTagInputRef = useRef(null);

	// Effect to adjust the height of the wrapper and input widths when tags change
	useEffect(() => {
		if (wrapperRef.current) {
			wrapperRef.current.style.height = 'auto';
		}
		adjustAllInputWidths();
	}, [tags]);

	// Function to handle input changes
	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	// Function to handle key presses in the input field
	const handleInputKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addNewTag();
		} else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
			e.preventDefault();
			setTags(tags.slice(0, -1));
		}
	};

	// Function to add a new tag
	const addNewTag = () => {
		const newTags = inputValue
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag !== "");
		setTags([...tags, ...newTags]);
		setInputValue("");
	};

	// Function to update an existing tag
	const updateTag = (index, newValue) => {
		const newTags = [...tags];
		newTags[index] = newValue.trim();
		setTags(newTags);
		setTimeout(adjustAllInputWidths, 0);
	};

	// Function to remove a tag
	const removeTag = (indexToRemove) => {
		setTags(tags.filter((_, index) => index !== indexToRemove));
	};

	// Function to handle clicks on the wrapper
	const handleWrapperClick = (e) => {
		if (e.target === wrapperRef.current) {
			newTagInputRef.current.focus();
		}
	};

	// Function to adjust the width of an input field
	const adjustInputWidth = (input) => {
		const tempSpan = document.createElement('span');
		tempSpan.style.font = window.getComputedStyle(input).font;
		tempSpan.style.visibility = 'visible';
		tempSpan.style.position = 'absolute';
		tempSpan.style.whiteSpace = 'pre';
		tempSpan.textContent = input.value || input.placeholder || '';
		document.body.appendChild(tempSpan);
		const width = tempSpan.getBoundingClientRect().width;
		document.body.removeChild(tempSpan);
		input.style.width = `${Math.max(width + 18)}px`; // Ensure a minimum width of 30px
	};

	// Function to adjust the width of all input fields
	const adjustAllInputWidths = () => {
		const inputs = document.querySelectorAll('.tag-pill input');
		inputs.forEach(adjustInputWidth);
	};

	// Render the TagEditor component
	return (
			<div className="tag-wrapper" ref={wrapperRef} onClick={handleWrapperClick}>
				<TransitionGroup component={null}>
					{tags.map((tag, index) => (
							<CSSTransition key={index} timeout={300} classNames="tag">
								<span className="tag-pill">
									<input
										type="text"
										value={tag}
										onChange={(e) => {
											updateTag(index, e.target.value);
											adjustInputWidth(e.target);
										}}
										onBlur={(e) => updateTag(index, e.target.value)}
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												e.target.blur();
											}
										}}
									/>
									<button onClick={(e) => { e.stopPropagation(); removeTag(index); }}>
										<Xmark height="12" width="12" />
									</button>
								</span>
							</CSSTransition>
						))}
				</TransitionGroup>
				<input
					className="add-tag-input"
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					onBlur={addNewTag}
					ref={newTagInputRef}
				/>
			</div>
	);
}