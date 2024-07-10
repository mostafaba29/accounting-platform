"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NavigationBar from '@/components/NavigationBar';
import Footer from '@/components/Footer';

export default function Orders() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try{
      const response = await axios.get(`http://localhost:8000/api/v1/users/purchases`,
      {
        withCredentials: true,
      }
      );
      setOrders(response.data.data.purchases);
    }catch(error){
      console.error("Error fetching orders:", error);
    }
  }
  useEffect(() => {

    fetchOrders();
  }, []);

  return (
    <div>
    <NavigationBar />
    <div className='flex items-center justify-center'>
    <div className="min-h-[700px] lg:w-[1500px] md:w-[1000px] w-[600px] p-4 my-5 bg-gray-200/85 shadow-lg">
      <h1 className="text-3xl text-center font-bold mb-4">Your Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
        {orders.length === 0 ? (
          <p>You have no orders.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2">Name</th>
                <th className="border-b-2 p-2">Items</th>
                <th className="border-b-2 p-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td className="border-b p-2">{order.id}</td>
                  <td className="border-b p-2">
                    {order.products.map(item => (
                      <div key={item.id} className="flex items-center mb-2">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-cover mr-2" />
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </td>
                  <td className="border-b p-2">${order.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div>
    <Footer />
    </div>
  );
};


