import './App.css';

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


export default class App extends Component {
  render() {
	const pageSize = 9;
	const country = "in";
	
    return (
		<div>
			<Router>
				<Navbar />
				<Routes>
					<Route exact path="/" element={<News key="1" pageSize={pageSize} country={country}category="general" />} />
					<Route exact path="/business" element={<News key="2" pageSize={pageSize} country={country}category="business" />} />
					<Route exact path="/entertainment" element={<News key="3" pageSize={pageSize} country={country}category="entertainment" />} />
					<Route exact path="/general" element={<News key="4" pageSize={pageSize} country={country}category="general" />} />
					<Route exact path="/health" element={<News key="5" pageSize={pageSize} country={country}category="health" />} />
					<Route exact path="/science" element={<News key="6" pageSize={pageSize} country={country}category="science" />} />
					<Route exact path="/sports" element={<News key="7" pageSize={pageSize} country={country}category="sports" />} />
					<Route exact path="/technology" element={<News key="8" pageSize={pageSize} country={country} category="technology" />} />
				</Routes>
			</Router>
		</div>
    )
  }
}
