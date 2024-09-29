import React, {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import ReactDOM from "react-dom/client";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";


gsap.registerPlugin(useGSAP,Flip);

let count = 0;

const wrapColor = gsap.utils.wrap(["blue", "green", "red", "orange"]);

function createItem() {
	return { id: ++count, color: wrapColor(count), status: "entered" };
}


export default function Bento() {
	const el = useRef();
	const q = gsap.utils.selector(el);

	const removeItems = useCallback(
		(exitingItems) => {
			if (!exitingItems.length) return;

			setLayout((prev) => ({
				state: Flip.getState(q(".bento-box, .bento-button")),
				items: prev.items.filter((item) => !exitingItems.includes(item)),
			}));
		},
		[q]
	);

	const [layout, setLayout] = useState(() => ({
		items: [createItem(), createItem(), createItem(), createItem()].reverse(),
	}));

	useGSAP(
		() => {
			if (!layout.state) return;

			// get the items that are exiting in this batch
			const exiting = layout.items.filter((item) => item.status === "exiting");
			// Flip.from returns a timeline
			const timeline = Flip.from(layout.state, {
				absolute: true,
				ease: "power1.inOut",
				targets: q(".bento-box, .bento-button"),
				scale: true,
				simple: true,
				onEnter: (elements) => {
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
					return gsap.to(elements, {
						opacity: 0,
						scale: 0,
					});
				},
				onComplete() {
					// works around a Safari rendering bug (unrelated to GSAP). Things reflow narrower otherwise.
					let boxes = document.querySelector(".bento-boxes"),
						lastChild = boxes.lastChild;
					boxes.appendChild(lastChild);
				},
			});

			// remove the exiting items from the DOM after the animation is done
			timeline.add(() => removeItems(exiting));
		},
		{
			dependencies: [layout, q, removeItems],
		}
	);

	const addItem = () => {
		setLayout({
			state: Flip.getState(q(".bento-box, .bento-button")),
			items: [createItem(), ...layout.items],
		});
	};

	const shuffle = () => {
		setLayout({
			state: Flip.getState(q(".bento-box, .bento-button")),
			items: [...gsap.utils.shuffle(layout.items)],
		});
	};

	const remove = (item) => {
		// set the item as exiting which will add a CSS class for display: none;
		item.status = "exiting";

		setLayout({
			...layout,
			state: Flip.getState(q(".bento-box, .bento-button")),
		});
	};

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


