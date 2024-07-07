import React from "react";
import { Field, ErrorMessage } from "formik";
import { useTheme } from "../../ui/theme-provider";

interface SelectFieldProps {
  name: string;
  placeholder: string;
  options: { categoryName: string }[];
}

const CourseSelectField: React.FC<SelectFieldProps> = ({
  name,
  placeholder,
  options,
}) => {
  const { theme } = useTheme();

  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={name} className="block text-xs font-semibold mb-2">
          {placeholder.toUpperCase()}
        </label>
        <Field
          as="select"
          className={`w-full px-5 py-3 rounded-lg font-medium border-2 ${
            theme === "light"
              ? "bg-gray-200 text-gray-600"
              : "bg-gray-800 text-gray-300"
          } border-transparent text-sm focus:outline-none focus:border-2 focus:outline bg-gray-100 `}
          id={name}
          name={name}>
          <option value="" selected>
            Select an option
          </option>
          {options.map((option) => (
            <option key={option.categoryName} value={option.categoryName}>
              {option.categoryName}
            </option>
          ))}
        </Field>
        <ErrorMessage
          className="text-xs font-semibold text-red-500 ml-3"
          name={name}
          component="span"
        />
      </div>
    </>
  );
};

export default CourseSelectField;
