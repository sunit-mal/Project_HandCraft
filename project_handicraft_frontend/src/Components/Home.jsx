import React from "react";
import { request } from "./Axios_helper";
// eslint-disable-next-line
import { Image, Card, Button } from "react-bootstrap";
import { errorToastify, successToastify } from "./toastify";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import MyNavBar from "./MyNavBar";
import ImageSkeleton from "./ImageSkeleton";

function Home() {
  const navigate = useNavigate();
  // eslint-disable-next-line
  const [responseData, setResponseData] = React.useState([]);
  // eslint-disable-next-line
  const [imageData, setImageData] = React.useState([]);
  const [authStatus, setAuthStatus] = React.useState(true);

  React.useEffect(() => {
    request(
      "GET",
      "product/fetchall",
      "application/json",
      {},
      "application/json"
    )
      .then((response) => {
        // console.log(JSON.parse(response.data));
        let temp = JSON.parse(response.data);
        for (let i = 0; i < temp.length; i++) {
          fetchImageUrls(temp[i].filename);
        }
        setResponseData(JSON.parse(response.data));
        fetchImageUrls(JSON.parse(response.data).filename);
      })
      .catch((error) => {
        // console.log("error is",error);
        if (error.response.status === 401) {
          setAuthStatus(false);
          errorToastify("Please login to continue");
        }
      });
    // eslint-disable-next-line
  }, []);

  const fetchImageUrls = async (filenames) => {
    try {
      // eslint-disable-next-line
      const imageValue = await Promise.all(
        [
          request(
            "GET",
            "product/productImage/" + filenames,
            "application/json",
            {},
            "blob"
          ).then((response) => {
            let name = filenames.split(".")[0];
            // Convert blob to base64 string
            const blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              // let dataMap = new Map();
              // dataMap.set(name, reader.result);
              const imageValue = reader.result;
              const key = name;
              const data = { key, imageValue };

              setImageData((prevState) => [...prevState, data]);
            };
          }),
        ].map((promise) =>
          promise.catch((error) => {
            console.error("Error fetching image:", error);
            return null;
          })
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (props) => {
    const auth_token = window.localStorage.getItem("auth_token");
    if (auth_token === null || auth_token === "") {
      navigate("/login");
    }
    request(
      "POST",
      "cart/add",
      "application/json",
      {
        productId: props,
      },
      "application/json"
    )
      .then((response) => {
        successToastify(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleProductDetails = (props) => navigate("/productDetails/" + props);

  const handleCatagoriesFilter = (props) => navigate("/catagories/" + props);

  console.log(authStatus);

  return (
    <>
      <MyNavBar />
      {authStatus === false ? (
        <ImageSkeleton />
      ) : (
        <div className="d-flex align-items-start flex-wrap" fluid>
          {responseData.map((item) => (
            <Card
              className="mb-3 mx-3 my-3"
              style={{
                width: "20rem",
                height: "36rem",
                backgroundColor: "#533928a5",
                color: "aliceblue",
              }}
            >
              <Image
                className="mx-auto my-2"
                src={Array.from(imageData)
                  .filter((item1) => item1.key === item.filename.split(".")[0])
                  .map((item1) => item1.imageValue)}
                style={{ width: "277px", height: "262px" }}
                rounded
              />
              <Card.Body>
                <Card.Title>{item.productName || <Skeleton />}</Card.Title>
                <Card.Text>
                  {item.catagories.split(" ").map((type) => {
                    return (
                      <span
                        onClick={(props) => handleCatagoriesFilter(type)}
                        style={{ color: "#0bd6ff", cursor: "pointer" }}
                      >
                        {" "}
                        #{type || <Skeleton />}
                      </span>
                    );
                  })}
                </Card.Text>
                <Card.Text style={{ height: "72px" }}>
                  {item.description.split(" ").slice(0, 10).join(" ")}
                  {item.description.split(" ").length > 10 && "..."}
                </Card.Text>
                <Card.Text>&#8377;{item.price}</Card.Text>
                {/* {item.qualtity} */}
                <div>
                  <Button
                    variant="primary"
                    onClick={(props) => addToCart(item.productId)}
                  >
                    Add To Cart
                  </Button>
                  <Button
                    className="mx-3"
                    variant="primary"
                    onClick={(props) => handleProductDetails(item.productId)}
                  >
                    View Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;
