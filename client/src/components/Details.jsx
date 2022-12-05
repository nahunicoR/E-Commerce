import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions";
import { Link, useParams } from "react-router-dom";
import Loading from '../components/Loading';
import styles from './Details.module.css'


export default function Details(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [Loading, setLoading] = useState(true);


	const productId = useSelector((state) => state.products.productsDetail);
	console.log("product id");

	useEffect(() => {
		dispatch(getDetails(id));
	}, [dispatch, id]);

  return (
    <div>
      {productId.length === 0 ? (
        <div className={styles.detailPage}>
          (<Loading setLoading={setLoading} />)
        </div>
      ) : (
        <div className={styles.detailCardContainer} >
          <div className={styles.container}>
            <div className={styles.detailPage}>
              <h1>{productId.title}</h1>
            </div>
            <div>
              <img src={productId.image} alt="Imagen Producto" />
            </div>
            <div>
              <p>
                <strong>Descripción: </strong>
                {productId.description}
              </p>
              <p>
                <strong>Precio: </strong>
                {productId.price}
              </p>
              <p>
                <strong>Categoría: </strong>
                {productId.category}
              </p>
            </div>
          </div>
          <Link to="/home">
            <button>Volver</button>
          </Link>
        </div>
      )}
    </div>
  );
}