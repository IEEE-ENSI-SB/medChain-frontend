import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  change: number;
  Icon: LucideIcon;
  backgroundColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  change, 
  Icon: Icon, 
  backgroundColor
}) => {
  return (
    <div className={`flex-1 rounded-lg p-4 ${backgroundColor} text-white`}>
      <div className="flex justify-between items-start h-full">
        <div>
          <h3 className="text-sm font-medium mb-2">{title}</h3>
          <div className="flex items-center">
            <p className="text-3xl font-bold mr-2">{value}</p>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              <p className="text-sm font-medium">
                {change > 0 ? '+' : ''}{change}%
              </p>
            </div>
          </div>
        </div>
        <div className="p-3 bg-white bg-opacity-30 rounded-full">
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;