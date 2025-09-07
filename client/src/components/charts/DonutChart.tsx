import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { DonutChartProps } from '../../types/dashboard';

export default function DonutChart({ data, centerValue, centerLabel }: DonutChartProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex flex-col items-center relative w-32 h-32">
        <PieChart width={120} height={120}>
          <Pie
            data={data}
            cx={60}
            cy={60}
            innerRadius={30}
            outerRadius={50}
            paddingAngle={0}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-gray-900" data-testid="chart-center-value">
            {centerValue}
          </span>
          {centerLabel && (
            <span className="text-xs text-gray-500" data-testid="chart-center-label">
              {centerLabel}
            </span>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        {data.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700" data-testid={`legend-item-${index}`}>
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
