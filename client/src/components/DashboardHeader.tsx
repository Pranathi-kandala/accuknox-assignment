import { Search, Bell, Plus, RefreshCw, MoreVertical, Clock, Layout, Settings } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setSearchQuery } from '../store/dashboardSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import AddCategoryModal from './AddCategoryModal';

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.dashboard.searchQuery);
  const [timeValue, setTimeValue] = useState('2');
  const [timeUnit, setTimeUnit] = useState('days');
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <div>
      {/* Navigation Breadcrumb */}
      <header className="bg-slate-50/50 border-b border-slate-200/50 px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <nav className="text-sm text-gray-600">
              <span>Home</span>
              <span className="mx-2">{'>'}</span>
              <span className="text-gray-900 font-medium">Dashboard V2</span>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="w-80 pl-4 pr-10"
                data-testid="search-input"
              />
              <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" data-testid="notifications-button">
              <Bell className="w-5 h-5" />
            </Button>
            
            {/* User Menu */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full" data-testid="user-avatar" />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Controls */}
      <div className="bg-slate-50/50 px-6 py-4 border-b border-slate-200/50">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">CNAPP Dashboard</h1>
          <div className="flex items-center space-x-4">
            {/* Create Dashboard Button */}
            <Button
              variant="outline"
              onClick={() => setIsAddCategoryModalOpen(true)}
              className="flex items-center space-x-2"
              data-testid="button-create-dashboard"
            >
              <span>Create Dashboard</span>
              <Layout className="w-4 h-4" />
            </Button>
            
            {/* Refresh Button */}
            <Button variant="outline" size="icon" data-testid="button-refresh">
              <RefreshCw className="w-4 h-4" />
            </Button>
            
            {/* Settings */}
            <Popover open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="icon" data-testid="button-settings">
                  <Settings className="w-4 h-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" data-testid="settings-panel">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm">Dashboard Settings</h4>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700">Theme</label>
                      <Select defaultValue="light">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-xs font-medium text-gray-700">Auto Refresh</label>
                      <Select defaultValue="off">
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="off">Off</SelectItem>
                          <SelectItem value="30s">30 seconds</SelectItem>
                          <SelectItem value="1m">1 minute</SelectItem>
                          <SelectItem value="5m">5 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setIsAddCategoryModalOpen(true)}
                      >
                        <Layout className="w-4 h-4 mr-2" />
                        Create New Dashboard
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Dynamic Time Filter */}
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-1">
              <Clock className="w-4 h-4 text-gray-500 ml-1" />
              <span className="text-sm text-gray-600">Last</span>
              <Input
                type="number"
                value={timeValue}
                onChange={(e) => setTimeValue(e.target.value)}
                className="w-16 h-8 border-0 p-1 text-center"
                min="1"
                data-testid="input-time-value"
              />
              <Select value={timeUnit} onValueChange={setTimeUnit}>
                <SelectTrigger className="w-20 h-8 border-0" data-testid="select-time-unit">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hours">hrs</SelectItem>
                  <SelectItem value="days">days</SelectItem>
                  <SelectItem value="weeks">weeks</SelectItem>
                  <SelectItem value="months">months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      <AddCategoryModal 
        isOpen={isAddCategoryModalOpen} 
        onClose={() => setIsAddCategoryModalOpen(false)} 
      />
    </div>
  );
}
