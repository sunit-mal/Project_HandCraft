import React from "react";
import { Image, Card, Button, Form } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import MyNavBar from "./MyNavBar";
import { request } from "./Axios_helper";
import { errorToastify, successToastify } from "./toastify";
import Skeleton from "react-loading-skeleton";
import { useNavigate } from "react-router-dom";

function Item_Details() {
  // eslint-disable-next-line
  const [state, setState] = React.useState({
    id: "",
    name: "",
    quantity: "",
  });

  const navigate = useNavigate();
  // eslint-disable-next-line
  const [responseData, setResponseData] = React.useState([]);
  // eslint-disable-next-line
  const [imageData, setImageData] = React.useState([]);

  React.useEffect(() => {
    request(
      "GET",
      "product/myproduct",
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

  const handelClick = (props) => navigate(props);

  const onSearch = () => {
    responseData.forEach((item) => {
      if (item.productId.toString() === state.id) {
        setState((prevState) => ({
          ...prevState,
          name: item.productName,
          quantity: item.qualtity,
        }));
      } else {
        console.log();
      }
    });
    // console.log("After Searching " + state);
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "id") {
      setState(() => ({
        name: "",
        quantity: "",
      }));
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitHandler = () => {
    if (state.name === "" || state.quantity === "") {
      alert("Please fill all the details");
      return;
    }
    console.log(typeof state.quantity.toString());
    console.log(state);

    const formData = new FormData();
    // Append the data to the form data object
    formData.append("quantity", state.quantity.toString());

    request(
      "post",
      "product/quantityupdate/" + state.id,
      "form-data",
      formData,
      "json"
    ).then((response) => {
      if (response.status === 200) {
        successToastify("Quantity Updated Successfully");
        navigate("/");
      }
    });
  };

  // eslint-disable-next-line
  const onDeleteHandler = (props) => {
    request("delete", "product/delete/" + props, "application/json", {}, "json")
      .then((response) => {
        // console.log(response)
        successToastify(response.data);
        navigate("/")
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <MyNavBar />

      <div className="d-flex flex-row flex-wrap">
        <Card
          style={{
            width: "18rem",
            color: "aliceblue",
            backgroundColor: "#533928a5",
          }}
          className="my-3 mx-3 px-3 py-3"
        >
          <Card.Title className="ProtestRiot" style={{ fontSize: "30px" }}>
            Quantity Update
          </Card.Title>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Id</Form.Label>
              <div className="d-flex flex-row">
                <Form.Control
                  type="number"
                  name="id"
                  placeholder="Enter Product Id"
                  onChange={onChangeHandler}
                  required
                />
                <CiSearch onClick={onSearch} className="mx-2" size={25} />
              </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter Product Name"
                value={state.name}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                placeholder="Enter Quantity"
                value={state.quantity}
                onChange={onChangeHandler}
                required
              />
            </Form.Group>
            <Form.Group
              className="mb-3 my-3"
              controlId="exampleForm.ControlInput1"
            >
              <Button variant="primary" onClick={onSubmitHandler}>
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </div>

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
              <Card.Title>ID : {item.productId || <Skeleton />}</Card.Title>
              <Card.Title>{item.productName || <Skeleton />}</Card.Title>
              <Card.Text>
                {item.catagories.split(" ").map((type) => {
                  return (
                    <span
                      onClick={(props) => handelClick("/catagories/" + type)}
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
                <Button variant="primary" onClick={(props)=>onDeleteHandler(item.productId)}>Delete</Button>
                <Button
                  className="mx-3"
                  variant="primary"
                  onClick={(props) =>
                    handelClick("/productDetails/" + item.productId)
                  }
                >
                  View Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      
    </>
  );
}

export default Item_Details;
