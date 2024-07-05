import { AllMentors } from "@/components/common/mentors/AllMentors";
import Footer from "@/components/common/users/Footer";
import Header from "@/components/common/users/Header";
import React from "react";

export const AllMentorsSection: React.FC = () => {
	return (
		<>
			<Header />
			<AllMentors />
            <Footer />
		</>
	);
};
