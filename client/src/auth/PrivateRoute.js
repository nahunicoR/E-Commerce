import { Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function PrivateRoute() {
	const { loginWithRedirect, isAuthenticated } = useAuth0();

	if (!isAuthenticated) {
		return loginWithRedirect();
	} else {
		return (
			<div>
				<Outlet />
			</div>
		);
	}
}
