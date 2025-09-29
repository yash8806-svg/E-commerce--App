import React, { useContext, useMemo, useState } from 'react'
import { ProductContext } from '../utils/context'
import { Link } from 'react-router-dom';
import { addCart } from '../utils/slice';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../utils/ProductApi';

const ProductsList = () => {
    const { toggleWishList, wishList } = useContext(ProductContext);
    const {data:products = [],isLoading,isError} = useGetProductsQuery();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("");

    const dispatch = useDispatch();

    const categories = [...new Set(products.map((item) => item.category))]
    console.log(categories);

    let filterProducts = useMemo(() => {
        let result = products.filter((item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === "All" || item.category === category)
        )
        if (sort === "low-high") result.sort((a, b) => a.price - b.price);
        else if (sort === "high-low") result.sort((a, b) => b.price - a.price);
        else if (sort === "a-z")
            result.sort((a, b) => a.title.localeCompare(b.title));

        return result;
    }, [products, search, category, sort]);

    console.log(products)

    if(isLoading) return <p>Loading...</p>
    if(isError) return <p>Error...</p>

    return (
        <>
            <div className="products-list">
                <div className="header">
                    <input type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)} />

                    <select value={category} onChange={(e) => setCategory(e.target.value)} >
                        <option value="All">All</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat} >{cat}</option>
                        ))}
                    </select>

                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Default</option>
                        <option value="low-high">low-high</option>
                        <option value="high-low">high-low</option>
                        <option value="a-z">a-z</option>
                    </select>
                </div>
                {filterProducts.length === 0 ? (
                    <p>No matching produtcs</p>
                ) : (
                    filterProducts.map(p => (
                        <div key={p.id} className="items">
                            <img style={{ width: "200px" }} src={p.image} alt="product-image" />
                            <h1>Price:${p.price}</h1>
                            <h3>{p.category}</h3>
                            <button onClick={()=>dispatch(addCart(p))}>Add to cart</button>
                            <button onClick={() => toggleWishList(p)}>{wishList.some(item => item.id === p.id) ? "Remove from favourites" : "Add in favourites"}</button>
                            <Link to={`/details/${p.id}`}>More...</Link>
                             
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default ProductsList
