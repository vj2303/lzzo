import axios from "axios";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sidebar = ({ onSelect }) => {
  const [salonInfoServices, setSalonInfoServices] = useState([]);
  const { id } = useParams();
  const router = useRouter();
  
  // State to keep track of the selected service
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const fetchSalonDetails = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_SERVER_HOST}/api/v1/salon/${id.split("-")[id.split("-").length - 1]}`,
        params: {
          customerId: 518,
          latitude: "na",
          longitude: "na",
          id: id
        }
      });
      const services = res.data?.data?.services;
      setSalonInfoServices(services);

      // Set the default service as selected (first one in the list)
      if (services && services.length > 0) {
        setSelectedServiceId(services[0].id);
        onSelect(services[0]);
        router.push(`/partner-details/${id}/service-details/service-${services[0].id}`);
      }
    } catch (error) {
      console.error("Error fetching salon info:", error);
      return (
        <div className='flex justify-center items-center w-full h-screen'>
          {error.response?.status === 404 ? "Salon not found (404)" : "Could not load the salon details"}
        </div>
      );
    }
  };

  useEffect(() => {
    fetchSalonDetails();
  }, []);

  // Handle service click and change background color
  const handleServiceClick = (service) => {
    setSelectedServiceId(service.id); // Set selected service ID
    onSelect(service); // Execute the onSelect callback
    router.push(`/partner-details/${id}/service-details/service-${service.id}`);
  };

  return (
    <div className="w-1/4 bg-gray-100 py-5 border-r-4 border-r-gray-200">
      {salonInfoServices?.map((service) => (
        <div 
          key={service.name} 
          className={`mb-2 flex cursor-pointer ${selectedServiceId === service.id ? 'bg-blue-200' : ''}`} 
          onClick={() => handleServiceClick(service)}
        >
          <button className="flex text-[12px] text-center flex-col items-center w-full rounded hover:bg-gray-200">
            <Image src={service?.image_url} alt="logo icon" width="50" height="50" className="rounded-full" />
            <div className="text-[12px] text-center sm:text-[18px]">
              {service.name}
            </div>
          </button>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
