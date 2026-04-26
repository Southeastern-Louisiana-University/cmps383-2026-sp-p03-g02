import React, { createContext, useContext, useState } from 'react';

interface cartItem {
    name: string;
    price: string;
    quantity: number;
}

const userCart = createContext<any>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, setCart] = useState<cartItem[]>([]);

    const addToCart = (item: any) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.name === item.name);
            if (existing) {
                return prev.map((i) => i.name === item.name ? { ...i, quantity: i.quantity + 1} : i);
            }
            return [...prev, { ...item, quantity: 1}];
        });
    }

    const removeFromCart = (name: string) => {
        setCart((prev) => prev.filter((item) => item.name !== name));
    };

    return (
        <userCart.Provider value={{ cart, addToCart, removeFromCart}}>
            {children}
        </userCart.Provider>
    );
}

export const useCart = () => {
    const context = useContext(userCart);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};