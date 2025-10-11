import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../utils/ProductApi';
import Stars from './Stars';
import { useMemo, useCallback } from 'react';
import { addCart } from '../utils/slice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ProductContext } from '../utils/context';
import { FaRegHeart,FaHeart } from 'react-icons/fa';

const ProductItem = () => {
    const { data: products = [], isLoading, isError } = useGetProductsQuery();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const item = products.find(product => product.id === Number(id));
    const { toggleWishList, wishList } = useContext(ProductContext);

    const wishListId = useMemo(() => new Set(wishList.map(item => item.id)), [wishList]);

    const releatedCategory = useMemo(() => {
        if (!item) return [];
        return products.filter(product =>
            product.category === item.category &&
            product.id !== Number(id)
        );
    }, [item, products,id]);

    const addToCart = useCallback(
        (product) => {
            dispatch(addCart(product));
        }, [dispatch]);

    const buyNowHnadler = (product) => {
        dispatch(addCart({ ...product, quantity: 1 }));
        navigate("/checkout");

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
                            <div className='pl-8 relative'>
                                <div className=" flex items-center justify-center">
                                    <img className='h-72 md:h-96 object-contain' src={item.image} alt={item.title} />
                                </div>
                                <div className="flex items-center justify-center gap-2 mt-4">
                                    <button onClick={() => addToCart(item)} className='rounded-2xl p-3 w-40 flex justify-center m-auto bg-blue-700 text-white transition-colors duration-300 cursor-pointer hover:bg-blue-950' >Add to Cart</button>
                                    <button onClick={() => buyNowHnadler(item)} className='rounded-2xl p-3 w-40 flex justify-center m-auto bg-blue-900 text-white transition-colors duration-300 cursor-pointer hover:bg-blue-700' >Buy Now</button>
                                </div>
                                <button
                                    onClick={() => toggleWishList(item)}
                                    className={`absolute top-2 right-2 p-2  rounded-full transition cursor-pointer
                                                                                ${wishListId.has(item.id)
                                            ? "bg-red-600 text-white hover:bg-red-700"
                                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
                                > {wishListId.has(item.id) ? <FaHeart size={10} /> : <FaRegHeart size={10} />}
                                </button>
                            </div>
                            <div className='p-10 border border-gray-100 shadow-lg'>
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
                                    <Link to={`/details/${item.id}`} key={item.id} className='flex  border-1 border-gray-200 shadow-lg hover:shadow-2xl transition duration-300 scale-105 ease-in-out p-4 w-50 h-60 flex-col items-center justify-center'>
                                        <img src={item.image} alt="product-image" className='h-20' />
                                        <p className="text-red-700 font-semibold" >${item.price}</p>
                                        <p className='line-clamp-2' >{item.title}</p>
                                    </Link>
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
