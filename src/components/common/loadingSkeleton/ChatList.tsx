import Skeleton from "react-loading-skeleton";

export const ChatListSkeleton = () => {
  const skeletonItems = Array(10).fill(0);

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 ">
          <Skeleton circle={true} height={48} width={48} className="mr-4 " />
          <div className="flex-1 ">
            <Skeleton height={20} width={`60%`} />
            <Skeleton height={15} width={`40%`} />
          </div>
        </div>
      ))}
    </>
  );
};
