import { Button } from '@/components/UI/Button';
import { ImageIcon, Plus, Search } from 'lucide-react';
import { Outlet } from 'react-router-dom';
export const AdminGalleryLayout: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
                        <ImageIcon className="w-6 h-6 mr-2 text-[#FF9933]" />
                        Gallery Management
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Pubic Gallery Management (List,Create,Update and Delete Events).</p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:flex-none">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name..."
                            className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg outline-none focus:ring-2 focus:ring-[#FF9933] w-full md:w-64 bg-white dark:bg-slate-900 dark:text-white text-sm"
                        />
                    </div>
                    <Button
                        className="bg-[#138808] whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4 mr-2" /> Add New
                    </Button>
                </div>
            </div>
            {/* Reusable Upload Component */}
            <Outlet />
        </div>
    );
};