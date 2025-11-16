import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import "./CSS/scrolltop.css"
export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Kiểm tra khi cuộn trang
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Hàm cuộn lên đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`scroll-top-btn ${isVisible ? "show" : ""}`}
    >
      <ArrowUp />
    </button>
  );
}
