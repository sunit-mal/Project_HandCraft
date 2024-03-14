import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { request } from "./Axios_helper";
// import { value } from "../DemoData/DataSet";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";
import MyNavBar from "./MyNavBar";

function Product_Details() {
  const navigate = useNavigate();
  const id = parseInt(window.location.pathname.split("/")[2]);
  // eslint-disable-next-line
  const [responseData, setResponseData] = React.useState([]);
  // eslint-disable-next-line
  const [imageData, setImageData] = React.useState([]);

  React.useEffect(() => {
    request(
      "GET",
      "product/fetch/" + id,
      "application/json",
      {},
      "application/json"
    )
      .then((response) => {
        console.log(JSON.parse(response.data));
        let temp = JSON.parse(response.data);
        for (let i = 0; i < temp.length; i++) {
          fetchImageUrls(temp[i].filename);
        }
        setResponseData(JSON.parse(response.data));
        fetchImageUrls(JSON.parse(response.data).filename);
      })
      .catch((error) => {
        console.log(error);
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
            // let name = filenames.split(".")[0];
            // Convert blob to base64 string
            const blob = new Blob([response.data], {
              type: response.headers["content-type"],
            });
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
              // const imageValue = reader.result;
              setImageData(reader.result);
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

  const handleClick = (props) => {
    navigate(props);
  };

  return (
    <>
      <MyNavBar />
      <Container className="my-3 py-3">
        <Row>
          <Col xs={6} md={4}>
            {imageData === "" ? (
              <Skeleton height={300} width={300} />
            ) : (
              <Image src={imageData} thumbnail />
            )}
          </Col>
          <Col className="d-flex align-items-center blur-background" style={{color:"aliceblue", fontWeight:"600", }}>
            <figure className="text-center" style={{color:"aliceblue"}}>
              <blockquote className="blockquote">
                <p>{responseData.productName || <Skeleton width={300} />}</p>
              </blockquote>
              <figcaption className="blockquote-footer" style={{color:"aliceblue", fontSize:"20px", }}>
                <cite title="Source Title">
                  {responseData.description || (
                    <Skeleton count={6} width={300} />
                  )}
                </cite>
              </figcaption>
              <figcaption className="blockquote-footer" style={{color:"aliceblue"}}>
                <h2><span  className="priceTag">Price : &#8377;{responseData.price || <Skeleton />}</span></h2>
              </figcaption>
              <figcaption className="blockquote-footer " style={{color:"aliceblue", fontSize:"20px"}}>
                Catagories :
                {responseData.catagories
                  ? responseData.catagories.split(" ").map((item) => (
                      <span
                        onClick={(props) => handleClick("/catagories/" + item)}
                        style={{ color: "#0bd6ff", cursor: "pointer" }}
                      >
                        {" "}
                        #{item || <Skeleton />}
                      </span>
                    ))
                  : null}
              </figcaption>
            </figure>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Product_Details;
