import React from "react";
import { Categories } from "../AdminCategory";

interface CategoryTableProps {
  categories: Categories[];
  handleEditCategory: (data: Categories) => void;
  currentPage: number;
  itemsPerPage: number;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  handleEditCategory,
  currentPage,
  itemsPerPage,
}) => {
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 px-20">
        <thead className="text-xs text-gray-700 uppercase bg-gray-300 dark:bg-gray-900 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              Si.No
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-center ">
          {currentItems.map((data, index) => (
            <tr
              key={data._id}
              className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 text-center hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {indexOfFirstItem + index + 1}
              </th>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.categoryName}
              </td>
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.status === "active" ? (
                  <button className="badge badge-success">Active</button>
                ) : (
                  <button className="badge badge-error">Blocked</button>
                )}
              </td>
              <td className="px-4 py-2 space-x-4">
                <button
                  className="btn btn-outline btn-info text-sm btn-sm "
                  onClick={() => handleEditCategory(data)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
