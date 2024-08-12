"use client";

import AdminLoginForm from "@/components/AdminLoginForm";
import { useState, useEffect } from "react";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import PostsTable from "@/components/posts/PostsTable";
import AnalyticsChart from "@/components/Dashboard/AnalyticsChart";
import { Newspaper, Package, Handshake, Contact, Star } from "lucide-react";
import axios from "axios";

interface Analysis {
  consultsCount: number;
  usersCount: number;
  blogsCount: number;
  productsCount: number;
  reviewsCount: number;
}
export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis>({
    consultsCount: 0,
    usersCount: 0,
    blogsCount: 0,
    productsCount: 0,
    reviewsCount: 0,
  });

  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/content/analysis",
        { withCredentials: true }
      );
      console.log(response.data.data);
      setAnalysis(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAdminUser = async () => {
    try {
        const response = await axios.get('http://localhost:8000/api/v1/users/me',{withCredentials: true });
        if(response.data.status === "success" && response.data.data.data.role === "admin") {
          setIsLoggedIn(true);
        }
    } catch (error) {
        console.log('error', error);
    }
};

  useEffect(() => {
    fetchAdminUser();
    fetchAnalysis();
  }, []);
  const handleSuccessfulLogin = () => {
    setIsLoggedIn(true);
    fetchAnalysis();
  };
  if (!isLoggedIn) {
    return (
      <AdminLoginForm
        isLoggedIn={isLoggedIn}
        onLoginSuccess={handleSuccessfulLogin}
      />
    );
  }



  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-center m-2 w-full">
        Admin Dashboard
      </h1>
      <div className="flex flex-row justify-around gap-4 m-2">
        <DashboardCard
          title={"Blogs"}
          value={analysis.blogsCount}
          icon={<Newspaper size="48" className="text-gray-700" />}
        />
        <DashboardCard
          title={"Products"}
          value={analysis.productsCount}
          icon={<Package size="48" className="text-gray-700" />}
        />
        <DashboardCard
          title={"Consults"}
          value={analysis.consultsCount}
          icon={<Handshake size="48" className="text-gray-700" />}
        />
        <DashboardCard
          title={"Users"}
          value={analysis.usersCount}
          icon={<Contact size="48" className="text-gray-700" />}
        />
        <DashboardCard
          title={"Reviews"}
          value={analysis.reviewsCount}
          icon={<Star size="48" className="text-gray-700" />}
        />
      </div>
      {/* <AnalyticsChart /> */}
      {/* <PostsTable title={"posts"} /> */}
    </div>
  );
}
