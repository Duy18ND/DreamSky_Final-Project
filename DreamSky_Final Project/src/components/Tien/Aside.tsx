
import "./CSS/aside.css";

export default function Aside() {
    return (
        <div className="aside-total">
            <div className="aside-container">


                <div className="aside-video-wrapper">
                    <iframe
                        className="aside-youtube"
                        src="https://www.youtube.com/embed/bvcsGYIEe-c"
                        title="YouTube video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>


                </div>


                <div className="aside-quote-card">
                    <p className="aside-Title">
                        Người gieo chữ nơi đầu nguồn
                    </p>
                    <p className="aside-quote-text">
                        “Những thầy cô lặng lẽ mang tri thức vượt núi băng rừng đến với học trò. Họ gieo từng con chữ như gieo hy vọng, thắp sáng tương lai cho những vùng đất còn nhiều gian khó.”
                    </p>

                </div>

            </div>
        </div>
    );
}
