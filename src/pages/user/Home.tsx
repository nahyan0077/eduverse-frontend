import FeaturesSection from "../../components/home/FeaturesSection"
import Footer from "../../components/home/Footer"
import Header from "../../components/home/Header"
import HeroSection from "../../components/home/HeroSection"


const Home: React.FC = () => {
    return (
        <>
        <Header/>
        <HeroSection/>
        <FeaturesSection/>
        <Footer/>
        </>
    )
}

export default Home