import About from "../components/About/About";
import Categories from "../components/Categories/Categories";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services-section/Services";

function LandingPage() {
    return (
        <>
            <Header />
            <Hero />
            <About />
            <Services />
            <Categories />
        </>
    );
}

export default LandingPage;
