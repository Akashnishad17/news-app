import './App.css';

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import business from './data/business.json';
import entertainment from './data/entertainment.json';
import general from './data/general.json';
import health from './data/health.json';
import science from './data/science.json';
import sports from './data/sports.json';
import technology from './data/technology.json';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


const App = () => {
	const pageSize = 9;
	const country = "in";
	const apiKey = process.env.REACT_APP_NEWS_API;
	const [progress, setProgress] = useState(0);

	return (
		<div>
			<Router>
				<Navbar />
				<LoadingBar
					color='#f11946'
					progress={progress}
				/>
				<Routes>
					<Route exact path="/" element={<News data={general} apiKey={apiKey} setProgress={setProgress} key="1" pageSize={pageSize} country={country}category="general" />} />
					<Route exact path="/business" element={<News data={business} apiKey={apiKey} setProgress={setProgress} key="2" pageSize={pageSize} country={country}category="business" />} />
					<Route exact path="/entertainment" element={<News data={entertainment} apiKey={apiKey} setProgress={setProgress} key="3" pageSize={pageSize} country={country}category="entertainment" />} />
					<Route exact path="/general" element={<News data={general} apiKey={apiKey} setProgress={setProgress} key="4" pageSize={pageSize} country={country}category="general" />} />
					<Route exact path="/health" element={<News data={health} apiKey={apiKey} setProgress={setProgress} key="5" pageSize={pageSize} country={country}category="health" />} />
					<Route exact path="/science" element={<News data={science} apiKey={apiKey} setProgress={setProgress} key="6" pageSize={pageSize} country={country}category="science" />} />
					<Route exact path="/sports" element={<News data={sports} apiKey={apiKey} setProgress={setProgress} key="7" pageSize={pageSize} country={country}category="sports" />} />
					<Route exact path="/technology" element={<News data={technology} apiKey={apiKey} setProgress={setProgress} key="8" pageSize={pageSize} country={country} category="technology" />} />
				</Routes>
			</Router>
		</div>
	)
}

export default App;
