import React from "react";
import { request } from "./Axios_helper";

function DeliveryAddress({ showModal, setShowModal, orderId }) {
  // console.log(showModal, setShowModal, orderId);

  const [address, setAddress] = React.useState();

  React.useEffect(() => {
    request(
      "GET",
      "/order/orderAddress/" + orderId,
      "application/json",
      {},
      "application/json"
    ).then((response) => {
      setAddress(response.data);
    });
  }, [orderId]);

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden={!showModal}
      style={{ display: showModal ? "block" : "none", color: "black" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Delivery Address
            </h1>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">{address}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryAddress;
