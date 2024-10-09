"use client"
import Image from "next/image";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = ({ onSelect }) => {
  const [services, setServices] = useState([]);
  const { id, serviceId } = useParams();

  // Function to fetch services from the API
  const fetchServices = async () => {
    try {
      const res = await axios({
        method: "post",
        baseURL: `${process.env.NEXT_PUBLIC_TEST_HOST}/api/v1`,
        url: "/salon/subCategories",
        params: {
          main_category_id: serviceId.split("-").pop(), // Get the last part of serviceId
          salon_id: id.split("-").pop() // Get the last part of id
        }
      });
      
      // Check if the response is successful and contains the expected data
      if (res.data?.status === "Success") {
        setServices(res.data.data.sub_categories);
      } else {
        alert("No services found");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      alert("Could not fetch services");
    }
  };

  // useEffect to call fetchServices when the component mounts
  useEffect(() => {
    fetchServices();
  }, [id, serviceId]); // Add dependencies to refetch if id or serviceId changes

  return (
    <div className="w-1/4 bg-gray-100 border-r-4 border-r-gray-200">
      {services?.map((service) => (
        <div key={service.name} className="mb-2 flex">
          <button
            onClick={() => onSelect(service)}
            className="flex text-[12px] text-center flex-col items-center w-full rounded hover:bg-gray-200"
          >
            <Image src="/img/icon.webp" alt="logo icon" width="50" height="50" className="rounded-full" />

            <div className="text-[12px] text-center sm:text-[18px]">
              {service.name} <span className="sm:text-[18px] text-center">({service.services.length})</span>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
