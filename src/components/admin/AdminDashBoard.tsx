import React, { useEffect, useState } from 'react';
import { useTheme } from '../ui/theme-provider';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/redux/store';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { getAllInstructorsAction, getAllStudentsAction } from '@/redux/store/actions/user';

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [profit, setProfit] = useState("")
  const [counts, setCounts] = useState({
    studentCount: "",
    instructorCount: ""
  })

  const {data} = useAppSelector((state: RootState) => state.user )
  const dispatch = useAppDispatch()
  const fetchDatas = async () =>  {
    const students: any = await dispatch(getAllStudentsAction({}))
    const instructors = await dispatch(getAllInstructorsAction({}))

    setCounts({studentCount: students?.payload?.data.data.length , instructorCount: instructors?.payload?.data.length})

    console.log(students,"suteeeeee");
    
  }

  useEffect(() => {
    if (data && data.profit) {
      setProfit(data?.profit)
    }
    fetchDatas()
  }, [data])

  
  console.log(counts,"admin overall profit");
  

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className={`text-2xl font-bold mb-4 ${theme === 'light' ? 'text-gray-700' : 'text-white'}`}>
        Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Revenue Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Total Revenue
          </h2>
          <p className="text-xl font-bold"> <CurrencyRupeeIcon color='success' /> {profit}</p>
        </div>
        {/* Students Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Total Students
          </h2>
          <p className="text-xl font-bold">{counts.studentCount}</p>
        </div>
        {/* Instructors Box */}
        <div className={`rounded-md p-4 shadow-md transform transition-transform duration-200 hover:scale-105 ${theme === 'light' ? 'bg-white text-gray-900 hover:bg-gray-100' : 'bg-gray-800 text-white hover:bg-gray-700'}`}>
          <h2 className={`text-lg font-semibold mb-2 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
            Total Instructors
          </h2>
          <p className="text-xl font-bold">{counts.instructorCount}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
