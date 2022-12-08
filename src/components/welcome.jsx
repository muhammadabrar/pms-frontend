import React from 'react';

const Welcome = () => {
      return (
            <div className='bg-purple-100 shadow-sm mt-10 rounded-xl p-4 py-8 flex relative'>
                  <div>
                  <h1 className='text-3xl font-bold text-gray-700'>Hi, Shayan</h1>
                  <h1 className=' font-semibold '>Ready to start your day</h1>
                  </div>
                  <img src='/welcome.svg' className='w-96 welcome-img'/>
            </div>
      );
}

export default Welcome;
