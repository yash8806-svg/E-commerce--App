import React, { useContext } from 'react'
import { ProductContext } from '../utils/context'

const WishList = () => {
    const { wishList, setWishList } = useContext(ProductContext);

    const removeFavourite = (id) => {
        setWishList(wishList.filter(item => item.id !== id))
    }

    return (
        <>
            <div className="wishlist">
                {wishList.length === 0 ? (
                    <p>No favourites found!</p>
                ) : (
                    wishList.map(wish => (
                        <div key={wish.id} className="list">
                            <img style={{ height: "200px" }} src={wish.image} alt={wish.title} />
                            <h1>Price:${wish.price}</h1>
                            <h2>Category:{wish.category}</h2>
                            <h3>{wish.description}</h3>
                            <h4>Rating:(Rate{wish.rating.rate},Count:{wish.rating.count})</h4>
                            <button onClick={()=>removeFavourite(wish.id)} >Remove</button>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default WishList
