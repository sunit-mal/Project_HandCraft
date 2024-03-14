import React from "react";
import {
  // eslint-disable-next-line
  Button,
  Container,
  // eslint-disable-next-line
  Form,
  Nav,
  Navbar,
  NavbarText,
  NavDropdown,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line
import { request } from "./Axios_helper";
import logo from "../DemoData/logo.png";

function MyNavBar() {
  // eslint-disable-next-line
  const [suggestions, setSuggestions] = React.useState([]);
  const [authStatus, setAuthStatus] = React.useState(false);
  const [value, setValue] = React.useState("");

  // eslint-disable-next-line
  const onChange = (event) => {
    setValue(event.target.value);
  };
  // eslint-disable-next-line
  const onSearch = () => {
    console.log(value);
  };
  // eslint-disable-next-line
  const selectSearchValue = (event) => {
    setValue(event.target.innerText);
  };

  const [userDetails, setUserDetails] = React.useState({
    Name: "",
    Email: "",
    userName: "",
    userType: "",
  });

  React.useEffect(() => {
    const userDetailsString = window.localStorage.getItem("user_details");
    if (userDetailsString !== null) {
      const userDetail = JSON.parse(userDetailsString);
      setUserDetails({
        Name: userDetail.firstName + " " + userDetail.lastName,
        Email: userDetail.email,
        userName: userDetail.email,
        userType: userDetail.userType,
      });
      console.log(userDetail);
    }
  }, [userDetails.userName]);

  React.useEffect(() => {
    const authToken = window.localStorage.getItem("auth_token");
    if (authToken !== null) {
      setAuthStatus(true);
    }
  }, [userDetails.userName]);

  const navigate = useNavigate();
  const handelClick = (props) => {
    navigate(props);
  };

  return (
    <>
      <Navbar expand="lg" className="transparentBackground">
        <Container fluid>
          <Navbar.Brand>
            <img src={logo} alt="" style={{height:"4rem"}} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <NavbarText
                onClick={() => handelClick("/")}
                className="mx-3 pointerChange"
              >
                Home
              </NavbarText>
              {userDetails.userType === "Seller" ? (
                <>
                  <NavbarText
                    onClick={() => handelClick("/manageItems")}
                    className="mx-3 pointerChange"
                  >
                    Items Edit
                  </NavbarText>
                  <NavbarText
                    onClick={() => handelClick("/orderDetails")}
                    className="mx-3 pointerChange"
                  >
                    Order Details
                  </NavbarText>
                  <NavbarText
                    onClick={() => handelClick("/addProduct")}
                    className="mx-3 pointerChange"
                  >
                    Add Product
                  </NavbarText>
                </>
              ) : (
                <>
                  {authStatus ? (
                    <>
                      <NavbarText
                        onClick={() => handelClick("/myOrder")}
                        className="mx-3 pointerChange"
                      >
                        My Order
                      </NavbarText>
                      <NavbarText
                        onClick={() => handelClick("/cart")}
                        className="mx-3 pointerChange"
                      >
                        My Cart
                      </NavbarText>
                    </>
                  ) : null}
                </>
              )}
              <NavbarText
                onClick={() => handelClick("/about")}
                className="mx-3 pointerChange"
              >
                About Us
              </NavbarText>
              <NavDropdown
                title={!authStatus ? "Account" : userDetails.Name}
                id="navbarScrollingDropdown"
              >
                {!authStatus ? (
                  <>
                    <NavDropdown.Item
                      onClick={(props) => handelClick("/login")}
                    >
                      Login
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      onClick={(props) => handelClick("/register")}
                    >
                      Register
                    </NavDropdown.Item>
                  </>
                ) : (
                  <NavDropdown.Item onClick={(props) => handelClick("/logout")}>
                    Logout
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </Nav>
            {/* <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={value}
                onChange={onChange}
              />
              <div
                className="mydropdown position-absolute top-100"
                style={{ zIndex: "999" }}
              >
                {suggestions
                  .filter((suggestion) => {
                    const searchItem = value.toLowerCase();
                    const suggestionItem = suggestion.toLowerCase();
                    return searchItem && suggestionItem.startsWith(searchItem);
                  })
                  .map((suggestion) => (
                    <div
                      className="mydropdown-row px-3"
                      onClick={selectSearchValue}
                    >
                      {suggestion}
                    </div>
                  ))}
              </div>
              <Button variant="outline-success" onClick={onSearch}>
                Search
              </Button>
            </Form> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;
