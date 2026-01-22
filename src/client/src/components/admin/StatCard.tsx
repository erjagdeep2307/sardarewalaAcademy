import { TrendingUp } from "lucide-react";
interface StatCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: { bg: string; text: string };
  trend: string;
}

export const StatCard = ({
  label,
  value,
  icon: Icon,
  color,
  trend,
}: StatCardProps) => (
  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 transition-colors duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
          {value}
        </p>
      </div>
      <div className={`p-3 rounded-lg bg-opacity-10 ${color.bg}`}>
        <Icon className={`w-6 h-6 ${color.text}`} />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="text-green-600 dark:text-green-400 font-medium flex items-center">
        <TrendingUp className="w-4 h-4 mr-1" />
        {trend}
      </span>
      <span className="text-gray-400 dark:text-gray-500 ml-2">
        vs last month
      </span>
    </div>
  </div>
);