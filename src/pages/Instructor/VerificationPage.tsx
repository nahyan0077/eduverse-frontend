import InstructorHeader from "@/components/instructor/InstructorHeader";
import { useTheme } from "@/components/ui/theme-provider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { Watch } from "react-loader-spinner";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

const VerificationPage: React.FC = () => {
  const { theme } = useTheme();
  const data = useAppSelector((state: RootState) => state.user);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.data?.isVerified !== undefined) {
      setIsVerified(data.data.isVerified);
    }
  }, [data]);

  const handleGoToDashboard = () => {
    navigate("/instructor");
  };

  return (
    <>
      <InstructorHeader />
      <div className="min-h-screen flex justify-center mt-16">
        <div className="rounded-xl shadow-lg max-w-7xl w-full">
          {!isVerified ? (
            <div
              className={`flex flex-col items-center justify-center text-center ${
                theme === "light" ? "bg-gray-100" : "bg-gray-900"
              } py-40 rounded-xl shadow-md`}
            >
              <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#4fa94d"
                ariaLabel="watch-loading"
              />
              <span className="font-semibold text-lg mt-6">
                Instructor account verification in progress...
              </span>
              <p className="text-gray-600 text-sm mt-2">
                Please wait while we verify your account. You will receive an email after successful verification.
              </p>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center text-center ${
                theme === "light" ? "bg-gray-100" : "bg-gray-900"
              } py-24 rounded-xl shadow-md`}
            >
              <Player
                autoplay
                loop
                src="https://lottie.host/37f5f7d8-39fb-4688-8a65-88add16a4b6c/gCdD1edgx3.json"
                style={{ height: "60%", width: "60%" }}
              />
              <span className="font-semibold text-lg mt-6">
                Congratulations! Your instructor verification completed successfully.
              </span>
              <p className="text-gray-600 text-sm mt-2">
                Please click on the button below to go to the instructor dashboard.
              </p>
              <button className="btn btn-outline btn-success mt-3" onClick={handleGoToDashboard}>
                Go to Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VerificationPage;
