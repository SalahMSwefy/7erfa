import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import About from "../components/About/About";
import Services from "../components/Services-section/Services";
import SliderGallery from "../components/SliderGallery/SliderGallery";
import Team from "../components/Team/Team";
import Footer from "../components/Footer/Footer";

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
