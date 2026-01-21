import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit2, Trash2, Star, Search, Quote, Loader2 } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import type { TestomonialList } from '@/types/types';
import { fetcthTestomonials,removeTestomonialById } from '@/apis/testomonials';
import { TestimonialCardSkeleton } from '@/components/admin/TestomonialCard';

export const AdminTestimonials: React.FC = () => {

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId,setDeletingId] =  useState<number|null>(null);
  const [searchTerm, setSearchTerm] = useState("");


  const { data: testomonialData, isLoading } = useQuery<TestomonialList>({
    queryKey: ['testomonials'],
    queryFn: fetcthTestomonials
  });

  const queryClient = useQueryClient();
  const {mutate:hDelete,isPending} = useMutation({
    mutationFn:removeTestomonialById,
    onMutate:(id:number)=>{
      setDeletingId(id);
    },
    onSuccess:()=>{
      toast.success(`Testomony Card Deleted`);
      queryClient.invalidateQueries({queryKey:["testomonials"]})
    },
    onSettled:()=>{
      setDeletingId(null)
    }
  })

  // const { register, handleSubmit, reset, setValue } = useForm<Partial<Testimonial>>();

  // const openAddModal = () => {
  //   setEditingId(null);
  //   reset({ name: '', role: '', content: '', image: '' });
  //   setIsModalOpen(true);
  // };

  // const openEditModal = (t: Testimonial) => {
  //   setEditingId(t.id);
  //   setValue('name', t.name);
  //   setValue('role', t.role);
  //   setValue('content', t.content);
  //   setValue('image', t.image);
  //   setIsModalOpen(true);
  // };

  // const onSubmit = (data: any) => {
  //   if (editingId) {
  //     const updated = testimonials.map(t => 
  //       t.id === editingId ? { ...t, ...data } : t
  //     );
  //     setTestimonials(updated);
  //     initialTestimonials = updated;
  //   } else {
  //     const newT: Testimonial = {
  //       id: Date.now().toString(),
  //       name: data.name,
  //       role: data.role,
  //       content: data.content,
  //       image: data.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&q=80"
  //     };
  //     const updated = [newT, ...testimonials];
  //     setTestimonials(updated);
  //     initialTestimonials = updated;
  //   }
  //   setIsModalOpen(false);
  //   reset();
  // };

  const handleDelete = (id: number) => {
    if (confirm("Remove this testimonial from the wall of fame?")) {
      hDelete(id);
    }
  };

  // const filtered = testimonials.filter(t => 
  //   t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
  //   t.role.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
            <Quote className="w-6 h-6 mr-2 text-[#FF9933]" />
            Manage Testimonials
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">Control the success stories displayed on the homepage.</p>
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
          <Button className="bg-[#138808] whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" /> Add New
          </Button>
        </div>
      </div>
        {isLoading ?
         <TestimonialCardSkeleton count={5}/> :
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testomonialData ? (testomonialData.data).map((item, _idx) => (
          <div key={_idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100   dark:border-slate-800 p-6 flex flex-col relative group transition-all hover:shadow-md">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img src={item.image_url} alt={item.client_name} className="w-12 h-12 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white leading-tight">{item.client_name}</h4>
                  <p className="text-xs text-[#138808] dark:text-green-500 font-semibold">{item.designation}</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md transition-colors" title="Edit">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={()=>handleDelete(item.id)} disabled={isPending} className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md transition-colors" title="Delete">
                  {deletingId===item.id?<Loader2 className='w-4 h-4 animate-spin'/>:<Trash2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 dark:text-gray-300 italic line-clamp-4">"{item.testimonial_text}"</p>
            </div>
            <div className='mt-4 pt-4 flex item-center justify-between'>
                <div className='flex space-x-0.5'>
                  {Array.from({ length: item?.rating ?? 0 }).map((_, index) => (
                      <Star key={index} className='w-3 h-3 text-[#f5cf14] fill-current' />
                  ))}
                </div>
                <div className='flex'>
                  <span className='text-sm text-gray-400'>Id : {item.id}</span>
                </div>
            </div>
          </div>
        )):
        <p>No Testomonial Data found</p>}
      </div>
      } 
    </div>
  )
}