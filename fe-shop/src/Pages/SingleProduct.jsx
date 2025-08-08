import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function SingleProduct() {
  const [product, setProduct] = useState({});
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:30/api/product/${params._id}`)
      .then((res) => res.json())
      .then((product) => setProduct(product));
  }, [params._id]);

  const handleSubmit = () => {
    navigate('/products')
  }

  return (
    <div>
      <button className="border border-black mx-4 px-2 hover:bg-black hover:text-white" onClick={handleSubmit}>Back</button>
      <div className="shadow-md bg-white rounded-lg border flex flex-col w-1/2 mx-auto">
        <div>
          <img
            src={product.image}
            alt=""
            className="object-cover w-full rounded-t-lg"
          />
          <div className="flex flex-col mx-2 my-4 ">
            <h5 className="font-semibold text-xl">Cultivar</h5>
            <span>
              {product.cultivar}
            </span>
            <h5 className="font-bold text-xl">Location</h5>
            <span>
              {product.location}
            </span>
            <div className="flex justify-between items-center">
              <span className="bg-gray-500 text-white  px-1 rounded-lg">
                Price - <i>{product.price}</i>
              </span>
              <button className="bg-blue-700 text-white px-5 text-center rounded-lg">
                ADD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProduct;
