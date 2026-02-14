import React from 'react';
import { useNavigate,Link} from 'react-router-dom';
import { ArrowLeft,Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/UI/Button';
import {useForm} from 'react-hook-form';
import type { LoginData } from '@/types/auth.types';
import logo from "/logo.svg";
import { useMutation } from '@tanstack/react-query';
import { login } from '@/apis/auth';
import { toast } from 'react-toastify';
import { useAuth } from '@/hooks/AuthHook';
import { setAccessToken } from '@/contexts/Token';
export const Login: React.FC = () => {
  const navigate = useNavigate();
  const {setUser,setToken} = useAuth();
  const {register,handleSubmit,formState:{errors}} = useForm<LoginData>();

  const {mutate:authenticate,isPending} =  useMutation({
    mutationFn:login,
    onSuccess:(data)=>{
      console.log(data);
      if(data.data && data.status==="success")
      {
        console.log(data?.data?.userData);
        setUser(data?.data?.userData);
        setToken(data?.data?.token);
        setAccessToken(data?.data.token);
        console.log("Login Successful");
        navigate('/admin');
      }
      else{
        toast.error(data?.message || "Login failed");
      }
    },  
    onError:(err)=>{
      console.error(err);
    }
  });
  const handleLogin = (data: LoginData) => {
    authenticate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Background with Brand Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000080]/80 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-md p-4">
        {/* Navigation Back */}
        <Link 
          to="/" 
          className="inline-flex items-center text-white/70 hover:text-white mb-6 transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" />
          Back to Website
        </Link>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#FF9933]">
          <div className="p-8">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="bg-[#ffffff] p-3 rounded-full mb-4 shadow-lg">
                {/* <Dumbbell className="w-8 h-8 text-[#FF9933]" /> */}
                <img src={logo} className="h-10 w-10" alt='SPTA' />
              </div>
              <h2 className="text-2xl font-black text-[#000080] dark:text-white tracking-tight">ADMIN PORTAL</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sardarewala Physical Training Academy</p>
            </div>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Email Address</label>
                <div className="relative">
                  <input 
                    type="email"
                    {...register("email",{required:"Email is Required"})} 
                    required
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent transition-all dark:text-white"
                    placeholder="name@company.com"
                  />
                  {errors.email && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.email.message}
                        </p>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center px-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-bold text-[#FF9933] hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <input 
                    type="password" 
                    {...register('password',{required:"Password is required"})}
                    defaultValue="password"
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-[#FF9933] focus:border-transparent transition-all dark:text-white"
                    placeholder="••••••••"
                  />
                  {errors.password && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.password.message}
                        </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 px-1">
                <input type="checkbox" id="remember" className="rounded text-[#FF9933] focus:ring-[#FF9933]" />
                <label htmlFor="remember" className="text-xs text-gray-500 dark:text-gray-400 font-medium cursor-pointer">Remember this device</label>
              </div>

              <Button type="submit" className="w-full h-12 text-sm uppercase tracking-widest shadow-lg shadow-[#FF9933]/20">
                <Lock className="w-4 h-4 mr-2" />
                {isPending ? "Logging in..." : "Secure Login"}
              </Button>
            </form>
          </div>

          <div className="bg-gray-50 dark:bg-slate-800/50 p-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#138808]" />
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
              Encrypted Session • Authorized Personnel Only
            </span>
          </div>
        </div>

        <p className="text-center mt-8 text-white/40 text-[10px] uppercase tracking-[0.2em]">
          Powered by Sardarewala Tech Systems
        </p>
      </div>
    </div>
  );
};
