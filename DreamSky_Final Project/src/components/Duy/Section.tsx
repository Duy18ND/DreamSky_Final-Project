import { useState, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import "./CSS/Section.css";

import TanTuy1 from '../../assets/Asset_Final/asset_Peopel/TanTuy1.webp'
import TanTuy2 from '../../assets/Asset_Final/asset_Peopel/TanTuy2.webp'
import YeuThuong1 from '../../assets/Asset_Final/asset_Peopel/YeuThuong1.webp'
import YeuThuong2 from '../../assets/Asset_Final/asset_Peopel/Yeuthuong2.webp'
import YeuThuong3 from '../../assets/Asset_Final/asset_Peopel/YeuThuong3.jpg'
import SuMenh1 from '../../assets/Asset_Final/asset_Peopel/SuMenh1.webp'
import SuMenh2 from '../../assets/Asset_Final/asset_Peopel/SuMenh2.jpg'
import SuMenh3 from '../../assets/Asset_Final/asset_Peopel/SuMenh3.jpg'
import HiSinh1 from '../../assets/Asset_Final/asset_Peopel/HiSinh1.webp'
import HiSinh2 from '../../assets/Asset_Final/asset_Peopel/HiSinh2.webp'
import HiSinh3 from '../../assets/Asset_Final/asset_Peopel/Hisinh3.jpg'
import HiSinh4 from '../../assets/Asset_Final/asset_Peopel/HiSinh4.jpg'

// =============================
// Interface
// =============================
interface StoryItem {
  imgSrc: string | string[];
  title: string;
  lines: string[];
}

// =============================
// Data
// =============================
const storyData: StoryItem[] = [
  {
    imgSrc: [TanTuy1, TanTuy2],
    title: "TẬN TỤY",
    lines: ["Nắn nót tương lai", "Bàn tay gieo hi vọng", "Vượt khó gieo chữ"]
  },
  {
    imgSrc: [YeuThuong1, YeuThuong2, YeuThuong3],
    title: "YÊU THƯƠNG",
    lines: ["Nụ cười vùng cao", "Như người mẹ hiền", "Ấm áp tình cô trò"]
  },
  {
    imgSrc: [SuMenh1, SuMenh2, SuMenh3],
    title: "SỨ MỆNH",
    lines: ["Gieo mầm tri thức", "Mang chữ lên non", "Thắp sáng ước mơ", "Lặng lẽ gieo con chữ"]
  },
  {
    imgSrc: [HiSinh1, HiSinh2, HiSinh3, HiSinh4],
    title: "HI SINH",
    lines: [
      "Gác lại phố thị, gác lại tuổi xuân",
      "Vượt ngàn con suối, qua bao đỉnh đèo",
      "Đánh đổi bình yên, giữ ngọn lửa nghề"
    ]
  }
];

// =============================
// Animation Variants
// =============================
const slideVariants: Variants = {
  enter: { opacity: 0, scale: 0.97 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 1.03,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const imageSlideVariants: Variants = {
  enter: { opacity: 0, x: -100, scale: 1.1 },
  center: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 1, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    x: 100,
    scale: 0.95,
    transition: { duration: 0.8, ease: "easeIn" }
  }
};

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delay: 0.4, staggerChildren: 0.3 }
  }
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  }
};

// =============================
// MAIN COMPONENT (with forwardRef)
// =============================
const Section = forwardRef<HTMLDivElement>((_, ref) => {
  const [index, setIndex] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % storyData.length);
    setImageIndex(0);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + storyData.length) % storyData.length);
    setImageIndex(0);
  };

  const current = storyData[index];
  const images = Array.isArray(current.imgSrc) ? current.imgSrc : [current.imgSrc];

  // Auto slideshow (5s)
  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(() => {
        setImageIndex((prev) => (prev + 1) % images.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [images.length]);

  // Key + click navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };

    const handleClick = () => next();

    window.addEventListener("keydown", handleKey);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div ref={ref} className="single-screen-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="slide-wrapper"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* Image area */}
          <div className="image-container">
            <AnimatePresence mode="wait">
              <motion.img
                key={imageIndex}
                src={images[imageIndex]}
                className="bg-img"
                alt={current.title}
                variants={imageSlideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              />
            </AnimatePresence>
          </div>

          <div className="overlay"></div>

          {/* Text */}
          <motion.div
            className="text-content"
            variants={textContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={textItemVariants}>
              {current.title}
            </motion.h1>

            {current.lines.map((line, i) => (
              <motion.p key={i} variants={textItemVariants}>
                {line}
              </motion.p>
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
});

export default Section;
