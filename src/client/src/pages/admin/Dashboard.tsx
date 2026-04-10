import React, { useState } from "react";
import { Users, TrendingUp, DollarSign, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fetchContacts, updateContact } from "@/apis/contacts";
import type {
  Contact,
  DashboardData,
  ItemApiResponse,
  ListApiResponse,
} from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StatCard } from "@/components/admin/StatCard";
import { toast } from "react-toastify";
import { fetchAnalytics } from "@/apis/dashboard";

export const AdminDashboard: React.FC = () => {
  const [idToUpdate, setIdToUpdate] = useState<number | null>(null);
  const navigate = useNavigate();
  const { data: analyticsData } = useQuery<ItemApiResponse<DashboardData>>({
    queryKey: ["dashboard"],
    queryFn: fetchAnalytics,
  });
  const { data: contactData } = useQuery<ListApiResponse<Contact>>({
    queryKey: ["contacts"],
    queryFn: fetchContacts,
  });

  const queryClient = useQueryClient();
  const { mutate: approveMutate, isPending: isApproving } = useMutation({
    mutationFn: updateContact,
    onMutate: ({ id }) => {
      setIdToUpdate(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
      toast.success(`Status Update`);
    },
    onSettled: () => {
      setIdToUpdate(null);
    },
  });
  const handleApprove = (id: number, status: string) => {
    if (id) {
      approveMutate({ id, status: status });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          label="Total Students"
          value={
            analyticsData && analyticsData.data
              ? analyticsData.data.total_users
              : "0"
          }
          icon={Users}
          color={{
            bg: "bg-blue-500",
            text: "text-blue-600 dark:text-blue-400",
          }}
          trend="+12%"
        />
        <StatCard
          label="Active Revenue"
          value="₹4.2L"
          icon={DollarSign}
          color={{
            bg: "bg-[#138808]",
            text: "text-[#138808] dark:text-green-500",
          }}
          trend="+8%"
        />
        <StatCard
          label="Pending Enquiries"
          value={
            analyticsData && analyticsData.data
              ? analyticsData.data.pending_enquiries
              : "0"
          }
          icon={Calendar}
          color={{
            bg: "bg-[#FF9933]",
            text: "text-[#FF9933] dark:text-orange-400",
          }}
          trend="-2%"
        />
        <StatCard
          label="Top Program"
          value={
            analyticsData && analyticsData.data
              ? analyticsData.data.top_program
              : "0"
          }
          icon={TrendingUp}
          color={{
            bg: "bg-purple-500",
            text: "text-purple-600 dark:text-purple-400",
          }}
          trend="+24%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            Recent Registrations {contactData?.data.length}
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              {contactData && (
                <>
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                      <th className="w-3"></th>
                      <th className="pb-3 pl-2">Name</th>
                      <th className="pb-3">Program</th>
                      <th className="pb-3">Date</th>
                      <th className="pb-3">Approval</th>
                      <th className="pb-3">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                    {contactData?.data.map((contact, idx) => {
                      const isApproved = contact.status === "Pending";
                      return (
                        <tr key={idx}>
                          <td className="py-3 pl-2 w-6">
                            <span
                              className={`relative flex h-4 w-4 items-center justify-center ${
                                isApproved ? "opacity-100" : "opacity-0"
                              }`}
                            >
                              <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-50 animate-ping" />
                              <span className="relative inline-flex h-3 w-3 rounded-full bg-red-700" />
                            </span>
                          </td>
                          <td className="py-3 pl-2 font-medium text-gray-900 dark:text-white">{`${contact.first_name + " " + contact.last_name}`}</td>
                          <td className="py-3 text-gray-500 dark:text-gray-400">
                            {contact.program}
                          </td>
                          <td className="py-3 text-gray-500 dark:text-gray-400">
                            {contact.created_at}
                          </td>
                          <td className="py-3">
                            <span
                              className="min-w-[96px] bg-red-100 dark:bg-red-900/30
                              text-red-700 dark:text-red-400
                              px-2 py-1 text-xs rounded-sm font-medium
                              transition-opacity"
                            >
                              {contact.status}
                            </span>
                          </td>
                          <td className="py-3">
                            <button
                              className="min-w-[96px] bg-green-100 dark:bg-green-900/30
                              text-green-700 dark:text-green-400
                              px-2 py-1 text-xs rounded-sm font-medium
                              transition-opacity border"
                              disabled={
                                isApproving && idToUpdate === contact.id
                              }
                              onClick={() =>
                                handleApprove(
                                  contact.id,
                                  contact.status === "Pending"
                                    ? "Approved"
                                    : "Pending",
                                )
                              }
                            >
                              {isApproving && idToUpdate === contact.id
                                ? "Approving"
                                : "Approve"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </>
              )}
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
          <h3 className="font-bold text-gray-800 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button
              onClick={() => navigate("/admin/programs")}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              + Add New Program
            </button>
            <button
              onClick={() => navigate("/admin/gallery")}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              + Upload Gallery Images
            </button>
            {/* <button
              onClick={() => navigate("/admin/enquiries")}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              View Recent Enquiries
            </button> */}
            <button
              onClick={() => navigate("/admin/visitors")}
              className="w-full py-2 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-left rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 transition-colors"
            >
              Check Visitor Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
