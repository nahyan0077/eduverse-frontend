import React, { useEffect, useState } from 'react';
import { useTheme } from '../ui/theme-provider';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { RootState } from '@/redux/store';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import { getAllInstructorsAction, getAllStudentsAction } from '@/redux/store/actions/user';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { getAllCourseAction } from '@/redux/store/actions/course';
import { getAllPaymentAction } from '@/redux/store/actions/payment';



const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4560', '#775DD0'];

const AdminDashboard: React.FC = () => {
  const { theme } = useTheme();
  const [profit, setProfit] = useState("");
  const [counts, setCounts] = useState({
    studentCount: "",
    instructorCount: ""
  });
  const [courses, setCourses] = useState([]);
  const [courseData, setCourseData] = useState<any>([]);
  const [revenueData, setRevenueData] = useState<any>([]);

  const { data } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const fetchDatas = async () => {
    const students: any = await dispatch(getAllStudentsAction({}));
    const instructors = await dispatch(getAllInstructorsAction({}));
    setCounts({
      studentCount: students?.payload?.data.data.length,
      instructorCount: instructors?.payload?.data.length
    });
  };

  const fetchCourses = async () => {
    const response = await dispatch(getAllCourseAction({page:1,limit:20}));
    setCourses(response.payload.data.courses);
    
    // Grouping courses by category and sum up enrolled students
    const categoryEnrollment = response.payload.data.courses.reduce((acc: any, course: any) => {
      const category = course.categoryRef.categoryName;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += course.studentsEnrolled;
      return acc;
    }, {});

    // to convert to array format for chart
    const mappedCourseData = Object.entries(categoryEnrollment).map(([name, value]) => ({
      name,
      value
    }));

    setCourseData(mappedCourseData);
  }

  const fetchPayments = async () => {
    const response = await dispatch(getAllPaymentAction());
    const payments = response.payload.data;

    // Process payments to create revenue data
    const revenueByMonth = payments.reduce((acc: any, payment: any) => {
      if (payment.status === 'completed') {
        const date = new Date(payment.createdAt);
        const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        acc[monthYear] = (acc[monthYear] || 0) + payment.amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by date
    const sortedRevenueData = Object.entries(revenueByMonth)
      .map(([date, revenue]) => ({ date, revenue }))
      .sort((a, b) => a.date.localeCompare(b.date));

    setRevenueData(sortedRevenueData);
  }

  useEffect(() => {
    fetchCourses();
    fetchPayments();
  }, []);

  useEffect(() => {
    if (data && data.profit) {
      setProfit(data?.profit);
    }
    fetchDatas();
  }, [data]);

  const StatBox: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className={`rounded-lg p-6 shadow-lg flex items-center ${theme === 'light' ? 'bg-white text-gray-900' : 'bg-gray-800 text-white'}`}>
      <div className={`text-3xl mr-4 ${theme === 'light' ? 'text-blue-600' : 'text-blue-400'}`}>
        {icon}
      </div>
      <div>
        <h2 className={`text-lg font-semibold mb-1 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
          {title}
        </h2>
        <p className="text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 overflow-auto p-6">
      <h1 className={`text-3xl font-bold mb-8 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatBox title="Total Revenue" value={`₹${profit}`} icon={<CurrencyRupeeIcon fontSize="large" />} />
        <StatBox title="Total Students" value={counts.studentCount} icon={<PeopleIcon fontSize="large" />} />
        <StatBox title="Total Instructors" value={counts.instructorCount} icon={<SchoolIcon fontSize="large" />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className={`p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Revenue Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className={`p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
          <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
            Category Enrollment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value, percent }: any) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
              >
                {courseData.map((entry: any, index: any) => (
                  
                  <Cell className={`${entry}`} key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={`p-6 rounded-lg shadow-lg ${theme === 'light' ? 'bg-white' : 'bg-gray-800'}`}>
        <h2 className={`text-xl font-semibold mb-4 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>Top Performing Categories</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={courseData.slice(0, 5)}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" name="Enrolled Students" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;