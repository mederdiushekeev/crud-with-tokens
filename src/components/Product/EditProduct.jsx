import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../../contexts/ProductContextProvider";

const EditProduct = () => {
  let navigate = useNavigate();
  const {
    getCategories,
    categories,
    createProduct,
    getOneProduct,
    oneProduct,
    updateProduct,
  } = useProduct();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    getCategories();
    getOneProduct(id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setTitle(oneProduct.title);
      setDescription(oneProduct.description);
      setPrice(oneProduct.price);
      setCategory(oneProduct.category.id);
      setImage(oneProduct.images);
    }
  }, [oneProduct]);

  function handleSave() {
    let newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("category", category);

    if (image) {
      newProduct.append("image", image);
    }

    updateProduct(id, newProduct);
  }

  return (
    <div className="d-flex flex-column w-50 m-auto">
      <h1 className="">Edit Product</h1>

      <p>CATEGORY BEFORE:{oneProduct?.category.title}</p>

      <select
        onChange={(e) => setCategory(e.target.value)}
        value={category}
        className="mb-3 p-2 rounded-pill border-info"
        name=""
        id=""
      >
        <option value="">choose category</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
      <input
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className="mb-3 rounded-pill p-2 border-info"
        type="text"
        placeholder="title"
      />
      <input
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className="mb-3 rounded-pill p-2 border-info"
        type="text"
        placeholder="description"
      />
      <input
        onChange={(e) => setPrice(e.target.value)}
        value={price}
        className="mb-3 rounded-pill p-2 border-info"
        type="text"
        placeholder="price"
      />

      <img width={200} src={oneProduct?.image} alt="" />

      <input
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        // value={image}
        className="mb-3 "
        type="file"
      />
      <button
        onClick={() => {
          handleSave();
          navigate("/products");
        }}
        className="bg-warning rounded-pill p-2"
      >
        Save Product
      </button>
    </div>
  );
};

export default EditProduct;
