import React, { Fragment, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { postProducts } from "../redux/actions";
import styles from "../css/CreateProduct.module.css";

export default function CreateProduct() {
	const dispatch = useDispatch();
	//const prod = useSelector((state) => state.products);

	const [sentForm, changeSentForm] = useState(false);

	return (
		<Fragment>
			<div className={styles.container}>
				<h1>Crear producto</h1>
				<Formik
					initialValues={{
						name: "",
						image: "",
						price: "",
						description: "",
						material: "",
						stock: 0,
					}}
					validate={(values) => {
						let errors = {};

						if (!values.name) {
							errors.name = "Este campo es requerido";
						} else if (!/[a-zA-ZñÑ\s]{2,50}/.test(values.name)) {
							errors.name = "Debe contener solo letras y espacios";
						}

						if (!values.image) {
							errors.image = "Debe seleccionar una imagen";
						}

						if (!values.price) {
							errors.price = "Selecciona un precio";
						} else if (values.price < 0) {
							errors.price = "El precio debe ser mayor a 0";
						}

						if (!values.material) {
							errors.material = "Este campo es requerido";
						} else if (
							values.material === "Sintetico" ||
							values.material === "Artesanal" ||
							values.material === "Industrial"
						) {
							errors.material =
								"Debe ser alguna opción Sintetico, Artesanal o Industrial.";
						}

						if (!values.stock) {
							errors.stock = "Éste campo es requerido";
						  } else if (values.stock < 0) {
							errors.stock = "El stock debe ser superior a 0";
						  }
						  return errors;
						}}
		
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
						<Form className={styles.formulario} onSubmit={handleSubmit}>
							<div>
								<label>Nombre: </label>
								<Field type="text" id="name" name="name" />
								<ErrorMessage
									name="name"
									component={() => (
										<div className={styles.error}>{errors.name}</div>
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
										<div className={styles.error}>{errors.image}</div>
									)}
								/>
							</div>

							<div>
								<label>Precio: </label>
								<Field type="number" id="price" name="price" />
								<ErrorMessage
									name="price"
									component={() => (
										<div className={styles.error}>{errors.price}</div>
									)}
								/>
							</div>

							<div>
								<label>Material: </label>
								<Field type="text" id="material" name="material" />
								<ErrorMessage
									name="material"
									component={() => (
										<div className={styles.error}>{errors.material}</div>
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

							<div>
								<label htmlFor="stock">Stock: </label>
								<Field type="number" id="stock" name="stock" />
								<ErrorMessage
								name="stock"
								component={() => (
								<div className={styles.error}>{errors.stock}</div>
								)}
								/>
							</div>
							<button type="submit">Añadir</button>
							{sentForm && (
								<p className={styles.exito}>
									¡El producto se ha añadido exitosamente!
								</p>
							)}
						</Form>
					)}
				</Formik>
			</div>
		</Fragment>
	);
}



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
