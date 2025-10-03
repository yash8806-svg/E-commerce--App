import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../utils/ProductApi';
import Stars from './Stars';

const ProductItem = () => {
    const { data: products = [],isLoading,isError} = useGetProductsQuery();
    const { id } = useParams();

    const item = products.find(product => product.id === Number(id));
    console.log(item)

    if (isLoading) return <p className="text-center">Loading product...</p>;
    if (isError) return <p className="text-center text-red-600">Failed to load product.</p>;
    if (!item) return <p className="text-center">Item not found</p>;


    return (
        <>
            <div className="flex items-center justify-center">
                <div className="flex items-center justify-center gap-10">
                    <img className='h-90' src={item.image} alt={item.title} />
                    <div>
                        <h2 className='font-medium mb-3 text-2xl'>Category:{item.category}</h2>
                        <h3 className='w-100 font-bold text-2xl'>{item.description}</h3>
                        <h4 className='flex items-center mt-3'> <Stars rating={item.rating?.rate || 0} /> <span className="text-gray-600 text-sm" >({item.rating?.count} reviews)</span></h4>
                        <h1 className='text-red-700 font-bold mt-3 text-2xl'>Price:${item.price}</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductItem
