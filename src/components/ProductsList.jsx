import React, { useContext, useMemo, useState } from 'react'
import { ProductContext } from '../utils/context'
import { Link } from 'react-router-dom';
import { addCart } from '../utils/slice';
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../utils/ProductApi';

const ProductsList = () => {
    const { toggleWishList, wishList } = useContext(ProductContext);
    const { data: products = [], isLoading, isError } = useGetProductsQuery();
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

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Error...</p>

    return (
        <>
            <div className="products-list">
                <div className="flex items-center justify-center gap-3">
                    <input type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="border-1 w-70 p-0.5"
                    />

                    <select value={category} onChange={(e) => setCategory(e.target.value)}
                        className='border-1 p-0.5 cursor-pointer'
                    >
                        <option value="All">All</option>
                        {categories.map((cat, i) => (
                            <option key={i} value={cat} >{cat}</option>
                        ))}
                    </select>

                    <select className='border-1 p-0.5 w-30 cursor-pointer ' value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Default</option>
                        <option value="low-high">low-high</option>
                        <option value="high-low">high-low</option>
                        <option value="a-z">a-z</option>
                    </select>
                </div>
                <div className="flex items-center justify-center mt-10 h-80">
                    <div className="grid grid-cols-4 justify-center gap-4 h-80">
                        {filterProducts.length === 0 ? (
                            <p>No matching produtcs</p>
                        ) : (
                            filterProducts.map(p => (
                                <div key={p.id} className="border-1 flex-col items-center justify-center p-4" >
                                    <img className='w-full h-40 object-contain' src={p.image} alt="product-image" />
                                    <div className="flex-col grid">
                                        <h1 className='font-bold flex justify-center '>{p.category}</h1>
                                        <button className='border-1 rounded-2xl p-1 w-50 flex justify-center m-auto items-center font-medium  bg-blue-900 text-white cursor-pointer ' onClick={() => dispatch(addCart(p))}>Add to cart</button>
                                        <button
                                            onClick={() => toggleWishList(p)}
                                            className={`mt-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer
                                               ${wishList.some(item => item.id === p.id)
                                                    ? "bg-red-600 text-white hover:bg-red-700"
                                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"} // If not in favorites`}
                                        >
                                            {wishList.some(item => item.id === p.id)
                                                ? "❤️ Remove from Fav"
                                                : "🤍 Add to Fav"}
                                        </button>

                                        <h1 className='font-bold'>${p.price}</h1>
                                        <Link className='text-purple-800 flex items-center justify-center' to={`/details/${p.id}`}>Read More...</Link>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductsList
