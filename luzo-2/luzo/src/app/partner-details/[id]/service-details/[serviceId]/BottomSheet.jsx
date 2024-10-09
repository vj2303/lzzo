"use client"
import { useState } from 'react';

const BottomSheet = ({ isOpen, onClose, service }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-end bg-black bg-opacity-10">
      <div className="bg-gray-200 w-full max-w-lg rounded-t-2xl p-4">
        <div className="flex justify-between pl-2 items-center mb-1">
          <h2 className="text-lg font-medium text-center items-center">{service.name}</h2>      
          <button onClick={onClose} className="text-gray-500">
            &#10005;
          </button>
        </div>
        <p className="text-[14px] bg-white rounded-full py-2 px-4 mb-2 shadow-md ">{service.one_line_description}</p>
        {/* <p className="text-gray-500 mb-2">Basic</p> */}
        <div className="mb-4 bg-white p-2 rounded-xl shadow-md">
        <div className="flex justify-between px-2 items-center">
            <div>
              <h3 className="font-semibold">{service.customizations?.[0]?.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{service.customizations?.[0]?.instruction}</p>
            </div>
            <span className="bg-slate-300 text-[12px] p-1 rounded-md inline-block">
              Required
            </span>
          </div>

          {
            service.customizations?.[0]?.options?.map((ele, i) => {
              return <div className="flex items-center justify-between rounded-md px-2 py-2" key={i}>
                <span>{ele.name}</span>
              <div className='flex items-center '>
                  <span className='text-gray-400 text-[12px] pr-2'>From ₹ {ele.rate}</span>
                  <input type="radio" name="product" className="form-radio" />
              </div>
              </div>
            })
          }
          {/* <div className="flex items-center justify-between border rounded-md px-2 py-2">
            <span>Without Ammonia</span>
            <span>From ₹ 1,500</span>
            <input type="radio" name="product" className="form-radio" />
          </div> */}
        </div>
        <button className="bg-blue-500 text-white w-full py-2 rounded-md font-semibold">
          Add Service
        </button>
      </div>
    </div>
  );
};

export default BottomSheet;
