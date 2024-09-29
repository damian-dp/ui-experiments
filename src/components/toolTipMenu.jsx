import React, { useState, useRef, useEffect } from "react";
import Heart from "./icons/heart";
import MoonOutline from "./icons/moon-outline";
import Exit from "./icons/exit";
import SunOutline from "./icons/sun-outline";
import Timer from "./icons/timer";
import UserSub from "./icons/user-sub";

export default function ToolTipMenu() {
	const [tooltip, setTooltip] = useState({ show: false, text: "", index: -1 });
	const menuRef = useRef(null);

	const menuItems = [
		{ icon: Heart, label: "Favorite" },
		{ icon: UserSub, label: "User" },
		{ icon: SunOutline, label: "Light Mode" },
		{ icon: Timer, label: "Timer" },
		{ icon: MoonOutline, label: "Dark Mode" },
		{ icon: Exit, label: "Exit" },
	];

	useEffect(() => {
		const handleMouseMove = (e) => {
			if (menuRef.current) {
				const menuRect = menuRef.current.getBoundingClientRect();
				const relativeX = e.clientX - menuRect.left;
				const relativeY = e.clientY - menuRect.top;

				// Check if the mouse is within the bounds of the menu
				if (
					relativeY >= 0 &&
					relativeY <= menuRect.height &&
					relativeX >= 0 &&
					relativeX <= menuRect.width
				) {
					const menuWidth = menuRect.width;
					const itemWidth = menuWidth / menuItems.length;
					const index = Math.floor(relativeX / itemWidth);

					if (index >= 0 && index < menuItems.length) {
						setTooltip({
							show: true,
							text: menuItems[index].label,
							index: index,
						});
					} else {
						setTooltip({ show: false, text: "", index: -1 });
					}
				} else {
					setTooltip({ show: false, text: "", index: -1 });
				}
			}
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, [menuItems.length]);

	return (
		<div className="menu-container" ref={menuRef}>
			{menuItems.map((item, index) => (
				<div key={index} className="menu-icon-wrapper">
					<item.icon className="menu-icon" width="25px" height="25px" />
				</div>
			))}
			{tooltip.show && (
				<div
					className="tooltip"
					style={{
						left: `calc(${(tooltip.index + 0.5) * (100 / menuItems.length)}%)`,
						transform: "translateX(-50%)",
					}}
				>
					{tooltip.text}
				</div>
			)}
		</div>
	);
}
