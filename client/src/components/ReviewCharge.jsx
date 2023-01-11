import React,{useState} from "react";
import { FaStar } from "react-icons/fa";
import { Button , useToast, Input} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { postReview } from "../redux/actions";
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

const validate = (description, rating) => {
	let errors = {};
	if (!description) {
		errors.description = "Este campo es Obligatorio.";
    }else {
        if(description.length > 250){
            errors.description = "Solo se permiten hasta 250 caracteres!"
    }
    if(rating === null){
        errors.rating = "Éste campo es requerido."
    }
    else if(rating < 1 || rating > 5 || rating === 0){
        errors.rating = "La calificación debe estar entre 1 y 5 estrellas.."
    }
}
    return errors;
}

function ReviewCharge({productId}){
    const dispatch = useDispatch();

    const stars = Array(5).fill(0);
    const { isAuthenticated, user } = useAuth0();
    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({
        rating: "",
        description: "",
    });
    const toast = useToast();
    
    const review = {
        userEmail: user.email,
        productId: productId,
        rating: currentValue,
        description: description
    }
    console.log(review.description)

    const handleDescription = e =>{
        console.log(e.target.value)
        setDescription(e.target.value)
    }

    const handleClick = value => {
        console.log(value,'--------soy value hancldeClick')
        setCurrentValue(value)
    };

    const handleMouseOver = value =>{
        setHoverValue(value)

    };

    const handleMouseLeave = value =>{
        setHoverValue(undefined)

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(postReview(review));
        setCurrentValue(0);
        setDescription("");

    }

    return (
        <div style={styles.container}>
            <h2>Puntuación</h2>
            <div style={styles.stars}>
                {stars.map((_, index) =>{
                    return (
                        <FaStar
                            key={index}
                            size={24}
                            style={{
                                marginRight: 10,
                                cursor: "pointer"
                            }}
                            color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                            onClick={() => handleClick(index + 1)}
                            onMouseOver={() => handleMouseOver(index + 1)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })}

            </div>
            <div style={styles.containerT}>
            <Input type='text' name='description' size='lg' value={description} placeholder='Cuentanos tu opinión..' onChange={handleDescription}/>
            </div>
                <Button
                    onClick={(e) => handleSubmit(e)}
                    type="submit"
                    w={"40%"}
                    colorScheme={"teal"}
                >
                    Enviar
                </Button>
        </div>
    );
};

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
        width: '90%',
        display: "flex",
        
      },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: "100%",
        flexDirection: "fit-content",
        margin: "20px 0",
        minHeight: 100,
        padding: 10
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 100,
        margin: "20px 0",
        minHeight: 60,
        padding: 10
    }
}


export default ReviewCharge