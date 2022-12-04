import React, { Fragment, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch } from 'react-redux'
import {postProducts} from '../redux/actions';


export default function CreateProduct(){
    const dispatch = useDispatch();
    //const prod = useSelector((state) => state.products);

	const [sentForm, changeSentForm] = useState(false);
    // const [input, setInput] = useState({
  	// 	 name: "",
	// 	 image: "",
	// 	 price: 0,
	// 	 description: "",
	// 	 stock: 0,
	// });

	return(
        <Fragment>
			<div>
             <h1>Crear producto</h1>
                <Formik
                    initialValues={{
						name: "",
						image:"",
						price: "",
						description: "",
						stock: 0,
					}}
					validate={(values) =>{
						let errors = {};
						
						if(!values.name){
							errors.name = "Este campo es requerido";
						}else if (!/[a-zA-ZñÑ\s]{2,50}/.test(values.name)){
							errors.name = "Debe contener solo letras y espacios";
						}

						if(!values.image) {
							errors.image = "Debe seleccionar una imagen";
						}

						if(!values.price) {
							errors.price = "Selecciona un precio";
						}else if (values.price < 0) {
							errors.price = "El precio debe ser mayor a 0";
						}

						if (!values.stock) {
							errors.stock = "Este campo es requerido";
						}else if (values.stock < 0) {
							errors.stock = "Debe ser mayor a 0";
						}
						return errors;
						}
					}

					onSubmit={(values, { resetForm }) => {
						resetForm();
						dispatch(postProducts(values));
						changeSentForm(true);
						setTimeout(() => changeSentForm(false), 5000);
						console.log(values);
					}}
					>
						{({
							values,
							errors,
							handleSubmit,
							handleChange,
							setFieldValue,
							handleBlur,
						}) => (
							<Form>
								<div>
									<label>Nombre: </label>
									<Field type="text" id="name" name="name" />
									<ErrorMessage
										name="name"
										component={() => (
											<div>{errors.name}</div>
										)}
										/>
								</div>

								<div>
									<label>Imagen: </label>
									<input
									accept="image/png,image/jpeg"
									type="file"
									id="image"
									name="image"
									onChange={(event) =>
									setFieldValue("image", event.currentTarget.files[0])
								}
									/>
									<ErrorMessage
										name="image"
										component={() => (
											<div>{errors.image}</div>
										)}
									/>
								</div>

								<div>
									<label>Precio: </label>
									<Field type="number" id="price" name="price" />
									<ErrorMessage
										name="price"
										component={() => (
											<div>{errors.price}</div>
										)}
									/>
								</div>

								<div>
									<label>Stock: </label>
									<Field type="number" id="stock" name="stock" />
									<ErrorMessage
										name="stock"
										component={() => (
											<div>{errors.stock}</div>
										)}
									/>
								</div>

								<div>
									<Field
									name="description"
									as="textarea"
									placeholder="Description"
									/>
								</div>
								<button type="submit">Añadir</button>
								{sentForm && (
									<p>
										¡El producto se ha añadido exitosamente!
									</p>
								)}
							</Form>
						)}
            	</Formik>
         	</div>
		</Fragment>
		)
}