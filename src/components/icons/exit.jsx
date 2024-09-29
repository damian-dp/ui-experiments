import React from 'react';

function Exit(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const width = props.width || '1em';
	const height = props.height || '1em';

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<g fill={fill}>
		<path d="M6.25,5.75v-1.5c0-1.105,.895-2,2-2h5.5c1.105,0,2,.895,2,2V13.75c0,1.105-.895,2-2,2h-5.5c-1.105,0-2-.895-2-2v-1.5" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<polyline fill="none" points="3.5 11.75 .75 9 3.5 6.25" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1=".75" x2="9.25" y1="9" y2="9"/>
	</g>
</svg>
	);
};

export default Exit;