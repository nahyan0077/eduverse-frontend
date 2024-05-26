import StudentForm from "@/components/form/StudentForm";
import Header from "@/components/common/users/Header";

const StudentRegisterForm: React.FC = () => {
	return (
		<>
        <div className="min-h-screen" >

			<Header />

			<StudentForm />
        </div>

			
		</>
	);
};
export default StudentRegisterForm;
