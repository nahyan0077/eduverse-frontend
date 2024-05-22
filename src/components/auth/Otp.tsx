// OtpInput.tsx
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "../ui/theme-provider";
import otp_img from '../../assets/auth/otp-image.png';

interface OtpInputProps {
  length?: number;
  onOtpSubmit?: (otp: string) => void;
}

const Otp: React.FC<OtpInputProps> = ({
  length = 6,
  onOtpSubmit = () => {},
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleClick = (index: number) => {
    inputRefs.current[index]?.setSelectionRange(1, 1);
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full min-h-screen max-w-7xl mx-auto ">
      <div className="w-full md:w-1/2 p-4">
        <img src={otp_img} alt="" className="mx-auto" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center p-4 rounded-2xl shadow-lg ">
        <div className={`text-3xl font-extrabold pb-10 ${theme === 'light' ? 'text-violet-700' : 'text-white'}`}>
          OTP
        </div>
        <div className="flex gap-2 justify-center">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)}
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-12 h-12 text-center text-xl border ${
                theme === 'light' ? 'text-gray-900 bg-gray-300' : 'text-white bg-gray-600'
              } font-medium border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              maxLength={1}
            />
          ))}
        </div>
        <button className="px-4 py-2 mt-5 text-white bg-violet-700 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Otp;