import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useTheme } from "../ui/theme-provider";

const Otp: React.FC = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState<string>("");

  const handleChange = (code: string) => {
    console.log(code,"code");
    
    setCode(code)
};

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className={`p-6 rounded-lg shadow-lg max-w-sm w-full ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
        <h2 className={`text-2xl ${theme === 'light' ? 'text-violet-700' : 'text-gray-300'} font-semibold text-center mb-4 `}>Enter OTP</h2>
        <OtpInput
          value={code}
          onChange={handleChange}
          numInputs={4}
          inputStyle={{
            color:"white"
          }}
          renderInput={(props) => (
            
            <input
            {...props}
            type="text"
            className={`border-2  rounded-lg w-14 h-14 text-xl text-center p-6 ${
              theme === 'light' ? 'bg-gray-300 text-gray-800' : 'bg-gray-700 text-white'
            } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
          />
          )}
          renderSeparator={<span className="mx-5"></span>}
        />
        <button
          className="mt-6 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default Otp;
