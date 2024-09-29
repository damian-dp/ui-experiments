import React from 'react';

function Timer(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const width = props.width || '100%';
	const height = props.height || '100%';

	return (
		<svg height={height} width={width} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
	<g fill={fill}>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="10" x2="5.0503" y1="10" y2="5.0503"/>
		<path d="m5.0502,5.0503c-1.2667,1.2668-2.0502,3.0167-2.0502,4.9497,0,3.866,3.134,7,7,7s7-3.134,7-7-3.134-7-7-7v2" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
	</g>
</svg>
	);
};

export default Timer;