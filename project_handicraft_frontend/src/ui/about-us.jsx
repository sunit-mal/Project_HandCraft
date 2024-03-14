import React from "react";
import CreditIcon from "../DemoData/cradit.jpeg"
// components
import Container from "./container";
import styles from "../styles/styles-ui.module.css";

const AboutUs = () => {
  return (
    <section>
      <Container>
        <div className={styles.aboutUs}>
          <div className={styles.aboutUsImage}>
            <img
              src={CreditIcon}
              alt=""
              style={{boxShadow:"0 0 15px 5px rgba(0, 0, 0, 0.5)"}}
            />
          </div>
          <div className={styles.aboutUsContent}>
            <h2>About Us</h2>
            <p className={styles.aboutUsDescription}>
              India has a very rich and diversified culture. Every state in
              India shows a different culture in terms of language, food,
              clothes, and of course their arts. Analysing the arts, we clearly
              observe that even though the fundamentals are same, details are
              very different. That's the principal identify of each and every
              states and their arts.We, RetroCraftt, as a community trying to
              emphasize on the details of the art from each place detailing as
              much as possible about the art and the artists. 
              We are
              establishing a direct connection between the artists and aesthetes
              like you so that they can buy those arts by paying them directly.
              Because we believe the biggest appreciation an artist can get is
              getting proper value for his creation, which is not the case in
              most of India's rural areas.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutUs;
