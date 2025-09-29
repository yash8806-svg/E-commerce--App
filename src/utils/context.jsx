import { createContext, useState, useEffect } from "react";
export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [wishList, setWishList] = useState(() => {
        const saved = localStorage.getItem("Favorites");
        return saved ? JSON.parse(saved) : [];
    });

    const [orders, setOrders] = useState(() => {
        try {
            const saved = localStorage.getItem("orders");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Error parsing orders from localStorage", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addOnOrder = (order) => {
        setOrders(prev => [...prev, order]);
    }

    useEffect(() => {
        localStorage.setItem("Favorites", JSON.stringify(wishList));
    }, [wishList]);


    const toggleWishList = (product) => {
        setWishList(prev => {
            const favorite = prev.find((item) => item.id === product.id);
            if (favorite) {
                return prev.filter((item) => item.id !== product.id)
            } else {
                return [...prev, product]
            }
        })
    }

    return (
        <ProductContext.Provider value={{ wishList, setWishList, toggleWishList, orders, addOnOrder }} >
            {children}
        </ProductContext.Provider>
    )
}