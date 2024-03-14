import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import MyNavBar from "./MyNavBar";
import { MdNextPlan } from "react-icons/md";
import { request } from "./Axios_helper";
import { errorToastify, successToastify } from "./toastify";
import { useNavigate } from "react-router-dom";
import { formToJSON } from "axios";

function NewProductUpdate() {
  const navigate = useNavigate();
  const [uploadData, setUploadData] = React.useState({});

  const onChangeHandlerForNewData = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "image") {
      value = event.target.files[0];
    }
    setUploadData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onUploadHandler = () => {
    // if (
    //   uploadData.productName !== null &&
    //   uploadData.description !== null &&
    //   uploadData.price !== null &&
    //   uploadData.quantity !== null &&
    //   uploadData.Categories !== null &&
    //   uploadData.image !== null
    // ) {
    //   console.log(uploadData);
    //   errorToastify("Please fill all the details");
    //   return;
    // }

    const formData = new FormData();
    formData.append("productName", uploadData.productName);
    formData.append("description", uploadData.description);
    formData.append("price", uploadData.price);
    formData.append("quantity", uploadData.quantity);
    formData.append("Categories", uploadData.Categories);
    formData.append("image", uploadData.image);

    console.log(formToJSON(formData));
    request(
      "post",
      "/product/upload",
      "multipart/form-data",
      formData,
      "json"
    )
      .then((response) => {
        if (response.status === 200) {
          successToastify("Product Uploaded Successfully");
          navigate("/");
        } else {
          errorToastify(response.message);
        }
      })
      .catch((error) => {
        errorToastify(error.message);
        console.log(error);
      });
  };

  const uploadCatagories = () => {
    let catagories = document.getElementsByName("catagory")[0].value;
    catagories =
      catagories[0].toUpperCase() +
      catagories.slice(1, catagories.length).toLowerCase();
    const previousCatagories = uploadData.Categories;
    const newCatagories =
      previousCatagories === undefined
        ? catagories
        : previousCatagories + " " + catagories;
    setUploadData((prevState) => ({
      ...prevState,
      Categories: newCatagories,
    }));
  };

  return (
    <>
      <MyNavBar />
      {/* Update New Product */}
      <Card
        style={{
          width: "28rem",
          color: "aliceblue",
          backgroundColor: "#533928a5",
        }}
        className="my-3 mx-3 px-3 py-3"
      >
        <Card.Title className="ProtestRiot" style={{fontSize:"25px"}}>New Product Upload</Card.Title>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Upload Image</Form.Label>
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={onChangeHandlerForNewData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              placeholder="Enter Product Name"
              onChange={onChangeHandlerForNewData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="test"
              name="description"
              placeholder="Enter Description"
              onChange={onChangeHandlerForNewData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="number"
              name="quantity"
              placeholder="Enter Quantity"
              onChange={onChangeHandlerForNewData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              placeholder="Enter Price"
              onChange={onChangeHandlerForNewData}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Enter Categories</Form.Label>
            <div className="d-flex flex-row my-2">
              <Form.Control
                type="test"
                name="catagory"
                placeholder="Enter Categories"
                // onChange={onChangeHandlerForNewData}
                required
              />
              <MdNextPlan
                onClick={uploadCatagories}
                className="mx-2"
                size={25}
              />
            </div>
            <Form.Control
              type="test"
              name="Categories"
              placeholder={uploadData.Categories}
              onChange={onChangeHandlerForNewData}
              disabled
              required
            />
          </Form.Group>
          <Form.Group
            className="mb-3 my-3"
            controlId="exampleForm.ControlInput1"
          >
            <Button variant="primary" onClick={onUploadHandler}>
              Submit
            </Button>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
}

export default NewProductUpdate;
