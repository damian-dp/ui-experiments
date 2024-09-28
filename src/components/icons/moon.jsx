import React from 'react';

function Moon(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const width = props.width || '100%';
	const height = props.height || '100%';

	return (
		<svg height={height} width={width} viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<g fill={fill}>
		<path d="M43,28.3c-1.7,0.5-3.4,0.7-5,0.7c-10.5,0-19-8.5-19-19c0-1.6,0.2-3.3,0.7-5c0.1-0.3,0-0.7-0.3-1 c-0.3-0.3-0.6-0.4-1-0.3C9.4,6.2,3,14.6,3,24c0,11.6,9.4,21,21,21c9.4,0,17.8-6.4,20.2-15.5c0.1-0.3,0-0.7-0.3-1 C43.7,28.3,43.4,28.2,43,28.3z" fill={fill}/>
	</g>
</svg>
	);
};

export default Moon;