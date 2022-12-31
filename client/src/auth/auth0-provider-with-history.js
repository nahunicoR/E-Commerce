import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
	const navigate = useNavigate();
	const domain = process.env.REACT_APP_AUTH0_DOMAIN;
	const clientId = process.env.REACT_APP_AUTH0_CLIENTID;
	const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
	/* const audience = process.env.REACT_APP_AUTH0_AUDIENCE; */

	const onRedirectCallback = (appState) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			redirectUri={window.location.origin + "/home"}
			onRedirectCallback={onRedirectCallback}
			audience={audience}
		>
			{children}
		</Auth0Provider>
	);
};

export default Auth0ProviderWithHistory;
