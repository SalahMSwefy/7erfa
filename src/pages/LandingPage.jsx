import Header from "../components/LandingPage/Header/Header";
import Hero from "../components/LandingPage/Hero/Hero";
import About from "../components/LandingPage/About/About";
import Services from "../components/LandingPage/Services-section/Services";
import SliderGallery from "../components/LandingPage/SliderGallery/SliderGallery";
import Team from "../components/LandingPage/Team/Team";
import Footer from "../components/LandingPage/Footer/Footer";

function LandingPage() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Services />
            <SliderGallery />
            <Team />
            <Footer />
        </>
    );
}

export default LandingPage;
