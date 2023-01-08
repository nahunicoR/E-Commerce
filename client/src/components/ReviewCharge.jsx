import React from "react";
import { FaStar } from "react-icons/fa";
import { Button } from "@chakra-ui/react";
const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"
}

function ReviewCharge(){
    const stars = Array(5).fill(0);
    const [currentValue, setCurrentValue] = React.useState(0);
    const [hoverValue, setHoverValue] = React.useState(undefined);
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
            <textarea
                placeholder="Cuéntanos tu opinión"
                style={styles.textarea}
            />
            <Button
                w={"40%"}
                colorScheme={"teal"}
                top="85%"
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
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
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