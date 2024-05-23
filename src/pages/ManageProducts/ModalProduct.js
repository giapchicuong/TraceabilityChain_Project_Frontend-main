import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useStateContext } from "../../context/index";
import InputGroup from "react-bootstrap/InputGroup";
import { ethers } from "ethers";
import { toast } from "react-toastify";
const ModalProduct = ({ show, onHide }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createProduct } = useStateContext();
  const { address, getAllProductByOwner } = useStateContext();
  const formatDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // January is 0
    const yyyy = today.getFullYear();

    return `${dd}${mm}${yyyy}`;
  };

  const defaultInput = {
    userId: "1",
    name: "",
    description: "",
    typeProduct: "",
    date: formatDate(),
    price: "",
    image: "",
  };
  const defaultCheckInput = {
    name: true,
    description: true,
    typeProduct: true,
    price: true,
    image: true,
  };
  const [form, setForm] = useState(defaultInput);
  const [validInput, setValidInput] = useState(defaultCheckInput);

  const checkValidInput = () => {
    setValidInput(defaultCheckInput);
    const arr = ["name", "description", "typeProduct", "price", "image"];
    for (let i = 0; i < arr.length; i++) {
      setValidInput(defaultCheckInput);
      if (!form[arr[i]]) {
        toast.error(`${arr[i]} is required`);
        setValidInput({ ...defaultCheckInput, [arr[i]]: false });
        return false;
      }
    }
    if (isNaN(form.price) || form.price <= 0) {
      toast.error("Price must be a valid number greater than 0");
      setValidInput({ ...defaultCheckInput, price: false });
      return false;
    }
    const pricePattern = /^\d{1,3}(\.\d{3})*$/;
    if (!pricePattern.test(form.price)) {
      toast.error("Price must be in the format '30.000'");
      setValidInput({ ...defaultCheckInput, price: false });
      return false;
    }
    return true;
  };

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleAddProduct = async (e) => {
    try {
      e.preventDefault();
      const check = checkValidInput();
      if (check) {
        setIsLoading(true);
        await createProduct({
          ...form,
          userId: ethers.utils.parseUnits(form.userId, 10),
          price: ethers.utils.parseUnits(form.price, 18),
          date: ethers.utils.parseUnits(form.date, 18),
        });
        setIsLoading(false);
        setForm(defaultInput);
        onHide();
      }
    } catch (error) {
      toast.error("Error from blockchain");
    }
  };
  const handleClose = () => {
    onHide();
  };
  return (
    <>
      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Add Product</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Name"
                className={validInput.name ? "" : "is-invalid"}
                value={form.name}
                onChange={(e) => handleFormFieldChange("name", e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProductDes">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={10}
                placeholder="Product Description"
                className={validInput.description ? "" : "is-invalid"}
                value={form.description}
                onChange={(e) => handleFormFieldChange("description", e)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProductType">
              <Form.Label>Type Name</Form.Label>
              <Form.Select
                aria-label="Default select example"
                className={validInput.typeProduct ? "" : "is-invalid"}
                onChange={(e) => handleFormFieldChange("typeProduct", e)}
                value={form.typeProduct}
              >
                <option>Choose type of product</option>
                <option value="Fruit">Fruit</option>
                <option value="Fish meat and eggs">Fish meat and eggs</option>
                <option value="Vegetables and mushrooms">
                  Vegetables and mushrooms
                </option>
                <option value="Buttermilk">Buttermilk</option>
                <option value="Drinks">Drinks</option>
                <option value="Cakes and candies">Cakes and candies</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProductPrice">
              <Form.Label>Product Price</Form.Label>
              <InputGroup>
                <Form.Control
                  aria-label="Dollar amount (with dot and two decimal places)"
                  placeholder="30.000"
                  className={validInput.price ? "" : "is-invalid"}
                  value={form.price}
                  onChange={(e) => handleFormFieldChange("price", e)}
                />
                <InputGroup.Text>VNĐ</InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupProductImage">
              <Form.Label>Product Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Product Image"
                className={validInput.image ? "" : "is-invalid"}
                value={form.image}
                onChange={(e) => handleFormFieldChange("image", e)}
              />
            </Form.Group>
            {isLoading ? (
              <Button variant="secondary">Loading...</Button>
            ) : (
              <Button variant="primary" onClick={handleAddProduct}>
                Thêm
              </Button>
            )}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ModalProduct;
