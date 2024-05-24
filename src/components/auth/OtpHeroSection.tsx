import React from "react";
import otp_img from "../../assets/auth/otp-image.png";
import { motion } from 'framer-motion';

export const OtpHeroSection: React.FC = () => {
    return (
        <motion.div 
            className="w-full md:w-1/2 p-4"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img src={otp_img} alt="OTP" className="mx-auto" />
        </motion.div>
    );
};
