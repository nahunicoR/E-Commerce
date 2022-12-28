import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";

import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

/* axios.defaults.baseURL = "http://localhost:3001"; */
axios.defaults.baseURL = "https://e-commerce-production-9dbb.up.railway.app";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<Router>
			<Auth0ProviderWithHistory>
				<ChakraProvider>
					<Provider store={store}>
						<App />
					</Provider>
				</ChakraProvider>
			</Auth0ProviderWithHistory>
		</Router>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
