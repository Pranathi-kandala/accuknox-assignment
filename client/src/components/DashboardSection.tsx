import { Plus, Trash2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { Category } from '../types/dashboard';
import { openAddWidgetModal, removeCategory } from '../store/dashboardSlice';
import WidgetCard from './WidgetCard';
import { Button } from '@/components/ui/button';

interface DashboardSectionProps {
  category: Category;
}

export default function DashboardSection({ category }: DashboardSectionProps) {
  const dispatch = useDispatch();
  
  // Check if this is a custom category (not one of the original ones)
  const isCustomCategory = !['cspm', 'cwpp', 'registry', 'ticket'].includes(category.id);

  const handleDeleteCategory = () => {
    if (confirm(`Are you sure you want to delete "${category.name}" dashboard? This action cannot be undone.`)) {
      dispatch(removeCategory(category.id));
    }
  };

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">{category.name}</h2>
        {isCustomCategory && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeleteCategory}
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
            data-testid={`button-delete-category-${category.id}`}
          >
            <Trash2 className="w-4 h-4 mr-1" />
            Delete Dashboard
          </Button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            categoryId={category.id}
          />
        ))}
        
        {/* Add Widget Placeholder */}
        <div className="bg-slate-50/40 rounded-lg shadow-sm border border-slate-200/60 p-6 flex items-center justify-center min-h-[200px]">
          <Button
            variant="ghost"
            onClick={() => dispatch(openAddWidgetModal(category.id))}
            className="flex items-center space-x-2 text-gray-500 hover:text-gray-700"
            data-testid={`button-add-widget-${category.id}`}
          >
            <Plus className="w-5 h-5" />
            <span>Add Widget</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
