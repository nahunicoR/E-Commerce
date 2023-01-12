import axios from "axios";

const isAdmin = async (getToken)=>{
    try {
        const token = await getToken();
        console.log(token);
        const response = await axios("/authorization",{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log('respuesta ',response);
        if(response.data.message === "authorized") return true;
        return false;   
    } catch (error) {
        return false
    }
}

export default isAdmin;