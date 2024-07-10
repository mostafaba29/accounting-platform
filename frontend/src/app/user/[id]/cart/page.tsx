"use client";
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function Cart () {
  const { id } = useParams();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartItems = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/cart`,
      {
        withCredentials: true,
      }
      );
      setCartItems(response.data.data.cart);
      console.log(response.data.data.cart);
    }catch(error){
      console.error("Error fetching cart items:", error);
    }
  }
  useEffect(() => {
      fetchCartItems();
  }, []);

  return (
    <div>
    <NavigationBar />
    <div className='flex items-center justify-center'>
    <div className="min-h-[700px] lg:w-[1500px] md:w-[1000px] w-[600px] p-4 my-5 bg-gray-200/85 shadow-lg">
      <h1 className="text-3xl text-center font-bold mb-4">Shopping Cart</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item,index ) => (
            <div key={index} className="flex items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">{item.title_EN}</h2>
                {/* <p className="text-gray-600">Price: ${item.price}</p> */}
                {/* <p className="text-gray-600">Quantity: {item.quantity}</p> */}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
    <Footer />
    </div>
  );
};

