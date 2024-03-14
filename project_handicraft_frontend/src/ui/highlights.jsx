import React from "react";

// styles
import styles from "../styles/styles-ui.module.css";
// components
import { FaShippingFast } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { AiOutlineTransaction } from "react-icons/ai";
import Container from "./container";

const data = [
  {
    id: 1,
    icon: <FaShippingFast />,
    title: "Fast Delivery",
  },
  {
    id: 2,
    icon: <RiCustomerService2Fill />,
    title: "Customer Service",
  },
  {
    id: 3,
    icon: <AiOutlineTransaction />,
    title: "Secure Transactions",
  },
];

const Highlights = () => {



  return (
    <section>
      <Container>
        <div className={styles.highlights}>
          {data.map((item) => {
            return (
              <article key={item.id} className={styles.highlight}>
                {item.icon}
                <h3>{item.title}</h3>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Highlights;
