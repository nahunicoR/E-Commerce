import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
	<ChakraProvider>
		<Provider store={store}>
			<Router>
				<React.StrictMode>
					<App />
				</React.StrictMode>
			</Router>
		</Provider>
	</ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
