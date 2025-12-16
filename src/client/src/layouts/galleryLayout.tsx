import { Outlet } from 'react-router-dom';
export const AdminGalleryLayout: React.FC = () => {

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Gallery Management</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Pubic Gallery Management (List,Create,Update and Delete Events).</p>
            </div>
            {/* Reusable Upload Component */}
            <Outlet />
        </div>
    );
};