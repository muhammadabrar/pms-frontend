import React from 'react';
import Index from '../components/btns';
import Form from '../components/form/form';

const Comp = () => {
      return (
            <>
            <div data-aos="fade-left" className="bg-slate-50 shadow-inner  rounded-l-xl  flex-grow p-6 px-11 ">
                  <Form/>
            </div>
            <div data-aos="fade-left" className="bg-slate-50 my-3 shadow-inner  rounded-l-xl  flex-grow p-6 px-11 ">
                  <Index/>
            </div>
            </>
      );
}

export default Comp;
