import { useEffect } from "react";

export const AdminInstructors: React.FC = () => {

    useEffect(() => {
      
    

    }, [])
    

	return (
		<>
			<div className="overflow-x-auto max-w-full mx-auto p-8">
				<table className="table table-lg ">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Job</th>
							<th>Favorite Color</th>
						</tr>
					</thead>
					<tbody>
						{/* row 1 */}
						<tr className="hover:bg-gray-800">
							<th>1</th>
							<td>Cy Ganderton</td>
							<td>Quality Control Specialist</td>
							<td>Blue</td>
						</tr>
						{/* row 2 */}
						<tr>
							<th>2</th>
							<td>Hart Hagerty</td>
							<td>Desktop Support Technician</td>
							<td>Purple</td>
						</tr>
						{/* row 3 */}
						<tr>
							<th>3</th>
							<td>Brice Swyre</td>
							<td>Tax Accountant</td>
							<td>Red</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
