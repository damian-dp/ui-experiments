import React from 'react';

function UserSub(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const width = props.width || '1em';
	const height = props.height || '1em';

	return (
		<svg height={height} width={width} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
	<g fill={fill}>
		<circle cx="6.807" cy="5" fill="none" r="2.25" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<polyline fill="none" points="15.25 6.25 17.25 8.25 15.25 10.25" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<polyline fill="none" points="13.25 11.25 11.25 13.25 13.25 15.25" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="17.25" x2="12.25" y1="8.25" y2="8.25"/>
		<line fill="none" stroke={secondaryfill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" x1="11.25" x2="16.25" y1="13.25" y2="13.25"/>
		<path d="M10.102,10.863c-.919-.693-2.055-1.113-3.295-1.113-2.145,0-4,1.229-4.906,3.02-.4,.791,.028,1.757,.866,2.048,1.031,.358,2.408,.683,4.04,.683,1.061,0,2-.144,2.82-.338" fill="none" stroke={fill} strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"/>
	</g>
</svg>
	);
};

export default UserSub;