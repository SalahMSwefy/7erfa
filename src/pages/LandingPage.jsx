import About from "../components/About/About";
import SliderGallery from "../components/SliderGallery/SliderGallery";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services-section/Services";
import Team from "../components/Team/Team";

function LandingPage() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Services />
            <SliderGallery />
            <Team />
        </>
    );
}

export default LandingPage;
