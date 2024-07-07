import TeacherForm from "@/components/form/TeacherForm";
import Header from "@/components/common/users/Header";

const TeacherRegisterForm: React.FC = () => {
  return (
    <>
      <div className="min-h-screen">
        <Header />

        <TeacherForm />
      </div>
    </>
  );
};
export default TeacherRegisterForm;
