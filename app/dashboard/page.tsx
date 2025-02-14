"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Sidebar from "@/components/sidebar";
import { useUser, UserButton } from "@clerk/nextjs";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AIDeploymentDashboard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/sign-in"); // Redirect unauthorized users
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isSignedIn) {
    return null; // Prevent rendering unauthorized content
  }

  const chartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Model Accuracy",
        data: [85, 88, 84, 90, 92, 95],
        borderColor: "#3b82f6",
        fill: false
      }
    ]
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 bg-gray-100 overflow-auto">
        {/* Admin Dashboard Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Overview Panel */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <Line data={chartData} />
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="flex flex-col space-y-4">
              <Button variant="default">Upload Dataset</Button>
              <Button variant="secondary">Train Model</Button>
              <Button variant="outline">Deploy API</Button>
            </div>
          </div>
        </div>
        
        {/* Analytics & User Roles Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-6">
          {/* Analytics */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Analytics & Reports</h2>
            <Line data={chartData} />
          </div>
          
          {/* User Roles */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">User Roles</h2>
            <ul className="list-disc pl-4">
              <li>Admin</li>
              <li>Developer</li>
              <li>Business User</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
