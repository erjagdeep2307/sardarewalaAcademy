import { LayoutDashboard, Users, Dumbbell, Image as ImageIcon, MessageSquare, Activity, Settings,List,Plus} from 'lucide-react';
export const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/' },
    { icon: Dumbbell, label: 'Programs', path: '/admin/programs' },
    { icon: MessageSquare, label: 'Enquiries', path: '/admin/enquiries' },
    { icon: ImageIcon, label: 'Gallery', path: '/admin/gallery',
      children: [
        { label: 'List View', path: '/admin/gallery', icon: List },
        { label: 'Create', path: '/admin/gallery/create', icon: Plus },
        // { label: 'Edit', path: '/admin/gallery/edit', icon: Edit },
        // { label: 'Delete', path: '/admin/gallery/delete', icon: Trash },
      ]
     },
    { icon: Activity, label: 'Visitor Logs', path: '/admin/visitors' },
    { icon: Users, label: 'Trainers', path: '/admin/trainers' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];