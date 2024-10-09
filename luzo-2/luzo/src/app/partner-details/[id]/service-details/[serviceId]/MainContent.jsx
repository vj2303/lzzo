'use client';
import { Baby, ChevronDown, ChevronUp, Plus, Search } from "lucide-react";
import { useState } from "react";
import BottomSheet from "./BottomSheet";
import { serviceData } from "./ServiceData"; // Import serviceData from ServiceData.js

const MainContent = ({ selectedService }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index); // Toggle dropdown
  };

  // Group services by name
  const groupedServices = selectedService?.services?.reduce((acc, service) => {
    if (acc[service.name]) {
      acc[service.name].push(service);
    } else {
      acc[service.name] = [service];
    }
    return acc;
  }, {});

  return (
    <div className="w-3/4">
      {selectedService && (
        <div className="mt-4 bg-white">
          <div className="border mx-2 flex items-center rounded-md p-2">
            <Search size={15} className="mr-2" />
            <input
              type="text"
              placeholder="Search for service..."
              className="focus:outline-none"
            />
          </div>
          <div className="flex mt-1 mx-2 sm:justify-start justify-between gap-2">
            <button className="border rounded-md px-10">Men</button>
            <button className="border rounded-md px-10">Women</button>
          </div>

          <div className="">
            {Object.keys(groupedServices).map((serviceName, index) => (
              <div key={index} className="border-gray-500 border-b-4 border-b-gray-200">
                <div
                  className="flex justify-between items-center p-2 cursor-pointer"
                  onClick={() => toggleDropdown(index)}
                >
                  {/* Display service name and count */}
                  {serviceName} ({groupedServices[serviceName].length})
                  {openIndex === index ? <ChevronUp /> : <ChevronDown />}
                </div>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}
                >
                  {groupedServices[serviceName].map((service, serviceIndex) => (
                    <div key={serviceIndex} className="p-2 flex items-center justify-between text-gray-600">
                      <div>
                        {service.gender === "Women" ? <Baby /> : service.gender === "Men" ? (
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-person-standing">
                            <circle cx="12" cy="5" r="1" />
                            <path d="m9 20 3-6 3 6" />
                            <path d="m6 8 6 2 6-2" />
                            <path d="M12 10v4" />
                          </svg>
                        ) : ""}
                        <p className="font-semibold">{service.name}</p>
                        <p className="text-[10px]">{service.one_line_description}</p>
                        <p className="text-[10px] items-center">from ₹ {service.display_rate} + GST</p>
                      </div>
                      <button className="text-blue-200 font-semibold border shadow-md rounded-md px-2 flex gap-1" onClick={service?.customizations?.length > 0 ? handleOpen : undefined}>
                        ADD {service?.customizations?.length > 0 ? <Plus /> : ""}
                      </button>
                      <BottomSheet isOpen={isOpen} onClose={handleClose} service={service} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainContent;
