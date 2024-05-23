import { OtpHeroSection } from "@/components/auth/OtpHeroSection";
import { OtpSection } from "@/components/auth/OtpSection";
import Header from "@/components/home/Header";

const OtpPage: React.FC = () => {
	return (
		<>
        <Header />
        <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen max-w-7xl mx-auto">
            <OtpHeroSection />
            <OtpSection />
        </div>
		</>
	);
};
export default OtpPage;
