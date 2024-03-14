import React, { useEffect } from "react";
import MyNavBar from "./MyNavBar";
import { request } from "./Axios_helper";
import { Button, Card, Image } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { successToastify } from "./toastify";

function CardAndOrder() {
  const navigate = useNavigate();
  const [cartDetails, setCartDetails] = React.useState([]);
  const [productDetails, setProductDetails] = React.useState([]);
  const [imageData, setImageData] = React.useState([]);
  const [quantity, setQuantity] = React.useState([]);
  // eslint-disable-next-line
  const [condition, setCondition] = React.useState(false);

  useEffect(() => {
    fetchCartDetails();
  }, []);

  useEffect(() => {
    // Fetch product details for each item in cartDetails
    cartDetails.forEach((item) => fetchProductDetails(item.productId));
    // eslint-disable-next-line
  }, [cartDetails]);

  useEffect(() => {
    // Log productDetails after it's been updated
    console.log(productDetails);
    console.log(imageData);
    // eslint-disable-next-line
  }, [productDetails]);

  //eslint-disable-next-line
  const loadPage = () => {
    fetchCartDetails();
    cartDetails.forEach((item) => fetchProductDetails(item.productId));
  };

  const fetchCartDetails = async () => {
    try {
      const response = await request(
        "get",
        "cart/details",
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

  const onChangeQuantity = (event) => {
    const productId = event.target.name;
    const quantity = event.target.value;
    setQuantity((prevState) => ({ ...prevState, [productId]: quantity }));
  };

  const buyNow = () => {
    productDetails.forEach((item) => {
      const productId = item.productId;
      const quantity = document.getElementsByName(productId)[0].value;

      if (quantity > item.qualtity) {
        console.log(quantity > item.qualtity);
        console.log(quantity, " ", item.qualtity);
        console.error("Quantity is greater than ", quantity);
        setCondition(true);
        // console.log(condition);
      }
    });
    placeOrder();
  };

  const placeOrder = async () => {
    // console.log(quantity);
    for (const key in quantity) {
      // console.log(key, " ", quantity[key]);
      // eslint-disable-next-line
      const response = await request(
        "POST",
        "cart/update",
        "application/json",
        {
          id: key,
          quantity: quantity[key],
        },
        "application/json"
      ).then((response) => {
        console.log(response);
      });
    }
    navigate("/orderPlace");
  };

  const deleteProduct = async (props) => {
    request(
      "delete",
      "cart/delete/" + props,
      "application/json",
      {},
      "application/json"
    ).then((response) => {
      successToastify(response.data);
      // loadPage();
      navigate("/")
    });
  };

  return (
    <>
      <MyNavBar />
      {productDetails.length !== 0 ? (
        <>
          <div>
            {productDetails.map((item) => (
              <Card
                className="mx-3 my-3"
                key={item.productId}
                style={{
                  width: "60rem",
                  color: "aliceblue",
                  backgroundColor: "#533928a5",
                }}
              >
                <Card.Body>
                  <Image
                    src={Array.from(imageData)
                      .filter(
                        (item1) => item1.key === item.filename.split(".")[0]
                      )
                      .map((item1) => item1.imageDataValue)}
                    thumbnail
                    width={100}
                    height={100}
                  />
                  <span className="mx-3">{item.productName}</span>
                  <span className="mx-3"> &#8377;{item.price}/piece</span>
                  <input
                    className={"tooltips" + item.productId}
                    type="number"
                    name={item.productId}
                    minLength={0}
                    maxLength={item.qualtity}
                    onChange={onChangeQuantity}
                    placeholder="Quantity"
                    style={{
                      textAlign: "center",
                      backgroundColor: "transparent",
                      color: "aliceblue",
                    }}
                  />
                  <Button
                    variant="warning"
                    className="mx-3 my-3"
                    onClick={(props) => deleteProduct(item.productId)}
                  >
                    Delete Product
                  </Button>
                </Card.Body>
                <Tooltip
                  anchorSelect={".tooltips" + item.productId}
                  place="right"
                >
                  number between 0 and {item.qualtity}
                </Tooltip>
              </Card>
            ))}
          </div>
          <Button variant="primary" className="mx-3 my-3" onClick={buyNow}>
            Buy Now
          </Button>
        </>
      ) : (
        <Button
          variant="info"
          className="mx-3 my-3"
          onClick={() => navigate("/")}
        >
          Shop Now
        </Button>
      )}
    </>
  );
}

export default CardAndOrder;
