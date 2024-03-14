import React, { useEffect } from "react";
import MyNavBar from "./MyNavBar";
import { request } from "./Axios_helper";
import { Button, Card, Image } from "react-bootstrap";
import DeliveryAddress from "./DeliveryAddress";

function OrderDetails() {
  // const navigate = useNavigate();
  const [cartDetails, setCartDetails] = React.useState([]);
  const [productDetails, setProductDetails] = React.useState([]);
  // eslint-disable-next-line
  const [imageData, setImageData] = React.useState([]);
  const [selectedOrderId, setSelectedOrderId] = React.useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
    cartDetails.forEach((item) => fetchProductDetails(item.productId));
    // eslint-disable-next-line
  }, [cartDetails]);

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
    const key = filename.split(".")[0];
    console.log("key : ", key);
    console.log(imageData.some((item) => item.key === key) === false);

    if (imageData.some((item) => item.key === key) === false) {
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
          setImageData((prevState) => [...prevState, { key, imageDataValue }]);
        };
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    }
  };

  const updateStatus = (props) => {
    console.log(props);

    const formData = new FormData();
    formData.append("status", "Delivered");
    // console.log(props[0])
    request(
      "post",
      "/order/statusUpdate/" + props,
      "form-data",
      formData,
      "application/json"
    ).then((response) => {
      if (response.status === 200) {
        // navigate("/");
        setCartDetails((prevCartDetails) =>
          prevCartDetails.map((item) =>
            item.id === props ? { ...item, status: "Delivered" } : item
          )
        );
      }
      console.log(response.data);
    });
  };

  const handleButtonClick = (props) => {
    // setShowModal(true);
    // return DeliveryAddress({ showModal, setShowModal, props });
    setSelectedOrderId(props); // Set the selected order ID to open the corresponding modal
  };

  return (
    <>
      <MyNavBar />
      <div style={{ textAlign: "center" }}>
        {cartDetails.map((item) => {
          return (
            <div key={item._id}>
              <Card
                className="mx-3 my-3"
                key={item.id}
                style={{
                  width: "70rem",
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
                  <span className="mx-3" style={{ color: "aliceblue" }}>
                    {item.paymentStatus}
                  </span>
                  <Button
                    variant="warning"
                    className="mx-3 my-3"
                    onClick={(props) => updateStatus(item.id)}
                  >
                    Delivered Done
                  </Button>
                  <Button
                    variant="warning"
                    className="mx-3 my-3"
                    onClick={(props) => handleButtonClick(item.orderId)} // Call function to handle modal opening
                  >
                    Delivery Address
                  </Button>
                  {selectedOrderId === item.orderId && (
                    <DeliveryAddress
                      showModal={true}
                      setShowModal={setSelectedOrderId}
                      orderId={item.orderId}
                    />
                  )}
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default OrderDetails;
