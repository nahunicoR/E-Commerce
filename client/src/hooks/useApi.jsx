import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const useApi = (url, options = {}) => {
	const { getAccessTokenSilently } = useAuth0();
	const [state, setState] = useState({
		error: null,
		loading: true,
		data: null,
	});
	const [refreshIndex, setRefreshIndex] = useState(0);

	useEffect(() => {
		async function fetchApiData() {
			try {
				const { audience, scope, ...fetchOptions } = options;
				const accessToken = await getAccessTokenSilently({ audience, scope });
				const res = await fetch(url, {
					...fetchOptions,
					headers: {
						...fetchOptions.headers,
						// Add the Authorization header to the existing headers
						Authorization: `Bearer ${accessToken}`,
					},
				});
				setState({
					...state,
					data: await res.json(),
					error: null,
					loading: false,
				});
			} catch (error) {
				setState({
					...state,
					error,
					loading: false,
				});
			}
		}
		fetchApiData();
	}, [getAccessTokenSilently, options, state, url, refreshIndex]);

	return {
		...state,
		refresh: () => setRefreshIndex(refreshIndex + 1),
	};
};
