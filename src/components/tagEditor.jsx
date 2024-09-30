import React, { useState, useRef, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Xmark from "./icons/x-mark";

export default function TagEditor() {
	const [tags, setTags] = useState([
			"Accounting",
			"Marketing",
			"Ops",
			"Sales",
			"Retail",
			"Customer Service",
		]);
	const [inputValue, setInputValue] = useState("");
	const wrapperRef = useRef(null);
	const newTagInputRef = useRef(null);

	useEffect(() => {
		if (wrapperRef.current) {
			wrapperRef.current.style.height = 'auto';
		}
		adjustAllInputWidths();
	}, [tags]);

	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleInputKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			addNewTag();
		} else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
			e.preventDefault();
			setTags(tags.slice(0, -1));
		}
	};

	const addNewTag = () => {
		const newTags = inputValue
			.split(",")
			.map((tag) => tag.trim())
			.filter((tag) => tag !== "");
		setTags([...tags, ...newTags]);
		setInputValue("");
	};

	const updateTag = (index, newValue) => {
		const newTags = [...tags];
		newTags[index] = newValue.trim();
		setTags(newTags);
		setTimeout(adjustAllInputWidths, 0);
	};

	const removeTag = (indexToRemove) => {
		setTags(tags.filter((_, index) => index !== indexToRemove));
	};

	const handleWrapperClick = (e) => {
		if (e.target === wrapperRef.current) {
			newTagInputRef.current.focus();
		}
	};

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

	const adjustAllInputWidths = () => {
		const inputs = document.querySelectorAll('.tag-pill input');
		inputs.forEach(adjustInputWidth);
	};

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
					// placeholder="Add a tag"
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleInputKeyDown}
					onBlur={addNewTag}
					ref={newTagInputRef}
				/>
			</div>
	);
}
