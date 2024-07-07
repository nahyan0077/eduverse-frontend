import { useTheme } from "@/components/ui/theme-provider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { Watch } from "react-loader-spinner";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

export const InstructorVerification: React.FC = () => {
  const { theme } = useTheme();
  const data = useAppSelector((state: RootState) => state.user);
  const [isRejected, setIsRejected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (data.data?.isRejected !== undefined) {
      setIsRejected(data.data.isRejected);
    }
  }, [data]);

  return (
    <>
      <div className="max-h-screen flex justify-center mt-16">
        <div className="rounded-xl shadow-lg max-w-7xl w-full">
          {isRejected ? (
            <div
              className={`flex flex-col items-center justify-center text-center ${
                theme === "light" ? "bg-gray-100" : "bg-gray-900"
              } py-20 rounded-xl shadow-md`}>
              <Player
                autoplay
                loop
                src="https://lottie.host/5d237da8-65c0-4daf-907f-855384ec5898/Ed8TxCClT7.json"
                style={{ height: "50%", width: "50%" }}
              />

              <span className="font-semibold text-lg mt-6">
                Sorry to inform you that your account verification was
                unsuccessful.
              </span>
              <p className="text-gray-500 text-sm mt-2">
                You can apply again in the reapply section in the profile
              </p>
              <button
                className="btn btn-outline btn-accent mt-10"
                onClick={() => navigate("/instructor/profile")}>
                {" "}
                Profile{" "}
              </button>
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center text-center ${
                theme === "light" ? "bg-gray-100" : "bg-gray-900"
              } py-40 rounded-xl shadow-md`}>
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
                Please wait while we verify your account. You will receive an
                email after successful verification.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
