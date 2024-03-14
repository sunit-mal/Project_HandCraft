import React, { useEffect, useState } from "react";
// import { FaArrowUp } from "react-icons/fa";
import { IoIosArrowDropupCircle } from "react-icons/io";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const goToBtn = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  const listenToScroll = () => {
    let heightToHidden = 20;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    if (winScroll > heightToHidden) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  return (
    <>
      {isVisible && (
       
          <IoIosArrowDropupCircle className="top-btn" onClick={goToBtn} />

      )}
    </>
  );
}

// const Wrapper = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: relative;
// `;

export default BackToTop;
