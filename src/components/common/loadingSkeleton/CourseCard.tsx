import Skeleton from "@/components/ui/Skeleton";
import { useTheme } from "@/components/ui/theme-provider";

export default function CourseSectionCardLoading() {
  const { theme } = useTheme();
  return (
    <div className="w-full md:w-1/3 lg:w-1/3 px-4">
      <div
        className={`${
          theme === "light" ? "bg-gray-100" : "bg-gray-800"
        } rounded-lg overflow-hidden mb-10 pb-8`}>
        <div
          className={`w-full h-44 ${
            theme === "light" ? "bg-gray-100" : "bg-gray-800"
          } p-2 flex items-center justify-center`}>
          <div
            className={`w-full h-40 ${
              theme === "light" ? "bg-gray-300" : "bg-gray-900"
            }  animate-pulse`}></div>
        </div>
        <div className="px-1 text-center">
          <div className="w-full mt-6 flex flex-col gap-1 p-3 justify-around space-y-3">
            <Skeleton width={"90%"} height={"14px"} />
            <Skeleton width={"70%"} height={"14px"} />
            <Skeleton width={"90%"} height={"14px"} />
            <Skeleton width={"70%"} height={"14px"} />
          </div>
        </div>
      </div>
    </div>
  );
}
