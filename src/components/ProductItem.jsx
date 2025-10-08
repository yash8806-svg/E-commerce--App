// import { useParams } from 'react-router-dom';
// import { useGetProductsQuery } from '../utils/ProductApi';
// import Stars from './Stars';

// const ProductItem = () => {
//     const { data: products = [], isLoading, isError } = useGetProductsQuery();
//     const { id } = useParams();

//     const item = products.find(product => product.id === Number(id));

//     if (isLoading) return <p className="text-center">Loading product...</p>;
//     if (isError) return <p className="text-center text-red-600">Failed to load product.</p>;
//     if (!item) return <p className="text-center">Item not found</p>;


//     return (
//         <>
//         <div  className='bg-gray-200 flex items-center justify-center w-screen h-screen overflow-hidden'>
//             <div className="flex items-center justify-center shadow-lg gap-10 bg-white p-10 w-[90%] h-[85%] ">

//                 <div className="flex items-center justify-center gap-10 h-screen">
//                     <div className='pl-8'>
//                         <div className=" flex items-center justify-center">
//                             <img className='h-72 object-contain' src={item.image} alt={item.title} />
//                         </div>
//                         <div className="flex items-center justify-center gap-2 mt-4">
//                             <button className='rounded-2xl p-3 w-40 flex justify-center m-auto bg-blue-700 text-white transition-colors duration-300 cursor-pointer hover:bg-blue-950' >Add to Cart</button>
//                             <button className='rounded-2xl p-3 w-40 flex justify-center m-auto bg-blue-900 text-white transition-colors duration-300 cursor-pointer hover:bg-blue-700' >Buy Now</button>
//                         </div>
//                     </div>
//                     <div className='p-12'>
//                         <h2 className='font-medium mb-1 text-2xl'>Category:{item.category}</h2>
//                         <h4 className='flex items-center mt-2'> <Stars rating={item.rating?.rate || 0} /> <span className="text-gray-600 text-sm" >({item.rating?.count} reviews)</span></h4>
//                         <h1 className='text-red-700 font-bold mt-3 text-2xl'>Price:${item.price}</h1>
//                         <div className=' pt-5 w-130 h-50'>
//                             <h1 className='text-2xl font-bold'>Product Description</h1>
//                             <p className='pt-2 '>{item.description}</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

// export default ProductItem
