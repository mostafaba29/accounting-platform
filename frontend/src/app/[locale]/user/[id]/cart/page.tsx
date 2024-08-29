"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigtionWrapper from '@/components/shared/NavigationWrapper';
import Footer from '@/components/shared/Footer';
import { useQueryClient,useQuery } from '@tanstack/react-query';
import {fetchUserCart} from '@/lib/api/userApi'
import CartItemList from '@/components/Cart/CartItemsList';
import CartSummary from '@/components/Cart/CartSummary';

export default function Cart() {
  // const [cartItems, setCartItems] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);

  // const fetchCartItems = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await axios.get(`http://localhost:8000/api/v1/cart`, {
  //       withCredentials: true,
  //     });
  //     setCartItems(response.data.data.cart);
  //   } catch (error) {
  //     console.error("Error fetching cart items:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchCartItems();
  // }, []);
  const {data:cartItems,isLoading,isError}=useQuery({
    queryKey:['cartItems'],
    queryFn:fetchUserCart,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 60,
  })

  return (
    // <div className="flex flex-col min-h-screen bg-gray-100">
    <>
      <NavigtionWrapper />
      <main className="flex-grow container mx-auto px-4 py-8 min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        {isLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartItemList items={cartItems} />
            </div>
            <div className="lg:col-span-1">
              <CartSummary items={cartItems} />
            </div>
          </div>
        )}
      </main>
      <Footer />
      </>
  );
}