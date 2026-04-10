import React, { useEffect, useState } from "react";
import { Search, Plus, Trash2, Loader2, DumbbellIcon, Edit2, X } from "lucide-react";
import { Button } from "@/components/UI/Button";
// import { TestimonialCardSkeleton } from "@/components/admin/TestomonialCard";
import { useForm, useWatch } from "react-hook-form";
import type { ProgramFormData } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProgram, listProgram, removeProgram } from "@/apis/programs";
import { toast } from "react-toastify";
import { slugify } from "@/utils/utility";

const AdminProgram: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, control, setValue, reset } = useForm<ProgramFormData>();

  // Used to create a watch over the value of control being changed
  const titleValue = useWatch({
    control,
    name: "title"
  });
  // Make the value of slug to be changed based on the value of title text
  useEffect(() => {
    if (titleValue) {
      const slug = slugify(titleValue);
      setValue("slug", slug, { shouldValidate: true });
    }
  }, [titleValue, setValue]);

  // Mutation for create a new Program
  const queryClient = useQueryClient();
  const { mutate: handleCreate, isPending: isCreating } = useMutation({
    mutationFn: addProgram,
    onSuccess: (data) => {
      if (!data.success) {
        toast.warning(data.message)
      }
      queryClient.invalidateQueries({ queryKey: ["program"] });
      setIsModalOpen(false);
      reset();
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error(`Failed to Add Program : ${error.message}`)
    },
  })

  // Mutation to delete the Program
  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: removeProgram,
    onMutate: (id) => {
      setDeletingId(id);
    },
    onSuccess: (data) => {
        if (!data.success) {
        toast.warning(data.message)
      }
      // setDeletingId(null);
      queryClient.invalidateQueries({ queryKey: ["program"] });
        toast.success("Program Deleted Successfully");
    },
    onError: (error) => {
      setDeletingId(null);
      toast.error(`Failed to delete the Program:${error.message}`);
    },
    onSettled:()=>{
      setDeletingId(null);
    }
  })

  // Handle Delete Action
  const handleDeleteAction = (id: string) => {
    handleDelete(id);
  }

  // Fetching Data for Programs
  const { data: programs, isLoading } = useQuery({
    queryKey: ["program"],
    queryFn: listProgram
  })

  const formSubmitHandler = (data: ProgramFormData) => {
    const prgFormData = new FormData();
    prgFormData.append("program_title", data.title);
    prgFormData.append("program_slug", data.slug);
    prgFormData.append("program_desc", data.description);
    prgFormData.append("program_level", data.level);
    prgFormData.append("is_active", data.is_active);
    if (data.image_url && data.image_url.length > 0) {
      prgFormData.append("image_file", data.image_url[0])
    }
    handleCreate(prgFormData);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <DumbbellIcon className="w-6 h-6 mr-2 text-[#FF9933]" />
            Manage Programs
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Control the programs and courses displayed on the homepage.
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
            {programs?.data.length} Programs Found.
          </h3>
        </div>
        {isLoading ? <>Loading...</> :
          <div className="grid">
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 p-6 transition-colors duration-300">
              <h3 className="font-bold text-gray-800 dark:text-white mb-4">
                Recent Registrations {programs?.data.length}
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  {programs && (
                    <>
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-gray-700 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
                          {/* <th className="w-3"></th> */}
                          <th className="pb-3">Title</th>
                          <th className="pb-3">Duration</th>
                          <th className="pb-3">Level</th>
                          <th className="pb-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 dark:divide-gray-800 text-sm">
                        {programs?.data.map((prgm, idx) => {
                          // const isApproved = prgm.status === "Pending";
                          return (
                            <tr key={idx}>
                              <td className="py-3 pl-2 font-medium text-gray-900 dark:text-white">{prgm.title}</td>
                              <td className="py-3 text-gray-500 dark:text-gray-400">
                                {prgm.duration}
                              </td>
                              <td className="py-3 text-gray-500 dark:text-gray-400">
                                {prgm.level}
                              </td>
                              <td className="py-3 text-left flex gap-2">
                                <button
                                  className="text-xs rounded-sm font-sm"
                                  title="Edit Program"
                                >
                                  <Edit2 className="w-4 h-4"></Edit2>
                                </button>
                                <button
                                  className="text-xs rounded-sm font-sm"
                                  title="Delete Program"
                                  onClick={() => { handleDeleteAction(prgm.id) }}
                                >
                                  {((deletingId === prgm.id) && isDeleting) ? <Loader2 className="w-4 h-4"></Loader2> : <Trash2 className="w-4 h-4"></Trash2>}
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
          </div>
        }

        {isModalOpen && (
          <>
            {/* Testomonial Add Modal */}
            <div className="fixed inset-0 bg-black/60 flex items-start sm:items-center justify-center z-[60] p-4 sm:p-6 backdrop-blur-sm overflow-y-auto">
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-xl border border-gray-100 dark:border-slate-800 max-h-[90dvh] flex flex-col overflow-hidden">
                <div className="bg-[#000080] p-4 flex justify-between items-center text-white">
                  <h3 className="font-bold flex items-center">
                    Add New Program
                  </h3>
                  <button
                    className="hover:bg-white/10 p-1 rounded-full transition-colors"
                    onClick={() => setIsModalOpen(false)}
                    disabled={isCreating}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form
                  className="p-6 space-y-4 overflow-y-auto flex-1"
                  onSubmit={handleSubmit(formSubmitHandler)}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Program Title
                      </label>
                      <input
                        {...register("title", {
                          required: "Name is Required",
                        })}
                        placeholder="e.g. Atheletics Training"
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                      />
                      {errors.title && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.title.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                        Slug
                      </label>
                      <input
                        {...register("slug", {
                          required: "Slug is Required",
                        })}
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                        readOnly
                      />
                      {errors.slug && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.slug.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-col-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs block font-bold text-gray-500 mb-1 uppercase">
                        IsActive
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                        {...register("is_active", {
                          required: "Active flag is Required",
                        })}
                      >
                        <option defaultValue={"Yes"} value={"Yes"}>Yes</option>
                        <option value={"No"}>No</option>
                      </select>
                      {errors.is_active && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.is_active.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="text-xs block font-bold text-gray-500 mb-1 uppercase">
                        Program Level
                      </label>
                      <select
                        className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm"
                        {...register("level")}
                      >
                        <option value={"Beginner"}>Beginner</option>
                        <option value={"Intermediate"}>Medium</option>
                        <option value={"Advanced"}>Advance</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                      Description
                    </label>
                    <textarea
                      {...register("description", {
                        required: "Description is Required",
                      })}
                      rows={4}
                      placeholder="Provide a breief description"
                      className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] dark:text-white text-sm resize-none"
                    ></textarea>
                    {errors.description && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.description.message}
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
                      {isCreating ? "Submitting" : "Submit"}
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
export default AdminProgram;

