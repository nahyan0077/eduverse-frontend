import React, { useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useAppDispatch } from "@/hooks/hooks";
import { createPaymentAction, getPaymentSessionAction } from "@/redux/store/actions/payment";

export const PaymentSuccess: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const isFirstRun = useRef(true); // Flag to prevent double invocation

    useEffect(() => {
        if (isFirstRun.current) {
            console.log("useEffect triggered");
            createPayment();
            isFirstRun.current = false;
        }
    }, []);

    const createPayment = async () => {
        console.log("createPayment called");
        const paymentSession = getObject("payment_session");
        console.log(paymentSession, "payment session");

        if (!paymentSession) {
            navigate('/');
            return;
        }

        try {
            const response = await dispatch(getPaymentSessionAction(paymentSession._id));
            console.log(response, "check payment response");

            if (!response.payload?.success) {
                throw new Error("Payment failed!");
            }

            const createPaymentData = {
                userId: paymentSession.userId,
                instructorId: paymentSession.instructorId,
                courseId: paymentSession.courseId,
                method: "card",
                status: "completed",
                amount: paymentSession.amount
            };

            const response1 = await dispatch(createPaymentAction(createPaymentData));
            console.log(response1, "create payment response");
            if (!response1.payload?.success) {
                throw new Error("Payment creation failed!");
            }

            deleteObject("payment_session");
        } catch (error) {
            console.error(error);
            navigate('/');
        }
    };

    return (
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
                    <button onClick={() => navigate('/')} className="btn btn-success btn-outline rounded-full">
                        Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};
