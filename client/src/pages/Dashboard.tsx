import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import DashboardHeader from '../components/DashboardHeader';
import DashboardSection from '../components/DashboardSection';
import AddWidgetModal from '../components/AddWidgetModal';

export default function Dashboard() {
  const { config, searchQuery } = useSelector((state: RootState) => state.dashboard);

  const filteredCategories = config.categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget => 
      widget.enabled && widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="min-h-screen bg-slate-50/30">
      <DashboardHeader />
      
      <main className="p-6">
        {filteredCategories.map((category) => (
          <DashboardSection key={category.id} category={category} />
        ))}
      </main>
      
      <AddWidgetModal />
    </div>
  );
}
