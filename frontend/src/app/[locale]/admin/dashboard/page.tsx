"use client";
import { useUserContext } from "@/lib/Providers/UserProvider";
import {useQueryClient,useQuery} from '@tanstack/react-query';
import AdminLoginForm from "@/components/Dashboard/AdminLoginForm";
import DashboardCard from "@/components/Dashboard/DashboardCard";
import { Newspaper, Package, Handshake, Contact, Star } from "lucide-react";
import axios from "axios";

export default function Dashboard() {
  // const {data:user} = useUserContext();
  const fetchAnalysis = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/content/analysis",
        { withCredentials: true }
      );
      return response.data.data
    } catch (error) {
      throw new Error('cannot fetch analysis data', error);
    }
  };

  const {data:analysis}=useQuery({
    queryKey:['analysis'],
    queryFn:fetchAnalysis,
    staleTime:1000*60*60,
    gcTime:1000*60*60*24
  })



  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-center m-2 w-full">
        Admin Dashboard
      </h1>
      {analysis&&(
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
      )}
      {/* <AnalyticsChart /> */}
      {/* <PostsTable title={"posts"} /> */}
    </div>
  );
}
