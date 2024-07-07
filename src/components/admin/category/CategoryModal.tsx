import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import InputField from "@/components/common/skeleton/InputField";
import { addCategorySchema } from "@/utils/validationSchemas/addCategorySchema";
import { addCategory } from "@/types/ICategory";
import { useTheme } from "@/components/ui/theme-provider";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: {
    categoryName: string;
    status: string;
  };
  onSubmit: (values: addCategory) => Promise<void>;
  title: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
  title,
}) => {
  const { theme } = useTheme();

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-8">{title}</h2>

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={addCategorySchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="flex flex-col gap-8">
                <div className="w-full">
                  <InputField
                    name="categoryName"
                    placeholder="Category Name"
                    type="text"
                  />
                </div>
                <div className="w-full mb-8">
                  <label
                    htmlFor="status"
                    className="block text-xs font-semibold mb-2"
                  >
                    ACTIVE/BLOCKED
                  </label>
                  <Field
                    as="select"
                    className={`select w-full font-semibold ${
                      theme === "light"
                        ? "bg-gray-200 text-gray-400"
                        : "bg-gray-900 text-gray-400"
                    }`}
                    name="status"
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="blocked">Blocked</option>
                  </Field>
                  <ErrorMessage
                    name="status"
                    className="text-xs font-semibold text-red-500 ml-3"
                    component="span"
                  />
                </div>
              </div>
              <div className="flex space-x-3 justify-end">
                <button
                  type="submit"
                  className="btn btn-success btn-outline btn-md"
                  disabled={isSubmitting}
                >
                  {title.includes("Edit") ? "Edit" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-error btn-outline btn-md"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CategoryModal;
