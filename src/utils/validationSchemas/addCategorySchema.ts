import * as Yup from 'yup';

export const addCategorySchema = Yup.object().shape({
    categoryName: Yup.string()
        .matches(
            /^(?!.*\s{3}).*$/,
            'Category name cannot contain more than 3 consecutive spaces'
        )
        .required('Category name is required'),
    status: Yup.string().required('Status is required'),
});