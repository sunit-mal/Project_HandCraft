import React from "react";
import { successToastify } from "./toastify";
import MyNavBar from "./MyNavBar";
import GridLoader from "react-spinners/GridLoader";

function Logout() {
  const logout = () => {
    window.localStorage.removeItem("user_details");
    window.localStorage.removeItem("auth_header");
    window.localStorage.removeItem("auth_token");
  };

  React.useEffect(() => {
    logout();
  }, []);

  successToastify("Logout Successfully");

  setTimeout(() => {
    window.location.href = "/";
  }, 2000);

  return (
    <>
      <MyNavBar />
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "90vh" }}
        >
          <GridLoader
            color="#ffffff"
            size={60}
            speedMultiplier={1}
          />
        </div>
      </div>
    </>
  );
}

export default Logout;
