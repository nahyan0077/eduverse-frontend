import React, { useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { getObject } from "@/utils/localStorage";
import { useAppDispatch } from "@/hooks/hooks";
import { createSubscriptionPaymentAction } from "@/redux/store/actions/payment/createSubscriptionPaymentAction";

export const SubscriptionSuccess: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      console.log("useEffect triggered");
      createPayment();
      isFirstRun.current = false;
    }
  }, []);

  const createPayment = async () => {
    const paymentSession = getObject("subscription-session");
    console.log(paymentSession, "payment session");

    if (!paymentSession) {
      navigate("/");
      return;
    }

    try {
      const createPaymentData = {
        userId: paymentSession.userId,
        instructorId: paymentSession.instructorId,
        chatId: paymentSession.chatId,
        method: "card",
        status: "completed",
        amount: paymentSession.amount,
        subscriptionType: paymentSession.planName.toLowerCase(),
      };

      const response = await dispatch(
        createSubscriptionPaymentAction(createPaymentData)
      );

      console.log(response.payload, "chek subscip pay complete");

      if (!response.payload.success) {
        console.log("subscription payment failed");
      }
    } catch (error: any) {
      console.error(error);
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col justify-center items-center border-2 py-12 px-6 md:px-12 bg-gray-900 rounded-2xl">
          <div className="mb-6">
            <Player
              autoplay
              loop
              src="https://lottie.host/1822c18f-de1d-4ea5-ade2-f1d42129b692/9hvHoSKmTX.json"
              style={{ height: "200px", width: "200px" }}
            />
          </div>
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold text-green-600 text-center">
              Payment Successful
            </h2>
          </div>
          <div>
            <button
              onClick={() => navigate("/student/chat")}
              className="btn btn-success btn-outline rounded-full">
              My Chats
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
