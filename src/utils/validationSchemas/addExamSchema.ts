import * as Yup from 'yup';

 export const examValidationSchema = Yup.object().shape({
  courseId: Yup.string().required('Course selection is required'),
  title: Yup.string().required('Exam name is required'),
  questionScore: Yup.number()
    .required('Question score is required')
    .positive('Must be a positive number'),
  passingScore: Yup.number()
    .required('Passing score is required')
    .positive('Must be a positive number')
    .test('is-less-than-total', 'Passing score must be less than the total score', function(value) {
      const { questionScore, questions } = this.parent;
      const totalScore = questionScore * questions.length;
      return value < totalScore;
    }),
  questions: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required('Question is required'),
      options: Yup.object().shape({
        1: Yup.string().required('Option 1 is required'),
        2: Yup.string().required('Option 2 is required'),
        3: Yup.string().required('Option 3 is required'),
        4: Yup.string().required('Option 4 is required'),
      }),
      answer: Yup.string().required('Correct answer selection is required'),
    })
  ).min(1, 'At least one question is required'),
});