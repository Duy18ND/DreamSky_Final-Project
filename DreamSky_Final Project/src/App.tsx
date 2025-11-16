import './App.css'
import Header from './components/Duy/Header'
import Section from './components/Duy/Section'
import Aside from './components/Tien/Aside'
import Footer from './components/Tien/Footer'
import ScrollToTopButton from './components/Tien/ScrollToTopButton'
import { useRef } from "react";

function App() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header onClickHeader={scrollToSection} />
      <Section ref={sectionRef} />
      <Aside />
      <Footer />
      <ScrollToTopButton />
    </>
  )
}

export default App;
