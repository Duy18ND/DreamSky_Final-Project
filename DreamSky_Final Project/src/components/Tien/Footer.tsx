// src/components/WomensDay.tsx
import React, { useEffect, useRef, useState } from "react";
import "./CSS/footer.css";
import { X } from 'lucide-react';
const Footer: React.FC = () => {
  //nâng thẻ khi hơ chuột 
  const [isCardHovered, setIsCardHovered] = useState(false);
  //xác định popup đang mở/đóng 
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  //chứa chữ gõ ra
  const [titleText, setTitleText] = useState("");
  const [contentText, setContentText] = useState("");



  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fullTitle = " Kính thưa quý thầy cô và toàn thể mọi người!";
  const fullContent =
    " Qua câu chuyện về những người thầy, người cô nơi vùng cao, vùng khó khăn, chúng ta càng thấy rõ hơn ý nghĩa thiêng liêng của nghề giáo. Dù điều kiện thiếu thốn, dù gian nan vất vả, các thầy cô vẫn thắp lên những ngọn lửa tri thức, mở lối tương lai cho bao thế hệ học trò. Nhân ngày Nhà giáo Việt Nam 20/11, xin kính chúc quý thầy cô luôn mạnh khỏe, giữ mãi nhiệt huyết và tiếp tục là những người truyền cảm hứng tuyệt vời nhất. Chúng em xin chân thành cảm ơn! ";

  const [showCats, setShowCats] = useState(false);
  const footerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShowCats(true);   // ảnh bay vào
        } else {
          setShowCats(false);  // ảnh bay ra
        }
      },
      { threshold: 0.6 }
    );

    if (footerRef.current) observer.observe(footerRef.current);

    return () => {
      if (footerRef.current) observer.unobserve(footerRef.current);
    };
  }, []);



  // Hiệu ứng gõ chữ khi popup mở
  useEffect(() => {
    if (!isPopupOpen) return;

    let titleIndex = 0;
    let contentIndex = 0;
    let titleTimeout: number | undefined;
    let contentTimeout: number | undefined;

    const typeContent = () => {
      if (contentIndex < fullContent.length - 1) {
        setContentText(prev => prev + fullContent[contentIndex]);
        contentIndex++;
        contentTimeout = window.setTimeout(typeContent, 50);
      }
    };

    const typeTitle = () => {
      if (titleIndex < fullTitle.length - 1) {
        setTitleText(prev => prev + fullTitle[titleIndex]);
        titleIndex++;
        titleTimeout = window.setTimeout(typeTitle, 100);
      } else {
        contentTimeout = window.setTimeout(typeContent, 50);
      }
    };

    setTitleText("");
    setContentText("");

    setTimeout(() => {
      typeTitle();
    }, 0);

    return () => {
      if (titleTimeout) clearTimeout(titleTimeout);
      if (contentTimeout) clearTimeout(contentTimeout);
    };
  }, [isPopupOpen]);



  const handleCardClick = () => {
    setIsPopupOpen(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(err => {
        console.log("Loi phat nhac", err);

      })
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTitleText("");
    setContentText("");
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div id="castle" ref={footerRef}>
      <div className="letter">
        <div
          className="valentines"
          onMouseEnter={() => setIsCardHovered(true)}
          onMouseLeave={() => setIsCardHovered(false)}
          onClick={handleCardClick}
        >
          <div className="envelope"></div>
          <div className="front"></div>
          <div className={`card ${isCardHovered ? "card--up" : ""}`}>
            <div className="text">
              Happy
              <br /> Teacher's
              <br /> Day!
            </div>
            <div className="heart"></div>
          </div>
          <div className="hearts">
            <div className="one"></div>
            <div className="two"></div>
            <div className="three"></div>
            <div className="four"></div>
            <div className="five"></div>
          </div>
        </div>
        <audio ref={audioRef} src="public/audio/nhacThu.mp3" preload="auto"></audio>
        <div className="shadow"></div>
      </div>

      {/* Popup thư */}
      <div className={`wrapperLetterForm ${isPopupOpen ? "show" : ""}`}>
        <div className="boxLetter">
          <i className="fa-solid fa-xmark" onClick={handleClosePopup}> <X /></i>
          <div className="formLetter">
            <div className="heartLetter">
              <div className="heartLetterItem"></div>
            </div>
            <div className="heartLetter">
              <div className="heartLetterItem"></div>
            </div>

            <div className="wrapperLetter">
              <div className="giftbox">
                <div>
                  <img src="public/image/thuKet.webp" alt="" className="anhThu" />
                </div>
                <div className="img">
                  <img src="public/image/heartAnimation.gif" alt="" />
                </div>
              </div>
              <div className="textLetter">
                <h2>{titleText}</h2>
                <p className="contentLetter">{contentText}</p>
                <div className="heartAnimation">
                  <img src="public/image/heartAnimation.gif" alt="Heart Animation" />
                </div>
              </div>
              <div className="mewmew1">
                <img src="public/image/mewmew.gif" alt="Mew mew left" />
              </div>
              <div className="mewmew2">
                <img src="public/image/mewmew.gif" alt="Mew mew right" />
              </div>
            </div>
          </div>
          <div className="before"></div>
        </div>
      </div>

      <div className={`trai ${showCats ? "trai-show" : "trai-hide"}`}>
        <img src="public/image/anhCoGiao.png" alt="" />
      </div>

      <div className={`phai ${showCats ? "phai-show" : "phai-hide"}`}>
        <img src="public/image/thayGiao1-removebg-preview.png" alt="" />
      </div>

    </div>
  );
};

export default Footer;
