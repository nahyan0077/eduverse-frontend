import React, { useEffect, useState } from "react";
import { addCategory } from "@/types/ICategory";
import { useAppDispatch } from "@/hooks/hooks";
import {
  addCategoryAction,
  getAllCategories,
  editCategoryAction,
} from "@/redux/store/actions/category";
import { Toaster, toast } from "sonner";
import LoadingPopUp from "../common/skeleton/LoadingPopUp";
import { SearchBar } from "../common/admin/SearchBar";
import CategoryModal from "./category/CategoryModal";
import CategoryTable from "./category/CategoryTable";
import PaginationControls from "./category/CategoryPagination";

export interface Categories {
  _id: string;
  categoryName: string;
  status: string;
  createdAt: string;
}

export const AdminCategory: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);
  const [editCategory, setEditCategory] = useState<Categories | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const initialValues = {
    categoryName: "",
    status: "",
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await dispatch(getAllCategories());
        console.log(response, "fetching category data");

        if (getAllCategories.fulfilled.match(response)) {
          setCategories(response.payload.data);
        } else {
          toast.error("Failed to fetch data");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch, searchQuery]);

  console.log(categories, "categories");

  const handleAddCategory = async (values: addCategory) => {
    try {
      const response = await dispatch(
        addCategoryAction({
          categoryName: values.categoryName,
          status: values.status,
        })
      );

      console.log(response, "add category response");

      if (response.meta.requestStatus === "fulfilled") {
        toast.success("Category added successfully");
        setCategories([...categories, response.payload.data]);
        setIsModalOpen(false);
      } else if (response.meta.requestStatus === "rejected") {
        toast.error(response?.payload || "Failed to add category");
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleEditCategory = (data: Categories) => {
    setEditCategory(data);
    setIsEditModalOpen(true);
  };

  const handleSubmitEditCategory = async (values: {
    categoryName: string;
    status: string;
  }) => {
    try {
      if (editCategory) {
        const response = await dispatch(
          editCategoryAction({
            _id: editCategory?._id,
            categoryName: values?.categoryName,
            status: values?.status,
          })
        );

        if (response.meta.requestStatus == "fulfilled") {
          setCategories(
            categories.map((category) =>
              category._id === editCategory._id
                ? response.payload.data
                : category
            )
          );
          toast.success("Category edited successfully..!");
          setIsEditModalOpen(false);
        } else if (response.meta.requestStatus == "rejected") {
          toast.error(response.payload || "Failed to edit category");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "An error occurred");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  };

  if (loading) {
    return <LoadingPopUp isLoading={loading} />;
  }

  // Pagination calculation
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="max-w-full mx-auto items-center px-20 py-20">
      <Toaster richColors position="top-center" />
      <div className="flex justify-between mb-6">
        <h2 className="font-bold text-3xl">Categories</h2>
        <button
          className="btn btn-warning btn-outline"
          onClick={() => setIsModalOpen(true)}
        >
          Add Category
        </button>
      </div>
      {/* <------------------- search -----------------> */}

      <div className="flex justify-end items-center">
        <div>
          <SearchBar onSearchChange={handleSearchChange} />
        </div>
      </div>
      <CategoryTable
        categories={categories}
        handleEditCategory={handleEditCategory}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />
      <PaginationControls
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={setCurrentPage}
      />

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialValues={initialValues}
        onSubmit={handleAddCategory}
        title="Add New Category"
      />

      {isEditModalOpen && editCategory && (
        <CategoryModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          initialValues={{
            categoryName: editCategory.categoryName,
            status: editCategory.status,
          }}
          onSubmit={handleSubmitEditCategory}
          title="Edit Category"
        />
      )}
    </div>
  );
};
