import React, { useEffect, useState } from "react";
import { useProduct } from "../../contexts/ProductContextProvider";

const AddProduct = () => {
  const { getCategories, categories, createProduct } = useProduct();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    getCategories();
  }, []);

  function handleSave() {
    let newProduct = new FormData();
    newProduct.append("title", title);
    newProduct.append("description", description);
    newProduct.append("price", price);
    newProduct.append("category", category);
    newProduct.append("image", image);

    createProduct(newProduct);
  }

  return (
    <div className="d-flex flex-column w-50 m-auto">
      <h1 className="">Add Product</h1>

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
      <input
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        // value={image}
        className="mb-3 "
        type="file"
      />
      <button
        onClick={() => handleSave()}
        className="bg-warning rounded-pill p-2"
      >
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
