import React from 'react';
import { Link } from 'react-router-dom';
import ArrowRight from '../components/icons/arrow-right';
import '../styles/home.css';

function Card({ title, to }) {
	return (
		<Link to={to} className="card">
			<h2>{title}</h2>
			<ArrowRight className="arrow-icon" width="34" height="34" />
		</Link>
	);
}

function HomePage() {
	return (
		<div className="home-page">
			<h1>UI Experiments</h1>
			<div className="card-container">
				<Card title="Sliding Nav Selector" to="/nav" />
				<Card title="Tooltip Menu" to="/tooltip" />
				<Card title="Bento Cards" to="/bento" />
			</div>
		</div>
	);
}

export default HomePage;
