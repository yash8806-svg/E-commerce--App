import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../utils/ProductApi';

const ProductItem = () => {
    const { data: products = [] } = useGetProductsQuery();
    const { id } = useParams();

    const item = products.find(product => product.id === Number(id));
    console.log(item)

    if (!item) {
        return <p>Item not found</p>
    }

    return (
        <>
            <div className="product-details">
                <img style={{ height: "200px" }} src={item.image} alt={item.title} />
                <h1>Price:${item.price}</h1>
                <h2>Category:{item.category}</h2>
                <h3>{item.description}</h3>
                <h4>Rating:(Rate{item.rating.rate},Count:{item.rating.count})</h4>
            </div>
        </>
    )
}

export default ProductItem
