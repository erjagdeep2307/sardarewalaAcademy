import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/UI/Button";
import { useForm } from "react-hook-form";
import type { ContactFormData, FormErrors } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createContact } from "@/apis/contacts";
import { toast } from "react-toastify";

export const Contact: React.FC = () => {
  const [submissionError, setSubmissionError] = React.useState<FormErrors | null>(null);
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ContactFormData>();

  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: createContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
      reset();
      toast.success(`Contact Data Submitted Successfully`);
    },
    onError: (error) => {
      if (error && typeof error === 'object' && 'errors' in error) {
        toast.error(error.message || `Failed to Submit Contact Data due to validation errors`);
        const apiErrors = (error as { errors: FormErrors }).errors as FormErrors;
        setSubmissionError(apiErrors);
      }
      else {
        toast.error(`Failed to Submit Contact Data`);
      }
    }
  });

  const submitHandler = (inputData: ContactFormData) => {
    setSubmissionError(null); // Clear previous errors on new submission
    mutate(inputData);
    // Handle form submission
  };
  return (
    <div className="bg-gray-50 dark:bg-slate-950 py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Info Side */}
          <div className="bg-[#000080] dark:bg-blue-950 text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF9933] rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>

            <div>
              <h1 className="text-4xl font-black mb-4">GET IN TOUCH</h1>
              <p className="text-gray-300 mb-12">
                Have questions about admission? Want to visit the campus? Reach
                out to us and start your journey today.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-[#FF9933]" />
                  <div>
                    <h3 className="font-bold text-lg">Call Us</h3>
                    <p className="text-gray-300">+91 97297 98025</p>
                    <p className="text-gray-300">+91 97297 98025</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-[#FF9933]" />
                  <div>
                    <h3 className="font-bold text-lg">Email Us</h3>
                    <p className="text-gray-300">admissions@sardarewala.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-[#FF9933]" />
                  <div>
                    <h3 className="font-bold text-lg">Visit Us</h3>
                    <p className="text-gray-300">
                      Sardarewala Physical Training Academy,
                      <br />
                      Village Sardarewala,Fatehabad Harayana 125051
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-white/20">
              <p className="text-sm text-gray-400">
                Working Hours: Mon - Sat, 9:00 AM - 6:00 PM
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="p-12">
            <h2 className="text-2xl font-bold text-[#000080] dark:text-white mb-6">
              Send us a Message
            </h2>
            <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("firstName", {
                      required: "First Name is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors?.firstName?.message}
                    </p>
                  )}
                  {submissionError?.firstName && submissionError.firstName[0] && (
                    <p className="text-sm text-red-500 mt-1">
                      {submissionError.firstName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Last Name is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors?.lastName?.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.email?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Phone Number
                </label>
                <input
                  type="tel"
                  {...register("phone", { min: 10, pattern: /^\d{10}$/ })}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => { e.target.value = e.target.value.replace(/\D/g, "") }}
                  maxLength={10}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                  placeholder="Enter Phone Number"
                />
                {errors.phone && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.phone?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Program Interest
                </label>
                <select
                  {...register("program", { required: "Select the Program" })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none bg-white dark:bg-slate-800 dark:text-white"
                >
                  <option>Army Training</option>
                  <option>Police Training</option>
                  <option>General Fitness</option>
                  <option>Other</option>
                </select>
                {errors.program && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.program?.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  rows={4}
                  {...register("message", { maxLength: 255 })}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FF9933] focus:border-transparent outline-none dark:bg-slate-800 dark:text-white"
                  placeholder="Tell us about your goals..."
                ></textarea>
                {errors.message && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors?.message?.message}
                  </p>
                )}
                {submissionError?.message && submissionError.message[0] && (
                  <p className="text-sm text-red-500 mt-1">
                    {submissionError.message[0]}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={isPending}
                className="w-full"
              >
                {isPending ? "Sending...." : "Send Data"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
