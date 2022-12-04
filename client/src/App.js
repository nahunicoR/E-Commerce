import { Routes, Route } from "react-router-dom";
import React from "react";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Landing from "./components/Landing";
import CreateProduct from "./components/CreateProduct";
import Details from "./components/Details";
function App() {
	return (
		<div className="App">
			<Nav />
			<Routes>
				<Route exact path="/" element={<Landing />} />
				<Route path="/home" element={<Home />} />
				<Route path="/create" element={<CreateProduct />} />
				<Route path="/detail/:id" element={<Details />} />
			</Routes>
		</div>
	);
}

export default App;
