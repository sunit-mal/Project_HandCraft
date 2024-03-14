import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import Home from "./Home";
import { ToastContainer } from "react-toastify";
// import MyNavBar from "./MyNavBar";
import ItemDetails from "./Item_Details";
import ProductDetails from "./Product_Details";
// import TestCode from "./TestCode";
import { SkeletonTheme } from "react-loading-skeleton";
import CatagorieFilter from "./CatagorieFilter";
import ImageSkeleton from "./ImageSkeleton";
import BackToTop from "./BackToTop";
import NewProductUpdate from "./NewProductUpdate";
import OrderDetails from "./OrderDetails";
import MyOrder from "./MyOrder";
import CardAndOrder from "./CardAndOrder";
import PaymentAndOrderPlace from "./PaymentAndOrderPlace";
import About from "./About";

function MainController() {
  return (
    <>
      {/* <MyNavBar /> */}
      <BackToTop />
      <SkeletonTheme color="#202020" highlightColor="#444">
        <Router>
          <Routes>
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/logout" element={<Logout />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/manageItems" element={<ItemDetails />} />
            <Route exact path="/addProduct" element={<NewProductUpdate />} />
            <Route exact path="/orderDetails" element={<OrderDetails />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
            <Route exact path="/cart" element={<CardAndOrder/>} />
            <Route exact path="/orderPlace" element={<PaymentAndOrderPlace/>} />
            <Route
              exact
              path="/productDetails/:id"
              element={<ProductDetails />}
            />
            <Route
              exact
              path="/catagories/:catagoriesType"
              element={<CatagorieFilter />}
            />
            <Route exact path="/test" element={<ImageSkeleton />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </SkeletonTheme>
      <ToastContainer />
    </>
  );
}

export default MainController;
