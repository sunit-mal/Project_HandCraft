import React from "react";
// components
import Container from "./container";
// styles
import styles from "../styles/styles-ui.module.css";
import img1 from "../DemoData/img (1).jpg";
import img2 from "../DemoData/img (2).jpg";
import img3 from "../DemoData/img (3).jpg";
import img4 from "../DemoData/img (4).jpg";

const data = [
  {
    id: 1,
    imageUrl: img1,
  },
  {
    id: 2,
    imageUrl: img2,
  },
  {
    id: 3,
    imageUrl: img3,
  },
  {
    id: 4,
    imageUrl: img4,
  },
];

const ProductGrid = () => {
  return (
    <section>
      <Container>
        <div className={styles.productGrid}>
          {data.map((item, id) => {
            return (
              <>
                <article key={item.id} className={styles.product}>
                  <img src={item.imageUrl} alt="" style={{height:"25rem", boxShadow:"0 0 15px 5px rgba(0, 0, 0, 0.5)" }} />
                </article>
              </>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default ProductGrid;
