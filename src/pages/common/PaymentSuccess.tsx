import React, { useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";
import { deleteObject, getObject } from "@/utils/localStorage";
import { useAppDispatch } from "@/hooks/hooks";
import { createPaymentAction } from "@/redux/store/actions/payment";
import { createChatAction } from "@/redux/store/actions/chat";
import { updateCourseAction } from "@/redux/store/actions/course";

export const PaymentSuccess: React.FC = () => {
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

    const createNewChat = async (studentId: string, instructorId: string) => {
        const response = await dispatch(createChatAction({
            participants: [studentId, instructorId]
        }));
        console.log(response, "text");
    }

    const createPayment = async () => {
        console.log("createPayment called");
        const paymentSession = getObject("payment_session");
        console.log(paymentSession, "payment session");

        if (!paymentSession) {
            navigate('/');
            return;
        }

        try {
         
            await dispatch(updateCourseAction({
                data: { _id: paymentSession.courseId },
                incrementStudentsEnrolled: true
            }));

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
            } else {
                await createNewChat(paymentSession.userId, paymentSession.instructorId);
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