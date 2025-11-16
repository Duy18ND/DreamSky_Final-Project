import './CSS/Header.css'
import Bang from '../../assets/Asset_Final/header/Bang.png'
import item1 from '../../assets/Asset_Final/header/item1.png'
import item2 from '../../assets/Asset_Final/header/item2.png'
import title from '../../assets/Asset_Final/header/Title.png'
export default function Header() {
  return (
    <div className='Header_container'>
      <img src={Bang} alt="Bảng" className='Header_img_Bang' />
      <img src={item1} alt="Item1" className='Header_img_Item1' />
      <img src={item2} alt="Item2" className='Header_img_Item2' />
      {/* Text */}
      <div className='Header_Title1'>Chào Mừng Ngày</div>
      <img src={title} alt="Title2" className='Header_Title2' />
      <div className='Header_Title3'>Nhân ngày Nhà giáo Việt Nam 20/11, xin kính chúc thầy cô luôn mạnh khỏe, hạnh phúc và thành công trong sự nghiệp trồng người.</div>
    </div>
  )
}
