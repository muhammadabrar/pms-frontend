import React from 'react';
import DepartmentsCard from '../components/DepartmentsCard';
import EmployeesCard from '../components/EmployeesCard';
import States from '../components/states';
import TasksCard from '../components/TasksCard';

const Dashboard = () => {
      return (
            <>
                  <h1 className='text-2xl font-medium text-gray-700'>Welcome, HR</h1>
                  <h1 className='text-3xl font-semibold '>Muhammad Abrar</h1>
                  <States/>
                  <DepartmentsCard/>
                  <div className='grid sm:grid-cols-1 2xl:grid-cols-2 2
                  xl:grid-cols-2 lg:grid-cols-2  md:grid-cols-2 gap-6 my-6'>
                        <EmployeesCard/>
                        <TasksCard/>

                  </div>
            </>
      );
}

export default Dashboard;
