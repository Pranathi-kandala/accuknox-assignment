import { X, BarChart3 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Widget } from '../types/dashboard';
import { removeWidget } from '../store/dashboardSlice';
import { Button } from '@/components/ui/button';
import DonutChart from './charts/DonutChart';
import RiskDonutChart from './charts/RiskDonutChart';
import HorizontalBarChart from './charts/HorizontalBarChart';
import TicketManagement from './TicketManagement';

interface WidgetCardProps {
  widget: Widget;
  categoryId: string;
}

export default function WidgetCard({ widget, categoryId }: WidgetCardProps) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeWidget({ categoryId, widgetId: widget.id }));
  };

  const renderWidgetContent = () => {
    switch (widget.type) {
      case 'donut-chart':
        return (
          <DonutChart
            data={widget.configuration?.data || []}
            centerValue={widget.configuration?.centerValue || '0'}
            centerLabel={widget.configuration?.centerLabel}
          />
        );
      case 'risk-donut-chart':
        return (
          <RiskDonutChart
            data={widget.configuration?.data || []}
            centerValue={widget.configuration?.centerValue || '0'}
            legend={widget.configuration?.legend || []}
          />
        );
      case 'horizontal-bar':
        return (
          <HorizontalBarChart
            title={widget.configuration?.title || 'No data available'}
            data={widget.configuration?.data || []}
          />
        );
      case 'ticket-management':
        return (
          <TicketManagement
            tickets={widget.configuration?.tickets || []}
            widgetId={widget.id}
            categoryId={categoryId}
          />
        );
      case 'empty-state':
      default:
        return (
          <div className="flex flex-col h-32 text-gray-500 overflow-y-auto">
            {widget.configuration?.text ? (
              <div className="p-4">
                {widget.configuration.text.includes(',') || widget.configuration.text.includes('\n') ? (
                  <ul className="space-y-1">
                    {widget.configuration.text
                      .split(/[,\n]/)
                      .map((item: string, index: number) => (
                        item.trim() && (
                          <li key={index} className="text-sm flex items-center">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 flex-shrink-0"></span>
                            {item.trim()}
                          </li>
                        )
                      ))}
                  </ul>
                ) : (
                  <p className="text-sm text-center">{widget.configuration.text}</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <BarChart3 className="w-12 h-12 mb-2 text-gray-300" />
                <span className="text-sm">No graph data available!</span>
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <div className="bg-slate-50/40 rounded-lg shadow-sm border border-slate-200/60 p-6 relative z-10" data-testid={`widget-${widget.id}`}>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleRemove}
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 h-6 w-6"
        data-testid={`button-remove-widget-${widget.id}`}
      >
        <X className="w-4 h-4" />
      </Button>
      
      <h3 className="text-sm font-medium text-gray-900 mb-4" data-testid={`text-widget-title-${widget.id}`}>
        {widget.name}
      </h3>
      
      <div data-testid={`content-widget-${widget.id}`}>
        {renderWidgetContent()}
      </div>
    </div>
  );
}
