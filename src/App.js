import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';


export default class App extends Component {
	constructor(){
		super();
		this.state = {
			progress: 0
		};
	}

	setProgress = (progress) => {
		this.setState({progress: progress});
	}

	render() {
		const pageSize = 9;
		const country = "in";
		
		return (
			<div>
				<Router>
					<Navbar />
					<LoadingBar
						color='#f11946'
						progress={this.state.progress}
					/>
					<Routes>
						<Route exact path="/" element={<News setProgress={this.setProgress} key="1" pageSize={pageSize} country={country}category="general" />} />
						<Route exact path="/business" element={<News setProgress={this.setProgress} key="2" pageSize={pageSize} country={country}category="business" />} />
						<Route exact path="/entertainment" element={<News setProgress={this.setProgress} key="3" pageSize={pageSize} country={country}category="entertainment" />} />
						<Route exact path="/general" element={<News setProgress={this.setProgress} key="4" pageSize={pageSize} country={country}category="general" />} />
						<Route exact path="/health" element={<News setProgress={this.setProgress} key="5" pageSize={pageSize} country={country}category="health" />} />
						<Route exact path="/science" element={<News setProgress={this.setProgress} key="6" pageSize={pageSize} country={country}category="science" />} />
						<Route exact path="/sports" element={<News setProgress={this.setProgress} key="7" pageSize={pageSize} country={country}category="sports" />} />
						<Route exact path="/technology" element={<News setProgress={this.setProgress} key="8" pageSize={pageSize} country={country} category="technology" />} />
					</Routes>
				</Router>
			</div>
		)
	}
}
