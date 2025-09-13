// import React, { useState } from 'react'
// import { dummyPublishedImages } from '../assets/assets';
// import Loading from './Loading';
// import { useEffect } from 'react';


// const Community = () => {
//   const [images,setImages] = useState([]);
//   const [loading,setLoading] = useState(true);
//   const fetchImages = async () => {
//   try {
//     const { data } = await axios.get('/user/published-images', {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     });
//     if (data.success) {
//       setImages(data.images);
//     } else {
//       toast.error(data.message);
//     }
//   } catch (error) {
//     toast.error(error.response?.data?.message || error.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   useEffect(()=>{
//     fetchImages();
//   },[])

//   if(loading) return <Loading/>
//   return (
//     <div className="p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full
//     overflow-y-scroll">
//       <h2 className='text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100'>
//         Community images</h2>
//       {images.length>0?(
//         <div className='flex flex-wrap max-sm:justify-center gap-5'>
//           {images.map((item,index)=>(
//             <a key={index} className='relative group block rounded-lg overflow-hidden 
//             border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md 
//             transition-shadow duration-300' href={item.imageUrl} target='_blank'>
//               <img src={item.imageUrl} className='w-full h-40 md:h-50
//               2x1:h-62 object-cover group-hover:scale-105 transition-transform
//               duration-300 ease-in-out'/>
//               <p className='absolute bottom-0 right-0 text-xs bg-black/50 
//               backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 
//               group-hover:opacity-100 transition duration-300'>
//               Created By {item.userName}</p>
//             </a>
//           ))}
//         </div>
//       ):(
//         <p className="text-center text-gray-600 dark:text-purple-200 mt-10">No images Available</p>
//       )}
//     </div>
//   )
// }

// export default Community;

import React, { useState, useEffect } from 'react';
import Loading from './Loading';
import { assets } from '../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext';

const Community = () => {
  const { axios, token } = useAppContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/user/published-images', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (data.success) {
        setImages(data.images);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  // Polling every 10 seconds to auto-refresh images
  useEffect(() => {
    const interval = setInterval(() => {
      fetchImages();
    }, 10000); // 10s
    return () => clearInterval(interval);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6 pt-12 xl:px-12 2xl:px-20 w-full mx-auto h-full overflow-y-scroll">
      <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-purple-100">
        Community Images
      </h2>

      {images.length > 0 ? (
        <div className="flex flex-wrap max-sm:justify-center gap-5">
          {images.map((item, index) => (
            <a
              key={index}
              className="relative group block rounded-lg overflow-hidden border border-gray-200 dark:border-purple-700 shadow-sm hover:shadow-md transition-shadow duration-300"
              href={item.imageUrl}
              target="_blank"
            >
              <img
                src={item.imageUrl}
                className="w-full h-40 md:h-50 2x1:h-62 object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
              />
              <p className="absolute bottom-0 right-0 text-xs bg-black/50 backdrop-blur text-white px-4 py-1 rounded-tl-xl opacity-0 group-hover:opacity-100 transition duration-300">
                Created By {item.userName}
              </p>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 dark:text-purple-200 mt-10">
          No images available
        </p>
      )}
    </div>
  );
};

export default Community;
