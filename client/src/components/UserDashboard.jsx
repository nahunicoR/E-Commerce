import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { Button, Avatar } from "@chakra-ui/react";

export default function UserDashboard() {
	const { user } = useAuth0();
	const navigate = useNavigate();
	return (
		<div>
			<Button colorScheme={"teal"} onClick={() => navigate(-1)}>
				volver
			</Button>
			<Avatar
				size={"2xl"}
				name={user.name}
				src={user.picture}
				alt="profile-snippet"
			/>
			<h1>Hola, {user.name}</h1>
			<p>{JSON.stringify(user)}</p>
		</div>
	);
}
