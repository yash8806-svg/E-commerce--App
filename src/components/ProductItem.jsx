import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../utils/ProductApi';
import Stars from './Stars';
import { useState, useEffect } from 'react';
import { addCart } from '../utils/slice';
import { useSelector,useDispatch } from 'react-redux';

const ProductItem = () => {
    const { data: products = [], isLoading, isError } = useGetProductsQuery();
    const { id } = useParams();
    const [releatedCategory, setReleatedCategory] = useState([]);
    const cart = useSelector(state => state.cart.cartItems);

    const dispatch = useDispatch();
    const item = products.find(product => product.id === Number(id));

    useEffect(() => {
        if (item) {
            const filtered = products.filter(product =>
                product.category === item.category && 
                product.id !== id
            );
            setReleatedCategory(filtered);
        }
    }, [item, products]);

    const addToCart = (product) => {
        dispatch(addCart(product));
        alert("Product Succesfully add in Cart!");
    }

    if (isLoading) return <p className="text-center">Loading product...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load product.</p>;
    if (!item) return <p className="text-center">Item not found</p>;


    return (
        <>
            <div className='bg-gray-200 flex items-center justify-center w-screen min-h-screen pt-16 pb-10'>
                <div className=" flex items-center flex-col justify-center shadow-lg gap-10 bg-white p-10 w-[90%] min-w-6xl ">
                    <div>
                        <div className="flex items-center justify-center gap-10">
                            <div className='pl-8'>
                                <div className=" flex items-center justify-center">
                                    <img className='h-72 md:h-96 object-contain' src={item.image} alt={item.title} />
                                </div>
                               <div className="flex items-center justify-center gap-2 mt-4">
                                    <button onClick={()=>addToCart(item)} className='rounded-2xl p-3 w-40 flex justify-center m-auto bg-blue-700 text-white transition-colors duration-300 cursor-pointer hover:bg-blue-950' >Add to Cart</button>
                                    <button className='rounded-2xl p-3 w-40 flex justify-center m-auto bg-blue-900 text-white transition-colors duration-300 cursor-pointer hover:bg-blue-700' >Buy Now</button>
                                </div>
                            </div>
                            <div className='p-10 border-1 border-gray-100 shadow-lg'>
                                <h2 className='font-medium mb-1 text-2xl'>Category:{item.category}</h2>
                                <h4 className='flex items-center mt-2'> <Stars rating={item.rating?.rate || 0} /> <span className="text-gray-600 text-sm" >({item.rating?.count} reviews)</span></h4>
                                 <p className='mt-2'>{item.title}</p>
                                <h1 className='text-red-700 font-bold mt-2 text-2xl'>Price:${item.price}</h1>
                                <div className=' pt-2 w-130'>
                                    <h1 className='text-2xl font-semibold'>Product Description</h1>
                                    <p className='pt-2 line-clamp-2'>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {releatedCategory.length > 0 && (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {releatedCategory.map(item => (
                                    <div key={item.id} className='flex  border-1 border-gray-200 shadow-lg hover:shadow-2xl transition duration-300 scale-105 ease-in-out p-4 w-50 h-60 flex-col items-center justify-center'>
                                        <img src={item.image} alt="product-image" className='h-20' />
                                        <p className="text-red-700 font-semibold" >${item.price}</p>
                                        <p className='line-clamp-2' >{item.title}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem
