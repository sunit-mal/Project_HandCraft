import React from "react";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import styles from "../styles/styles-ui.module.css";

const Footer = () => {
  return (
    <footer
      className={styles.footer}
      style={{ backgroundColor: "transparent" }}
    >
      <h4>@2024 | All rights reserved | Made with </h4>
      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com/profile.php?id=100063970695663&mibextid=ZbWKwL" className={styles.socialIcon} target="_blank" rel="noreferrer">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.instagram.com/_retro.craft/?igsh=MWczbTB3dmQ0OHpzYQ%3D%3D" className={styles.socialIcon} target="_blank" rel="noreferrer">
          <AiFillInstagram size={20} />
        </a>
        <a href="https://wa.me/+919330704219" className={styles.socialIcon} target="_blank" rel="noreferrer">
          <IoLogoWhatsapp size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
