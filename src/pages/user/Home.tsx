import FeaturesSection from "@/components/home/FeaturesSection"
import Footer from "@/components/common/users/Footer"
import Header from "@/components/common/users/Header"
import HeroSection from "@/components/home/HeroSection"
import MentorsSection from "@/components/home/MentorSection"
import LogosSection from "@/components/home/LogoSection"


const Home: React.FC = () => {
    return (
        <>
        <Header/>
        <HeroSection/>
        <LogosSection/>
        <MentorsSection/>
        <FeaturesSection/>
        <Footer/>
        </>
    )
}

export default Home