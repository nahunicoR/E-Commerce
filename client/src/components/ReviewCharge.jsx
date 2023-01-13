import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { Button, Input, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch /* useSelector */ } from "react-redux";
import { postReview, getReviews } from "../redux/actions";
import { getUser } from "../redux/user";
const colors = {
	orange: "#FFBA5A",
	grey: "#a9a9a9",
};

const validate = (input, currentValue) => {
	let errors = {};
	if (input.description) {
		errors.description = "Este campo es Obligatorio.";
	} else {
		if (input.description.length > 250) {
			errors.description = "Solo se permiten hasta 250 caracteres!";
		}
		if (currentValue === null) {
			errors.rating = "Éste campo es requerido.";
		} else if (currentValue < 1 || currentValue > 5 || currentValue === 0) {
			errors.currentValue =
				"La calificación debe estar entre 1 y 5 estrellas..";
		}
	}
	return errors;
};

function ReviewCharge({ productId }) {
	const dispatch = useDispatch();
	const stars = Array(5).fill(0);
	// const user2 = useSelector((state)=> state.user)
	// const toast = useToast();
	const { isAuthenticated, user } = useAuth0();
	const [currentValue, setCurrentValue] = useState(0);
	const [hoverValue, setHoverValue] = useState(undefined);
	const [input, setInput] = useState({
		description: "",
		userEmail: {},
		productId: null,
	});

	let review = {
		input: {
			...input,
			userEmail: user ? { email: user?.email } : null,
			productId: productId.id,
		},
		currentValue: currentValue,
	};

	const [errors, setErrors] = useState({
		description: "",
		currentValue: "",
	});

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const handleInput = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		setErrors(
			validate({
				...input,
				[e.target.name]: e.target.value,
			})
		);
	};

	const handleClick = (value) => {
		// console.log(value)
		setCurrentValue(value);
	};

	const handleMouseOver = (value) => {
		setHoverValue(value);
	};

	const handleMouseLeave = (value) => {
		setHoverValue(undefined);
	};

	const handleSubmit = (e) => {
		dispatch(postReview(review));
		setTimeout(() => {
			dispatch(getReviews(productId.id));
		}, 1000);
		// console.log(review,'reviewPOST')
		setCurrentValue(0);
		setInput({
			description: "",
		});
		//alert('¡Creaste un nuevo comentario!')
	};

	return (
		<div style={styles.container}>
			<h2>Puntuación</h2>
			<div style={styles.stars}>
				{stars.map((_, index) => {
					return (
						<FaStar
							key={index}
							size={24}
							style={{
								marginRight: 10,
								cursor: "pointer",
							}}
							color={
								(hoverValue || currentValue) > index
									? colors.orange
									: colors.grey
							}
							onClick={() => handleClick(index + 1)}
							onMouseOver={() => handleMouseOver(index + 1)}
							onMouseLeave={handleMouseLeave}
						/>
					);
				})}
				<p>{errors.currentValue && errors.currentValue}</p>
			</div>
			<div style={styles.containerT}>
				<Input
					type="text"
					name="description"
					size="lg"
					value={input.description}
					placeholder="Cuentanos tu opinión.."
					onChange={handleInput}
				/>
				<p>{errors.description && errors.description}</p>
			</div>
			{isAuthenticated ? (
				<Button
					onClick={handleSubmit}
					w={"40%"}
					colorScheme={"teal"}
					isActive={!isAuthenticated}
				>
					Enviar
				</Button>
			) : (
				<Text fontSize={"1.2rem"}>Inicia sesion para comentar</Text>
			)}
		</div>
	);
}

const styles = {
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	stars: {
		display: "flex",
		flexDirection: "row",
	},
	containerT: {
		width: "90%",
		display: "flex",
	},
	textarea: {
		border: "1px solid #a9a9a9",
		borderRadius: 5,
		width: "100%",
		flexDirection: "fit-content",
		margin: "20px 0",
		minHeight: 100,
		padding: 10,
	},
	button: {
		border: "1px solid #a9a9a9",
		borderRadius: 5,
		width: 100,
		margin: "20px 0",
		minHeight: 60,
		padding: 10,
	},
};

export default ReviewCharge;
