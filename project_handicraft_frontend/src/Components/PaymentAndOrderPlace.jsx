import React, { useState, useEffect } from "react";
import MyNavBar from "./MyNavBar";
import { Button, Form, InputGroup, Card, CardTitle } from "react-bootstrap";
import { errorToastify, successToastify } from "./toastify";
import { RiVisaFill } from "react-icons/ri";
import { request } from "./Axios_helper";
import { useNavigate } from "react-router-dom";

function PaymentAndOrderPlace() {
  const navigate = useNavigate();
  const [address, setAddress] = useState([]);
  const [captcha, setCaptcha] = useState();
  const [price, setPrice] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [paymentMethod, setPaymentMethod] = useState({
    cashOnDelivery: false,
    card: false,
  });

  const [myAddress, setMyAddress] = React.useState([]);

  useEffect(() => {
    fetchData(); // Initial fetch
    fetchPrice();
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

  const fetchPrice = () => {
    request(
      "GET",
      "/order/totalPrice",
      "application/json",
      {},
      "application/json"
    ).then((response) => {
      setPrice(response.data);
      console.log(JSON.parse(response.data));
    });
  };

  const onAddressChanges = (event) => {
    setAddress(event.target.value);
  };

  const COD = () => {
    setPaymentMethod({ cashOnDelivery: true, card: false });
    generateCaptcha();
  };
  const PayByCard = () => {
    setPaymentMethod({ cashOnDelivery: false, card: true });
    errorToastify("Card payment is not available at the moment.");
  };
  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    const captcha = `${num1} + ${num2}`;
    setCaptcha(captcha);
  };
  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };
  const handleSubmit = () => {
    // eslint-disable-next-line no-eval
    let value = eval(captcha);
    if (userInput.toString() === value.toString()) {
      successToastify("Captcha verified. Proceed with order placement.");
      console.log("Captcha verified. Proceed with order placement.");
      setTimeout(() => {
        placeOrder();
      }, 500);
    } else {
      errorToastify("Captcha verification failed. Please try again.");
      console.log("Captcha verification failed. Please try again.");
    }
  };

  const placeOrder = async () => {
    let payment = "COD";
    console.log(address);
    if (
      address.length !== 0 &&
      address !== "" &&
      address !== undefined &&
      address !== null
    ) {
      const fromData = new FormData();
      fromData.append("addressId", address);
      fromData.append("paymentMode", payment);
      await request(
        "POST",
        "/order/placeOrder",
        "form-data",
        fromData,
        "application/json"
      ).then((response) => {
        console.log(response);
        if (response.status === 200) {
          navigate("/");
          successToastify("Order placed successfully");
        } else {
          errorToastify(response.data);
        }
      });
    } else {
      errorToastify("Please select an address");
    }
  };

  return (
    <>
      <MyNavBar />
      <div className="paymentBody px-3 py-3">
        <div className="addresses">
          <h4>SELECT ADDRESS</h4>
          {/* Address options */}

          {myAddress.map((address) => {
            return (
              <>
                <div key={address.id}>
                  <input
                    type="radio"
                    name="address"
                    className="addressCheck"
                    value={address.id}
                    onChange={onAddressChanges}
                  />
                  <span className="mx-3 my-3 py-3">
                    Village : {address.address}
                  </span>
                  <span className="mx-3 my-3 py-3">City : {address.city}</span>
                  <span className="mx-3 my-3 py-3">
                    State : {address.state}
                  </span>
                  <span className="mx-3 my-3 py-3">
                    Country : {address.country}
                  </span>
                  <span className="mx-3 my-3 py-3">
                    Postal Code : {address.postalCode}
                  </span>
                  <span className="mx-3 my-3 py-3">
                    Contact Number : {address.phoneNumber}
                  </span>
                </div>
                <hr />
              </>
            );
          })}

          {/* <Button variant="primary" className="mx-3" onClick={addressFetch}>
            Submit
          </Button> */}
        </div>
        <hr />
        <div className="payment" style={{ textAlign: "center" }}>
          <h4>PAYMENT</h4>
          <h5>Total Amount : &#8377;{price}</h5>
          <Button variant="info" className="mx-3 my-3 md-3" onClick={COD}>
            Cash on Delivery
          </Button>{" "}
          <br />
          {paymentMethod.cashOnDelivery ? (
            <>
              <h5>Enter the captcha</h5>
              <div
                style={{ textAlign: "center", justifyContent: "center" }}
                className="d-flex"
              >
                <div class="input-group mb-3" style={{ width: "20rem" }}>
                  <span class="input-group-text" id="basic-addon1">
                    {captcha}
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    name="captchaInput"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button variant="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </>
          ) : null}
          <br />
          <Button variant="info" className="mx-3 my-3 md-3" onClick={PayByCard}>
            CARD
          </Button>
          {paymentMethod.card ? (
            <>
              <div
                style={{ textAlign: "center", justifyContent: "center" }}
                className="d-flex"
              >
                <Card
                  style={{
                    width: "25rem",
                    backgroundImage:
                      "linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)",
                    border: "none",
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                  }}
                  className="py-2"
                >
                  <CardTitle>Card Details</CardTitle>
                  <Card.Body>
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        Card Number
                      </InputGroup.Text>
                      <Form.Control
                        id="cardNumber"
                        aria-describedby="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                        placeholder="1234 5678 9101 1121"
                      />
                      <RiVisaFill className="mx-2" size={35} />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        Card Holder
                      </InputGroup.Text>
                      <Form.Control
                        id="cardHolder"
                        aria-describedby="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                        placeholder="MR. A B C"
                      />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <InputGroup.Text
                        id="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        Expiry Date
                      </InputGroup.Text>
                      <Form.Control
                        id="expiryDate"
                        aria-describedby="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                        placeholder="11/89"
                      />
                      <InputGroup.Text
                        id="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                      >
                        CVV
                      </InputGroup.Text>
                      <Form.Control
                        id="cardNumber"
                        aria-describedby="basic-addon3"
                        style={{
                          backgroundColor: "transparent",
                        }}
                        placeholder="123"
                      />
                    </InputGroup>
                  </Card.Body>
                </Card>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default PaymentAndOrderPlace;
