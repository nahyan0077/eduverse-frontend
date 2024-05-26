import React from "react";
import { OtpHeroSection } from "@/components/auth/OtpHeroSection";
import { OtpSection } from "@/components/auth/OtpSection";
import Header from "@/components/common/users/Header";
import { motion } from 'framer-motion';

const OtpPage: React.FC = () => {
    return (
        <>
            <Header />
            <motion.div
                className="flex flex-col md:flex-row -mt-11 items-center justify-center w-full min-h-screen max-w-7xl mx-auto p-4  "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <OtpHeroSection />
                <OtpSection />
            </motion.div>
        </>
    );
};

export default OtpPage;
