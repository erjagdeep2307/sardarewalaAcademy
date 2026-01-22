import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Plus,
  Edit2,
  Trash2,
  Star,
  Search,
  Quote,
  Loader2,
  X,
} from "lucide-react";
import { Button } from "@/components/UI/Button";
import type { TestomonialList, Testomonial } from "@/types/types";
import {
  createTestomonial,
  fetcthTestomonials,
  removeTestomonialById,
} from "@/apis/testomonials";
import { TestimonialCardSkeleton } from "@/components/admin/TestomonialCard";
import { useForm } from "react-hook-form";
export const AdminTestimonials: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data: testomonialData, isLoading } = useQuery<TestomonialList>({
    queryKey: ["testomonials"],
    queryFn: fetcthTestomonials,
  });

  const queryClient = useQueryClient();
  const { mutate: hDelete, isPending } = useMutation({
    mutationFn: removeTestomonialById,
    onMutate: (id: number) => {
      setDeletingId(id);
    },
    onSuccess: () => {
      toast.success(`Testomony Card Deleted`);
      queryClient.invalidateQueries({ queryKey: ["testomonials"] });
    },
    onSettled: () => {
      setDeletingId(null);
    },
  });

  const { mutate: newTestom, isPending: isCreating } = useMutation({
    mutationFn: createTestomonial,
    onSuccess: (data) => {
      if (!data.success) {
        toast.warning(data.message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["testomonials"] });
      reset();
      setIsModalOpen(false);
      toast.success(`Testomoinal is Created Successfully`);
    },
    onError: () => {
      toast.error(`Failed to create the Testomonial`);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Testomonial>();
  const onSubmitTestom = (data: Testomonial) => {
    const formData = new FormData();
    formData.append("name", data.client_name);
    formData.append("designation", data.designation);
    formData.append("department", data.department);
    formData.append("rating", String(data.rating));
    formData.append("is_featured", "true");
    formData.append("testimonial_text", data.testimonial_text);
    if (data.image_url && data.image_url.length > 0) {
      formData.append("image_file", data.image_url[0]);
    }
    newTestom(formData);
  };

  const handleDelete = (id: number) => {
    if (confirm("Remove this testimonial from the wall of fame?")) {
      hDelete(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <Quote className="w-6 h-6 mr-2 text-[#FF9933]" />
            Manage Testimonials
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Control the success stories displayed on the homepage.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] w-full md:w-64 bg-white dark:bg-slate-900 dark:text-white text-sm"
            />
          </div>
          <Button
            className="bg-[#138808] whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-800 dark:text-white text-lg">
            {testomonialData?.data?.length} Testomonials Found.
          </h3>
        </div>
        {isLoading ? (
          <TestimonialCardSkeleton count={5} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testomonialData ? (
              testomonialData.data.map((item, _idx) => (
                <div
                  key={_idx}
                  className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100   dark:border-slate-800 p-6 flex flex-col relative group transition-all hover:shadow-md"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image_url}
                        alt={item.client_name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700"
                      />
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white leading-tight">
                          {item.client_name}
                        </h4>
                        <p className="text-xs text-[#138808] dark:text-green-500 font-semibold">
                          {item.designation}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        disabled={isPending}
                        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors"
                        title="Delete"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300 italic line-clamp-4">
                      "{item.testimonial_text}"
                    </p>
                  </div>
                  <div className="mt-4 pt-4 flex item-center justify-between">
                    <div className="flex space-x-0.5">
                      {Array.from({ length: item?.rating ?? 0 }).map(
                        (_, index) => (
                          <Star
                            key={index}
                            className="w-3 h-3 text-[#f5cf14] fill-current"
                          />
                        ),
                      )}
                    </div>
                    <div className="flex">
                      <span className="text-sm text-gray-400">
                        Id : {item.id}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No Testomonial Data found</p>
            )}
          </div>
        )}

        {isModalOpen && (
          <>
            {/* Testomonial Add Modal */}
            <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[60] p-4 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden border border-gray-100 dark:border-slate-800">
                <div className="bg-[#000080] p-4 flex justify-between items-center text-white">
                  <h3 className="font-bold flex items-center">
                    Create New Testimonial
                  </h3>
                  <button
                    className="hover:bg-white/10 p-1 rounded-full transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  className="p-6 space-y-4"
                  onSubmit={handleSubmit(onSubmitTestom)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Student Name
                      </label>
                      <input
                        {...register("client_name", {
                          required: "Name is Required",
                        })}
                        placeholder="e.g. Vikram Singh"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                      />
                      {errors.client_name && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.client_name.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Designation / Role
                      </label>
                      <input
                        {...register("designation", {
                          required: "Designation is Required",
                        })}
                        placeholder="e.g. Selected - Army GD"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                      />
                      {errors.designation && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.designation.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-col-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs block font-bold text-gray-500 uppercase">
                        Department
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                        {...register("department", {
                          required: "Department is Required",
                        })}
                      />
                      {errors.department && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.department.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs block font-bold text-gray-500 uppercase">
                        Rating
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={5}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                        {...register("rating")}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Testomony Text
                    </label>
                    <textarea
                      {...register("testimonial_text", {
                        required: "Testomony Text is Required",
                      })}
                      rows={4}
                      placeholder="The discipline here is world class..."
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm resize-none"
                    ></textarea>
                    {errors.testimonial_text && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.testimonial_text.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Image File
                    </label>
                    <input
                      type="file"
                      {...register("image_url", { required: true })}
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                    />
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100 dark:border-slate-800">
                    <Button
                      type="button"
                      disabled={isCreating}
                      className="bg-[#FF9933] hover:bg-[#e68a00] px-8"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isCreating}
                      className="bg-[#FF9933] hover:bg-[#e68a00] px-8"
                    >
                      {isCreating ? "Publishing" : "Publish Story"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
