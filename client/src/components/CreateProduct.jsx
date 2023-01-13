import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { postProducts } from "../redux/actions";

import styles from "../css/CreateProduct.module.css";
import { Link, Navigate } from "react-router-dom";
import { Button, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const validate = (form) => {
	let errors = {};
	if (!form.title) {
		errors.title = "Este campo es Obligatorio";
	}
	if (!form.price) {
		errors.price = "Este campo es Obligatorio";
	}
	if (!form.category || !form.material) {
		errors.category = "Este campo es Obligatorio";
	}
	if (!form.description) {
		errors.description = "Este campo es Obligatorio";
	}
	if (!form.stock) {
		errors.stock = "Este campo es Obligatorio";
	}
	if (form.stock < 1) {
		errors.stock = "No se puede añadir un producto sin stock";
	}

	// if (!form.image) {
	// 	errors.image = 'Este campo es Obligatorio'
	// }
	return errors;
};

export default function CreateProduct() {
	const toast = useToast();

	const { user } = useAuth0();
	const dispatch = useDispatch();
	const [image, setImage] = useState("");
	const [button, setButton] = useState(true);
	const [admin, setAdmin] = useState({});
	const [form, setForm] = useState({
		title: "",
		price: "",
		category: "",
		material: "",
		description: "",
		image: "",
		stock: "",
	});
	const [errors, setErrors] = useState({
		title: "",
		price: "",
		category: "",
		material: "",
		description: "",
		image: "",
		stock: "",
	});

	useEffect(() => {
		if (
			form.title.length > 0 &&
			form.price.length > 0 &&
			form.category.length > 0 &&
			form.material.length > 0 &&
			form.description.length > 0 &&
			form.stock.length > 0 &&
			admin?.rol === "admin"
		) {
			setButton(false);
		} else {
			setButton(true);
		}
	}, [form, setButton, admin]);

	useEffect(() => {
		axios(`/user/one?mail=${user?.email}`).then((res) => {
			console.log(res.data);
			setAdmin(res.data);
		});
	}, [user]);

	const handleChange = (e) => {
		setForm({
			...form,
			[e.target.name]: e.target.value,
		});

		setErrors(
			validate({
				...form,
				[e.target.name]: e.target.value,
			})
		);
	};
	const handleSelectCategory = (e) => {
		setForm({
			...form,
			category: e.target.value,
		});
	};

	const handleSelectMaterial = (e) => {
		setForm({
			...form,
			material: e.target.value,
		});
	};

	const uploadImage = async (e) => {
		const files = e.target.files;
		const data = new FormData();
		data.append("file", files[0]);
		data.append("upload_preset", "ecomerce");
		// setLoading(true);
		const res = await fetch(
			"https://api.cloudinary.com/v1_1/m6nuel/image/upload",
			{
				method: "POST",
				body: data,
			}
		);
		const file = await res.json();
		setImage(file.secure_url);
	};

	const handleSubmit = (e) => {
		//posteo a db
		e.preventDefault();
		dispatch(postProducts(form));
		console.log(form);
		setForm({
			title: "",
			price: "",
			category: "",
			material: "",
			description: "",
			image: "",
			stock: "",
		});
		alert("Se creó un nuevo producto!");

		//feedback de creación del producto y redirección a home.
		toast({
			status: "success",
			title: `${form.title} ha sido agregado a la base de datos`,
			isClosable: true,
		});
		// setTimeout(() => {
		// 	navigate("/home");
		// }, 1300);
	};

	return (
		<>
			<div className={`${styles.content}`}>
				<form className={`${styles.formulario}`} onSubmit={handleSubmit}>
					<Text
						marginLeft={"1.5rem"}
						fontSize={"1.5rem"}
						fontWeight={"bold"}
						marginTop={"1rem"}
					>
						Crear Producto
					</Text>
					<div>
						{/* <label>Nombre del Producto </label> */}
						<input
							type="text"
							value={form.title}
							name="title"
							onChange={handleChange}
							placeholder="Nombre del Producto"
						/>
						<p>{errors.title && errors.title}</p>
					</div>

					<div>
						{/* <label>Precio </label> */}
						<input
							type="number"
							value={form.price}
							name="price"
							onChange={handleChange}
							placeholder="Precio"
						/>
						<p>{errors.price && errors.price}</p>
					</div>

					<div className={`${styles.selects}`}>
						<div>
							{/* <label>Categoria: </label> */}
							<select
								name="category"
								onChange={handleSelectCategory}
								defaultValue="categoria"
							>
								<option disabled value="categoria">
									Seleccionar Categoria
								</option>
								<option value="Bombilla">Bombilla</option>
								<option value="Kit">Kit</option>
								<option value="Mate">Mate</option>
								<option value="Yerba">Yerba</option>
							</select>
							{/* <label>Material: </label> */}
							<select
								name="material"
								onChange={handleSelectMaterial}
								defaultValue="material"
							>
								<option disabled value="material">
									Seleccionar Material
								</option>
								<option value="Artesanal">Artesanal</option>
								<option value="Industrial">Industrial</option>
								<option value="Sintetico">Sintetico</option>
							</select>
						</div>
					</div>

					<div>
						<label>Descripcion: </label>
						<textarea
							value={form.description}
							name="description"
							onChange={handleChange}
						/>
						<p>{errors.description && errors.description}</p>
					</div>

					<div className={`${styles.image}`}>
						<label>Imagen </label>
						<input
							hidden
							type="text"
							value={(form.image = image)}
							name="image"
							onChange={handleChange}
						/>
						<input type="file" onChange={uploadImage} placeholder="Imagen" />
						<div>
							{image ? (
								<img
									alt="test"
									src={image}
									style={{ width: "190px", height: "auto" }}
								/>
							) : (
								<h4>Cargar imagen...</h4>
							)}
						</div>
					</div>
					<div>
						<input
							type="number"
							value={form.stock}
							name="stock"
							onChange={handleChange}
							placeholder="Stock "
						/>
						<p>{errors.stock && errors.stock}</p>
					</div>

					<button type="submit" disabled={button}>
						Cargar
					</button>
					<Link to="/home">
						<Button>Volver</Button>
					</Link>
				</form>
			</div>
		</>
	);
}

// import React, { Fragment, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import { useDispatch } from "react-redux";
// import { postProducts } from "../redux/actions";
// import styles from "../css/CreateProduct.module.css";
// import { uploadImage } from "../cloudinary";

// 	const dispatch = useDispatch();

// 	const [sentForm, changeSentForm] = useState(false);
// 	const [image, setImage] = useState('');

// 	// const url = uploadImage()
// 	const uploadImage = async (e) => {
// 		const files = e.target.files;
// 		const data = new FormData();
// 		data.append("file",files[0]);
// 		data.append("upload_preset", "ecomerce");
// 		// setLoading(true);
// 		const res = await fetch(
// 			"https://api.cloudinary.com/v1_1/m6nuel/image/upload",
// 			{
// 				method: "POST",
// 				body: data,
// 			}
// 		)
// 		const file = await res.json();
// 		setImage(file.secure_url);
// 		console.log(file.secure_url);
// 		console.log(image)
// 		// setLoading(false)
// 		// return file.secure_url
// 	}

// 	return (
// 		<Fragment>
// 			<div className={styles.container}>
// 				<h1>Crear producto</h1>
// 				<Formik
// 					initialValues={{
//         				title: "",
//         				price: "",
//         				image: "",
//         				description: "",
//         				category:"",
// 						material: "",
// 					}}
// 					validate={(values) => {
// 						let errors = {};

// 						if (!values.name) {
// 							errors.name = "Este campo es requerido";
// 						} else if (!/[a-zA-ZñÑ\s]{2,50}/.test(values.name)) {
// 							errors.name = "Debe contener solo letras y espacios";
// 						}

// 						if (!values.image) {
// 							errors.image = "Debe seleccionar una imagen";
// 						}

// 						if (!values.price) {
// 							errors.price = "Selecciona un precio";
// 						} else if (values.price < 0) {
// 							errors.price = "El precio debe ser mayor a 0";
// 						}

// 						if (!values.category) {
// 							errors.category = "La categoria debe ser Bombilla, Mate, Yerba o Kit";
// 						}

// 						if (!values.material) {
// 							errors.material = "Este campo es requerido";
// 						} else if (
// 							values.material === "Sintetico" ||
// 							values.material === "Artesanal" ||
// 							values.material === "Industrial"
// 						) {
// 							errors.material =
// 								"Debe ser alguna opción Sintetico, Artesanal o Industrial.";
// 						}
// 						return errors;
// 					}}
// 					onSubmit={(values, { resetForm }) => {
// 						resetForm();
// 						dispatch(postProducts(values));
// 						changeSentForm(true);
// 						setTimeout(() => changeSentForm(false), 5000);
// 						console.log(values);
// 					}}
// 					onChange={ uploadImage }
// 				>
// 					{({
// 						values,
// 						errors,
// 						handleSubmit,
// 						handleChange,
// 						setFieldValue,
// 						handleBlur,
// 					}) => (
// 						<Form className={styles.formulario} onSubmit={handleSubmit}>
// 							<div>
// 								<label>Nombre: </label>
// 								<Field type="text" id="title" name="title" />
// 								<ErrorMessage
// 									name="name"
// 									component={() => (
// 										<div className={styles.error}>{errors.name}</div>
// 									)}
// 								/>
// 							</div>

// 							<div>
// 								<label>Imagen: </label>
// 								<Field
// 									hidden
// 									// accept="image/png,image/jpeg"
// 									type="text"
// 									id="image"
// 									name="image"
// 									value={ values.image = image }
// 									// onChange={(event) =>
// 									// 	setFieldValue("image", event.currentTarget.files[0])
// 									// }
// 								/>
// 								<input type='file' onChange={ handleChange } />
// 								<ErrorMessage
// 									name="image"
// 									component={() => (
// 										<div className={styles.error}>{errors.image}</div>
// 									)}
// 								/>
// 							</div>

// 							<div>
// 								<label>Precio: </label>
// 								<Field type="number" id="price" name="price" />
// 								<ErrorMessage
// 									name="price"
// 									component={() => (
// 										<div className={styles.error}>{errors.price}</div>
// 									)}
// 								/>
// 							</div>

// 							<div>
// 								<label>Categoria: </label>
// 								<Field type="text" id="category" name="category" />
// 								<ErrorMessage
// 									name="category"
// 									component={() => (
// 										<div className={styles.error}>{errors.category}</div>
// 									)}
// 								/>
// 							</div>

// 							<div>
// 								<label>Material: </label>
// 								<Field type="text" id="material" name="material" />
// 								<ErrorMessage
// 									name="material"
// 									component={() => (
// 										<div className={styles.error}>{errors.material}</div>
// 									)}
// 								/>
// 							</div>

// 							<div>
// 								<Field
// 									name="description"
// 									as="textarea"
// 									placeholder="Description"
// 								/>
// 							</div>
// 							<button type="submit">Añadir</button>
// 							{sentForm && (
// 								<p className={styles.exito}>
// 									¡El producto se ha añadido exitosamente!
// 								</p>
// 							)}
// 						</Form>
// 					)}
// 				</Formik>
// 			</div>
// 		</Fragment>
// 	);
// }

// import React, { useState } from "react";
// import { useDispatch} from "react-redux";
// import { postProducts, getProducts } from "../redux/actions";
// import styles from "../css/CreateProduct.module.css";
// import { Cloudinary } from './Cloudinary';
// import { useEffect } from "react";

// export default function CreateProduct() {
// 	const dispatch = useDispatch();
// 	const [error, setError] = useState({});

// 	useEffect(() => {
// 		dispatch(getProducts());
// 	},[dispatch]);

// 	const [input, setInput] = useState({
//         title: "",
//         price: 0,
//         image: [],
//         description: "",
//         category:"",
// 		    material: "",
//       });

//     // const handleChange = (e) => {
//     //     setInput({
//     //         ...input,
//     //         [e.target.name]: e.target.value,
//     //     });
//     //         setError(
//     //             validate({
//     //                 ...input,
//     //                 [e.target.name]: e.target.value,
//     //             }
//     //         )
//     // )}

//     const handleChange = (e) => {
// 			const {name, value} = e.target;
// 			setInput({
// 				...input,
// 				[name] : value
// 			})
// 			setError(validate({
// 				...input,
// 				[name]: value
// 			}));
// 			console.log(input)
// 		}

// 	const validate = (input) => {

//         let errors = {};

//         if (!input.title) {
// 			errors.title = "Este campo es requerido";
// 		} else if (!/[a-zA-ZñÑ\s]{2,50}/.test(input.title)) {
// 			errors.title = "Debe contener solo letras y espacios";
// 		}

// 		if (!input.image) {
// 			errors.image = "Debe seleccionar una imagen";
// 		}

// 		if (!input.price) {
// 			errors.price = "Añade un precio";
// 		} else if (input.price < 0) {
// 			errors.price = "El precio debe ser mayor a 0";
// 		}

// 	if (!input.category) {
// 			errors.category = "Este campo es requerido";
// 		} else if (
// 			input.category === "Yerba" ||
// 			input.category === "Mate" ||
// 			input.category === "Bombilla" ||
// 			input.category === "Kit"
// 		) {
// 			errors.category =
// 				"Debe ser alguna opción Yerba, Mate, Bombilla o Kit.";
// 		}

// 		if (!input.material) {
// 			errors.material = "Este campo es requerido";
// 		} else if (
// 			input.material === "Sintetico" ||
// 			input.material === "Artesanal" ||
// 			input.material === "Industrial"
// 		) {
// 			errors.material =
// 				"Debe ser alguna opción Sintetico, Artesanal o Industrial.";
// 		}
// 		return errors;
// 	}

//     const handleSubmit = (e) =>{
//         e.preventDefault();
// 		if(input.length){
//             dispatch(postProducts(input))
//             setInput({
//                 name: "",
//                 price: 0,
//                 image: [],
//                 description:"",
// 				category:"",
// 				material:"",
//               });
//               alert("Se creó un nuevo producto!")
//         }
//         else {
//             alert("Completa los campos.")
//         }
//     }

// 	 const addImage = async (e) => {
// 		 const imageUp = await Cloudinary(e.target.files[0]);
//      console.log("iu" + imageUp)
// 			input.image.push(imageUp.url);
//       setInput({
//         ...input,
//       });
// 		};

//     return ( <div className="ProductCreate">
//         <form onSubmit={(e) => handleSubmit(e)}>
//           <div className="mb-3" style={{display:"flex", flexDirection:"column" ,alignItems:"center"}}>

//             <label  className="form-label">
//               Nombre del producto
//             </label>
//             <input
//               style={{width:'600px'}}
//               type="text"
//               placeholder="Nombre..."
//               value={input.title}
//               name='title'
//               onChange={handleChange}
//             />
//             {error.title && <p >{error.title}</p>}

//             <label>
//               Precio
//             </label>
//             <input
//             style={{width:'600px'}}
//               type="number"
//               placeholder="Precio..."
//               value={input.price}
//               name='price'
//               onChange={handleChange}
//             />
//             {error.price && <p>{error.price}</p>}

//             <label>
//               Imagen
//             </label>
//             <input
//             style={{width:'600px'}}
//               type="file"
//               placeholder="Imagen..."
//               name='image'
//               onChange={(e) => {
//                 addImage(e)
//               }}
//             />
//             {error.image && <p >{error.image}</p>}
//             <label className="form-label">
//               Descripción del producto:
//             </label>
//             <input
//               style={{width:'600px'}}
//               type="text"
//               placeholder="Descripción..."
//               value={input.description}
//               name='description'
//               onChange={handleChange}
//             />
//             {error.description && <p >{error.description}</p>}

// 			<label>
//                     Categoría:
//                 </label>
// 				<div className={styles.circle}>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Mate' name="material" onChange={handleChange}/> Mate
// 				</label>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Yerba' name="material" onChange={handleChange}/> Yerba
// 				</label>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Bombilla' name="material" onChange={handleChange}/> Bombilla
// 				</label>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Kit' name="material" onChange={handleChange}/> Kit
// 				</label>
// 				</div>

//                 <label>
//                     Material:
//                 </label>
// 				<div className={styles.circle}>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Sintetico' name="material" onChange={handleChange}/> Sintetico
// 				</label>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Industrial' name="material" onChange={handleChange}/> Industrial
// 				</label>
// 				<label className={styles.labelName}>
// 					<input type="radio" className={styles.circle} value='Artesanal' name="material" onChange={handleChange}/> Artesanal
// 				</label>
// 				</div>
//             		{error.material && <p >{error.material}</p>}
//           <hr />
//           <button type="submit" className="btn btn-primary">
//             Crear
//           </button>
//           </div>
//         </form>
//       </div>
//     )
// }
