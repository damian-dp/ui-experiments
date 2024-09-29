import React from 'react';

function ArrowRight(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const width = props.width || '1em';
	const height = props.height || '1em';

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<g fill={fill}>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="15.25" x2="2.75" y1="9" y2="9"/>
		<polyline fill="none" points="11 4.75 15.25 9 11 13.25" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default ArrowRight;