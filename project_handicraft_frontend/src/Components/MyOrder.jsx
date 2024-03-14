import React, { useEffect } from "react";
import { request } from "./Axios_helper";
import MyNavBar from "./MyNavBar";
import { Card, Button, Form, Modal, Image } from "react-bootstrap";
import { successToastify } from "./toastify";

function MyOrder() {
  const [myAddress, setMyAddress] = React.useState([]);
  const [show, setShow] = React.useState(false);

  const [newAddress, setNewAddress] = React.useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [cartDetails, setCartDetails] = React.useState([]);
  const [productDetails, setProductDetails] = React.useState([]);
  // eslint-disable-next-line
  const [imageData, setImageData] = React.useState([]);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    cartDetails.forEach((item) => fetchProductDetails(item.productId));
    // eslint-disable-next-line
  }, [cartDetails]);

  useEffect(() => {
    fetchData(); // Initial fetch
  }, []);

  const fetchData = () => {
    request(
      "GET",
      "/address/MyAddress",
      "application/json",
      {},
      "application/json"
    ).then((response) => {
      setMyAddress(JSON.parse(response.data));
      console.log(JSON.parse(response.data));
    });
  };

  const deleteAddress = (id) => {
    request(
      "DELETE",
      "/address/delete/" + id,
      "application/json",
      {},
      "application/json"
    ).then((response) => {
      console.log(response);
      successToastify(response.data);
      // Call fetchData again after successful deletion to update the addresses
      fetchData();
    });
  };

  const onChangeHandleForNewAddress = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onUploadHandler = () => {
    request(
      "POST",
      "address/save",
      "application/json",
      {
        address: newAddress.address,
        city: newAddress.city,
        state: newAddress.state,
        country: newAddress.country,
        postalCode: newAddress.postalCode,
        phoneNumber: newAddress.phoneNumber,
      },
      "application/json"
    ).then((response) => {
      console.log(response);
      successToastify(response.data);
      fetchData();
    });
    handleClose();
  };

  const fetchOrderDetails = async () => {
    try {
      const response = await request(
        "get",
        "order/myOrders",
        "application/json",
        {},
        "application/json"
      );
      setCartDetails(JSON.parse(response.data));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchProductDetails = async (productId) => {
    try {
      const response = await request(
        "GET",
        "product/fetch/" + productId,
        "application/json",
        {},
        "application/json"
      );
      const productData = JSON.parse(response.data);
      setProductDetails((prevState) => [...prevState, productData]);
      fetchImageUrls(productData.filename);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchImageUrls = async (filename) => {
    try {
      const response = await request(
        "GET",
        "product/productImage/" + filename,
        "application/json",
        {},
        "blob"
      );
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const imageDataValue = reader.result;
        const key = filename.split(".")[0];
        setImageData((prevState) => [...prevState, { key, imageDataValue }]);
      };
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  return (
    <>
      <MyNavBar />
      <Button variant="primary" onClick={handleShow} className="mx-3 my-3">
        Add New Address
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Your New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Village</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter Village Name"
                onChange={onChangeHandleForNewAddress}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter City"
                onChange={onChangeHandleForNewAddress}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                placeholder="Enter State"
                onChange={onChangeHandleForNewAddress}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter Country"
                onChange={onChangeHandleForNewAddress}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                placeholder="Enter Postal Code"
                onChange={onChangeHandleForNewAddress}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                name="phoneNumber"
                placeholder="Enter Contact Number"
                onChange={onChangeHandleForNewAddress}
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={onUploadHandler}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex">
        {myAddress.map((address) => {
          return (
            <Card
              style={{
                width: "18rem",
                color: "aliceblue",
                backgroundColor: "#533928a5",
              }}
              key={address.id}
              className="mx-3 my-3"
            >
              <Card.Body>
                <Card.Text>Village : {address.address}</Card.Text>
                <Card.Text>City : {address.city}</Card.Text>
                <Card.Text>State : {address.state}</Card.Text>
                <Card.Text>Country : {address.country}</Card.Text>
                <Card.Text>Postal Code : {address.postalCode}</Card.Text>
                <Card.Text>Contact Number : {address.phoneNumber}</Card.Text>
                <Button
                  variant="warning"
                  onClick={(props) => deleteAddress(address.id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <div className="d-flex" style={{ flexWrap: "wrap" }}>
        {cartDetails.map((item) => {
          return (
            <div key={item._id}>
              <Card
                className="mx-3 my-3"
                key={item.productId}
                style={{
                  width: "20rem",
                  color: "aliceblue",
                  backgroundImage:
                    "linear-gradient(90deg, rgba(2,0,36,0.7) 0%, rgba(9,9,121,0.7) 35%, rgba(0,212,255,0.7) 100%)",
                  textAlign: "center",
                }}
              >
                <Card.Body>
                  <Image
                    src={
                      Array.from(imageData)
                        .filter(
                          (item1) =>
                            item1.key ===
                            productDetails
                              .filter(
                                (item1) => item1.productId === item.productId
                              )
                              .map((item1) => item1.filename.split(".")[0])[0]
                        )
                        .map((item1) => item1.imageDataValue)[0]
                    }
                    thumbnail
                    width={100}
                    height={100}
                  />
                  <span className="mx-3" style={{ color: "aliceblue" }}>
                    {
                      productDetails
                        .filter((item1) => item1.productId === item.productId)
                        .map((item1) => item1.productName)[0]
                    }
                  </span>
                  <span className="mx-3" style={{ color: "aliceblue" }}>
                    &#8377;
                    {item.price}
                  </span>
                  <span className="mx-3" style={{ color: "aliceblue" }}>
                    {item.status}
                  </span>
                  <br />
                  <span className="mx-3" style={{ color: "aliceblue" }}>
                    {item.paymentStatus}
                  </span>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default MyOrder;
