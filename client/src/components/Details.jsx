import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails, removeDetails } from "../redux/actions";
import { Link, useParams } from "react-router-dom";
import Loading from "../components/Loading";

export default function productDetails(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const productId = useSelector((state) => state.details);
  console.log(beer);

  useEffect(() => {
    dispatch(removeDetails());
    dispatch(getDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {productId.length === 0 ? (
        <div>
          (<Loading setLoading={setLoading} />)
        </div>
      ) : (
        <div>
          <div>
            <div>
              <h1>{productId.name}</h1>
            </div>
            <div>
              <img src={productId.image} alt="" />
            </div>
            <div>
              <p>
                <strong>Description: </strong>
                {productId.description}
              </p>
              <p>
                <strong>Price: </strong>
                {productId.price}
              </p>
              <p>
                <strong>Stock: </strong>
                {productId.stock}
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