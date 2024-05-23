// OtpInput.tsx
import React from "react";

import otp_img from "../../assets/auth/otp-image.png";

export  const OtpHeroSection: React.FC = () => {
	return (
		<div className="w-full md:w-1/2 p-4">
			<img src={otp_img} alt="OTP" className="mx-auto" />
		</div>
	);
};


