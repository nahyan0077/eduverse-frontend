import LoadingPopUp from "@/components/common/skeleton/LoadingPopUp";
import React, { Suspense, lazy } from "react";

const FeaturesSection = lazy(() => import("@/components/home/FeaturesSection"));
const Footer = lazy(() => import("@/components/common/users/Footer"));
const Header = lazy(() => import("@/components/common/users/Header"));
const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const MentorsSection = lazy(() => import("@/components/home/MentorSection"));
const LogosSection = lazy(() => import("@/components/home/LogoSection"));

const Home: React.FC = () => {
  return (
    <>
      <Suspense fallback={<LoadingPopUp isLoading />}>
        <Header />
        <HeroSection />
        <LogosSection />
        <MentorsSection />
        <FeaturesSection />
        <Footer />
      </Suspense>
    </>
  );
};

export default Home;
