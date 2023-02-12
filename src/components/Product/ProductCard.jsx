import React from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContextProvider";

const ProductCard = ({ item }) => {
  const { deleteProduct } = useProduct();
  let navigate = useNavigate();
  return (
    <div>
      <img src={item.image} width="200" alt="image" />
      <h3>{item.title}</h3>
      <p>{item.price}</p>
      <p>{item.category.title}</p>
      <p>{item.description}</p>
      <p>{item.likes}</p>

      {item.is_author ? (
        <>
          <button onClick={() => navigate(`/edit/${item.id}`)}>Edit</button>
          <button onClick={() => deleteProduct(item.id)}>Delete</button>
        </>
      ) : null}
    </div>
  );
};

export default ProductCard;
