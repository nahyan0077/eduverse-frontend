import React from "react";
import { useNavigate } from "react-router-dom";

export const InstructorExams : React.FC = () => {

    const navigate = useNavigate()

    return (
        <>
            <div className="" >
                <div className="flex flex-col" >
                <h2 className="" > My Exams </h2>
                <button className="btn btn-outline btn-warning" onClick={()=>navigate('/instructor/add-exam')} > Add Exam </button>

                </div>
                <div className="" >
                    Table will be here
                </div>
            </div>
        </>
    )
}