import InstructorHeader from "@/components/instructor/InstructorHeader";
import { useTheme } from "@/components/ui/theme-provider";
import { useAppSelector } from "@/hooks/hooks";
import { RootState } from "@/redux/store";
import React from "react";
import { Watch } from "react-loader-spinner";


const VerificationPage: React.FC = () => {

  const { theme } = useTheme()
  const data = useAppSelector((state: RootState) => state.user)

  console.log(data.data,"lgo daga vefifa");



  return (
    <>
    <InstructorHeader />
    <div className="min-h-screen flex justify-center mt-16">
      <div className="  rounded-xl shadow-lg max-w-7xl w-full">
          <div className={`flex flex-col items-center justify-center text-center ${theme == 'light' ? 'bg-gray-100' : 'bg-gray-900'  }  py-40 rounded-xl shadow-md`}>
            <Watch
              visible={true}
              height="80"
              width="80"
              radius="48"
              color="#4fa94d"
              ariaLabel="watch-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
            <span className="font-semibold text-lg mt-6">  Instructor account verification in progess...</span>
            <p className="text-gray-600 text-sm mt-2">
              Please wait while we verify your account. You will receive an email
              after successful verification.
            </p>
          </div>
      </div>
    </div>
    </>
  );
};

export default VerificationPage;
