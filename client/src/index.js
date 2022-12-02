import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { BrowserRouter as Router } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Auth0Provider } from "@auth0/auth0-react";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const client = process.env.REACT_APP_AUTH0_CLIENTID;

ReactDOM.render(
	<Auth0Provider
		domain={domain}
		clientId={client}
		redirectUri={window.location.origin}
	>
		<ChakraProvider>
			<Provider store={store}>
				<Router>
					<React.StrictMode>
						<App />
					</React.StrictMode>
				</Router>
			</Provider>
		</ChakraProvider>
	</Auth0Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
