import { HorizontalBarChartProps } from '../../types/dashboard';

export default function HorizontalBarChart({ title, data }: HorizontalBarChartProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm">
        <span data-testid="bar-chart-title">{title}</span>
      </div>
      
      <div className="relative">
        <div className="h-6 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full flex">
            {data.map((item, index) => (
              <div
                key={index}
                className="h-full first:rounded-l-full last:rounded-r-full"
                style={{
                  backgroundColor: item.color,
                  width: `${(item.value / data.reduce((sum, d) => sum + d.value, 0)) * 100}%`
                }}
                data-testid={`bar-segment-${index}`}
              />
            ))}
          </div>
        </div>
        
        <div className="absolute inset-0 flex items-center justify-between px-3 text-xs text-white font-medium">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-1">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span data-testid={`bar-label-${index}`}>
                {item.label} ({item.value})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
