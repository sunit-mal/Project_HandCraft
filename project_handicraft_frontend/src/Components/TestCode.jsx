import React from "react";
import { data } from "../DemoData/DataSet";
import { Card, Button } from "react-bootstrap";
import MyNavBar from "./MyNavBar";

function TestCode() {
  let catagories = [];
  data.map((item) => {
    var temp = item.catagories.split(",").map((i) => i.trim());
    temp.map((i) => {
      if (!catagories.includes(i)) {
        catagories.push(i);
      }
      return catagories;
    });
    return catagories;
  });

  return (
    <>
    <MyNavBar />
      {catagories.map((types) => (
        <>
          <hr className="my-3 mx-3" style={{ width: "60%" }} />
          <p
            className="h5 mx-3 my-3"
            style={{ color: "gray", fontSize: "26px" }}
          >
            {types}
          </p>
          <hr className="my-3 mx-3" style={{ width: "60%" }} />
          <div className="d-flex flex-row flex-wrap">
            {data.map((item) => (
              <>
                {item.catagories.includes(types) ? (
                  <a href={"/productDetails/" + item.id} style={{textDecoration:"none", color:"black"}}>
                    <Card
                      style={{ width: "18rem"}}
                      key={item.id}
                      className="my-3 mx-3"
                    >
                      <Card.Img variant="top" src={item.image} height={"300rem"}/>
                      <Card.Body>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Text>{item.catagories}</Card.Text>
                        <Button variant="primary">Add To Cart</Button>
                      </Card.Body>
                    </Card>
                  </a>
                ) : null}
              </>
            ))}
          </div>
        </>
      ))}
    </>
  );
}

export default TestCode;