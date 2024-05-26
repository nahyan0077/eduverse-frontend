import FeaturesSection from "@/components/home/FeaturesSection"
import Footer from "@/components/common/users/Footer"
import Header from "@/components/common/users/Header"
import HeroSection from "@/components/home/HeroSection"


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