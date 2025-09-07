import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { RiskDonutChartProps } from '../../types/dashboard';

export default function RiskDonutChart({ data, centerValue, legend }: RiskDonutChartProps) {
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
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg font-semibold text-gray-900" data-testid="risk-chart-center-value">
            {centerValue}
          </span>
          <span className="text-xs text-gray-500">Total</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {legend.map((entry, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-700" data-testid={`risk-legend-item-${index}`}>
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
