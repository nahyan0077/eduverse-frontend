import React, { useState } from "react";
import { motion } from "framer-motion";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { createSubscriptionSessionAction } from "@/redux/store/actions/payment";
import { RootState } from "@/redux/store";
import { toast } from "sonner";
import { storeObject } from "@/utils/localStorage";
import { loadStripe } from "@stripe/stripe-js";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";

export const StudentChatSubscription: React.FC = () => {

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  const plans = [
    {
      title: "Basic",
      price: 199,
      description1: "Unlimitted lifetime access",
      description2: "Standard support",
      description3: "One-to-one chat with mentor",
      isPopular: false,
      image:
        "https://res.cloudinary.com/dneak7rwh/image/upload/v1720203648/basics_cw6tkk.jpg",
    },
    {
      title: "Standard",
      price: 399,
      description1: "Unlimitted lifetime access",
      description2: "Priority support",
      description3: "One-to-one chat and voice mentorship",
      isPopular: true,
      image:
        "https://res.cloudinary.com/dneak7rwh/image/upload/v1720203698/standard_mjhlkv.jpg",
    },
    {
      title: "Premium",
      price: 699,
      description1: "Unlimitted lifetime access",
      description2: "One-on-one mentorship",
      description3: "One-to-one voice and video mentoring",
      isPopular: false,
      image:
        "https://res.cloudinary.com/dneak7rwh/image/upload/v1720203722/premium_nfyfbc.jpg",
    },
  ];
  const location = useLocation();
  const { data } = useAppSelector((state: RootState) => state.user);
  const locationData = location.state;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const handlePayment = async (price: number, plan: string, image: string) => {
    try {
      if (data?._id) {
        setLoading(true);
        const stripe = await loadStripe(
          import.meta.env.VITE_REACT_APP_PUBLIC_STRIPE_KEY as string
        );

        const subDatas = {
          planName: plan,
          amount: price,
          chatId: locationData.chatId,
          userId: data?._id,
          subscriptionThumbnail: image,
        };
        console.log(subDatas, "subs data");

        const response = await dispatch(
          createSubscriptionSessionAction(subDatas)
        );

        if (!response?.payload || !response?.payload?.success) {
          toast.error("Error occurred");
          console.error("Something went wrong, try again!");
        }

        storeObject("subscription-session", {
          ...response?.payload?.data,
          amount: price,
          planName: plan,
          instructorId: locationData.instructorId,
        });
        const sessionId = response.payload.data.sessionId;

        setLoading(false);
        const result = await stripe?.redirectToCheckout({ sessionId });

        if (result?.error) {
          console.error(result.error.message);
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.error("Subscription Payment error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <LoadingPopUp isLoading={loading} />
      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100  mb-10 mt-20">
        Mentor <span className="text-violet-500">Subscription</span> Plans
      </h2>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-3 p-8">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            className={`
						relative overflow-hidden rounded-2xl shadow-lg
						${plan.isPopular ? "bg-violet-700" : "bg-white dark:bg-gray-800"}
						hover:shadow-2xl transition-all duration-300
						${plan.isPopular ? "scale-105" : "hover:scale-105"}
					`}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={index}
            whileHover={{ y: 10 }}>
            {plan.isPopular && (
              <motion.div
                className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-bl-lg"
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 100 }}>
                Popular
              </motion.div>
            )}
            <div className="p-8 text-center mb-12">
              <h3
                className={`text-2xl font-bold mb-4 ${
                  plan.isPopular
                    ? "text-white"
                    : "text-gray-900 dark:text-white"
                }`}>
                {plan.title}
              </h3>
              <p
                className={`text-4xl font-extrabold mb-6 ${
                  plan.isPopular ? "text-yellow-400" : "text-violet-600"
                }`}>
                ₹ {plan.price} /month
              </p>
              <p
                className={`mb-4 ${
                  plan.isPopular
                    ? "text-gray-200"
                    : "text-gray-600 dark:text-gray-300"
                }`}>
                <DoneAllIcon color="secondary" /> {plan.description1}
              </p>
              <p
                className={`mb-4 ${
                  plan.isPopular
                    ? "text-gray-200"
                    : "text-gray-600 dark:text-gray-300"
                }`}>
                <DoneAllIcon color="secondary" /> {plan.description2}
              </p>
              <p
                className={`mb-12 ${
                  plan.isPopular
                    ? "text-gray-200"
                    : "text-gray-600 dark:text-gray-300"
                }`}>
                <DoneAllIcon color="secondary" /> {plan.description3}
              </p>
              <motion.button
                className={`
								py-3 px-6 rounded-full text-lg font-semibold
								${
                  plan.isPopular
                    ? "bg-yellow-400 text-gray-900 hover:bg-yellow-300"
                    : "bg-violet-600 text-white hover:bg-violet-700"
                }
								transition duration-300
							`}
                // onClick={handleModalOpen}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() =>
                  handlePayment(plan.price, plan.title, plan.image)
                }>
                Get Started
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StudentChatSubscription;
