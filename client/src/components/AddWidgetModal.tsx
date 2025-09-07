import { X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { closeAddWidgetModal, setActiveModalTab, toggleWidget, addWidget } from '../store/dashboardSlice';
import { availableWidgets } from '../lib/dashboardConfig';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';

export default function AddWidgetModal() {
  const dispatch = useDispatch();
  const { isAddWidgetModalOpen, activeModalTab, config } = useSelector((state: RootState) => state.dashboard);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [widgetType, setWidgetType] = useState<'donut-chart' | 'risk-donut-chart' | 'horizontal-bar' | 'empty-state' | 'ticket-management'>('empty-state');
  const [jsonData, setJsonData] = useState('');
  const [simpleData, setSimpleData] = useState('');
  const [colorTheme, setColorTheme] = useState('blues');
  const [dataFormat, setDataFormat] = useState<'simple' | 'json'>('simple');
  const [activeView, setActiveView] = useState<'existing' | 'new'>('existing');

  const handleClose = () => {
    dispatch(closeAddWidgetModal());
    setWidgetName('');
    setWidgetText('');
    setWidgetType('empty-state');
    setJsonData('');
    setSimpleData('');
    setColorTheme('blues');
    setDataFormat('simple');
    setActiveView('existing');
  };

  const handleTabChange = (value: string) => {
    dispatch(setActiveModalTab(value));
  };

  const handleWidgetToggle = (widgetId: string, enabled: boolean) => {
    // Find which category this widget belongs to based on the active tab
    const categoryMapping: Record<string, string> = {
      csmp: 'csmp',
      cwpp: 'cwpp', 
      image: 'registry',
      ticket: 'ticket'
    };
    
    const categoryId = categoryMapping[activeModalTab] || 'csmp';
    dispatch(toggleWidget({ categoryId, widgetId, enabled }));
  };

  const getWidgetStatus = (widgetId: string) => {
    // Check if widget is enabled in any category
    for (const category of config.categories) {
      const widget = category.widgets.find(w => w.id === widgetId);
      if (widget) {
        return widget.enabled;
      }
    }
    return false;
  };

  const getColorPalette = (theme: string) => {
    const palettes: Record<string, string[]> = {
      blues: ['#1E40AF', '#3B82F6', '#60A5FA', '#93C5FD', '#DBEAFE'],
      reds: ['#DC2626', '#EF4444', '#F87171', '#FCA5A5', '#FEE2E2'],
      greens: ['#059669', '#10B981', '#34D399', '#6EE7B7', '#D1FAE5'],
      yellows: ['#D97706', '#F59E0B', '#FBBF24', '#FCD34D', '#FEF3C7'],
      purples: ['#7C3AED', '#8B5CF6', '#A78BFA', '#C4B5FD', '#EDE9FE'],
      oranges: ['#EA580C', '#F97316', '#FB923C', '#FDBA74', '#FED7AA']
    };
    return palettes[theme] || palettes.blues;
  };

  const parseSimpleData = (data: string, theme: string) => {
    const colors = getColorPalette(theme);
    const pairs = data.split(',').map(pair => pair.trim());
    const parsedData = pairs.map((pair, index) => {
      const [name, value] = pair.split(':').map(s => s.trim());
      return {
        name: name,
        value: parseInt(value) || 0,
        color: colors[index % colors.length]
      };
    });
    return parsedData;
  };

  const handleCreateWidget = () => {
    if (widgetName.trim()) {
      let configuration: any = {};
      
      if (widgetType === 'empty-state' && widgetText.trim()) {
        configuration = { text: widgetText };
      } else if (widgetType === 'ticket-management') {
        configuration = { tickets: [] };
      } else if (widgetType === 'donut-chart' || widgetType === 'risk-donut-chart' || widgetType === 'horizontal-bar') {
        if (dataFormat === 'simple' && simpleData.trim()) {
          // Parse simple data format like "a:20,b:60"
          const parsedData = parseSimpleData(simpleData, colorTheme);
          const totalValue = parsedData.reduce((sum, item) => sum + item.value, 0);
          
          if (widgetType === 'donut-chart') {
            configuration = {
              data: parsedData,
              centerValue: totalValue.toString(),
              centerLabel: 'Total'
            };
          } else if (widgetType === 'risk-donut-chart') {
            configuration = {
              data: parsedData,
              centerValue: totalValue.toString(),
              legend: parsedData
            };
          } else if (widgetType === 'horizontal-bar') {
            configuration = {
              title: `${totalValue} Total Items`,
              data: parsedData.map(item => ({
                label: item.name,
                value: item.value,
                color: item.color
              }))
            };
          }
        } else if (dataFormat === 'json' && jsonData.trim()) {
          // Parse JSON data
          try {
            configuration = JSON.parse(jsonData);
          } catch (error) {
            alert('Invalid JSON format. Please check your data.');
            return;
          }
        }
      }

      const newWidget = {
        id: `custom-${Date.now()}`,
        name: widgetName,
        type: widgetType,
        enabled: true,
        configuration
      };
      
      // Use activeModalTab directly if it matches a real category, otherwise use mapping
      const categoryMapping: Record<string, string> = {
        csmp: 'cspm',
        cwpp: 'cwpp', 
        image: 'registry',
        ticket: 'ticket'
      };
      
      // Check if activeModalTab is a real category ID or needs mapping
      const categories = config.categories.map(cat => cat.id);
      const categoryId = categories.includes(activeModalTab) ? activeModalTab : (categoryMapping[activeModalTab] || 'cspm');
      dispatch(addWidget({ categoryId, widget: newWidget }));
      handleClose();
    }
  };

  const getJsonPlaceholder = () => {
    switch (widgetType) {
      case 'donut-chart':
        return `{
  "data": [
    {"name": "Connected", "value": 5, "color": "#3B82F6"},
    {"name": "Not Connected", "value": 3, "color": "#E5E7EB"}
  ],
  "centerValue": "5",
  "centerLabel": "Total"
}`;
      case 'risk-donut-chart':
        return `{
  "data": [
    {"name": "Failed", "value": 1689, "color": "#EF4444"},
    {"name": "Warning", "value": 681, "color": "#F59E0B"},
    {"name": "Passed", "value": 7253, "color": "#22C55E"}
  ],
  "centerValue": "9623",
  "legend": [
    {"name": "Failed", "value": 1689, "color": "#EF4444"},
    {"name": "Warning", "value": 681, "color": "#F59E0B"},
    {"name": "Passed", "value": 7253, "color": "#22C55E"}
  ]
}`;
      case 'horizontal-bar':
        return `{
  "title": "1500 Total Vulnerabilities",
  "data": [
    {"label": "Critical", "value": 12, "color": "#EF4444"},
    {"label": "High", "value": 200, "color": "#F59E0B"}
  ]
}`;
      default:
        return 'Enter your JSON data here';
    }
  };

  const handleConfirm = () => {
    if (activeView === 'new') {
      handleCreateWidget();
    } else {
      // The widgets are already updated via toggleWidget calls
      handleClose();
    }
  };

  return (
    <Dialog open={isAddWidgetModalOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="modal-add-widget">
        <DialogHeader>
          <DialogTitle>Add Widget</DialogTitle>
          <DialogDescription>
            Personalise your dashboard by adding the following widget
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex space-x-2">
          <Button
            variant={activeView === 'existing' ? 'default' : 'outline'}
            onClick={() => setActiveView('existing')}
            data-testid="button-existing-widgets"
          >
            Existing Widgets
          </Button>
          <Button
            variant={activeView === 'new' ? 'default' : 'outline'}
            onClick={() => setActiveView('new')}
            data-testid="button-new-widget"
          >
            Create New Widget
          </Button>
        </div>

        {activeView === 'existing' ? (
          <Tabs value={activeModalTab} onValueChange={handleTabChange} className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="csmp" data-testid="tab-csmp">CSPM</TabsTrigger>
              <TabsTrigger value="cwpp" data-testid="tab-cwpp">CWPP</TabsTrigger>
              <TabsTrigger value="image" data-testid="tab-image">Image</TabsTrigger>
              <TabsTrigger value="ticket" data-testid="tab-ticket">Ticket</TabsTrigger>
            </TabsList>
            
            {Object.entries(availableWidgets).map(([tabKey, widgets]) => (
              <TabsContent key={tabKey} value={tabKey} className="mt-6 space-y-3 max-h-96 overflow-y-auto">
                {widgets.map((widget) => (
                  <div key={widget.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Checkbox
                      id={widget.id}
                      checked={getWidgetStatus(widget.id)}
                      onCheckedChange={(checked) => handleWidgetToggle(widget.id, !!checked)}
                      data-testid={`checkbox-widget-${widget.id}`}
                    />
                    <Label htmlFor={widget.id} className="flex-1 cursor-pointer text-sm">
                      {widget.name}
                    </Label>
                  </div>
                ))}
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className="mt-6 space-y-4">
            <div>
              <Label htmlFor="widget-name">Widget Name</Label>
              <Input
                id="widget-name"
                value={widgetName}
                onChange={(e) => setWidgetName(e.target.value)}
                placeholder="Enter widget name"
                data-testid="input-widget-name"
              />
            </div>
            
            <div>
              <Label htmlFor="widget-type">Widget Type</Label>
              <Select value={widgetType} onValueChange={(value: any) => setWidgetType(value)}>
                <SelectTrigger data-testid="select-widget-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="empty-state">Text Widget</SelectItem>
                  <SelectItem value="donut-chart">Donut Chart</SelectItem>
                  <SelectItem value="risk-donut-chart">Risk Donut Chart</SelectItem>
                  <SelectItem value="horizontal-bar">Horizontal Bar Chart</SelectItem>
                  <SelectItem value="ticket-management">Ticket Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {widgetType === 'empty-state' ? (
              <div>
                <Label htmlFor="widget-text">Widget Text</Label>
                <Textarea
                  id="widget-text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  placeholder="Enter widget text content"
                  rows={3}
                  data-testid="input-widget-text"
                />
              </div>
            ) : widgetType === 'ticket-management' ? (
              <div className="text-center py-4 text-gray-500">
                <p className="text-sm">Ticket Management widget will be created with an empty ticket list.</p>
                <p className="text-xs">You can add tickets after creating the widget.</p>
              </div>
            ) : (
              <>
                <div>
                  <Label htmlFor="color-theme">Color Theme</Label>
                  <Select value={colorTheme} onValueChange={setColorTheme}>
                    <SelectTrigger data-testid="select-color-theme">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blues">Blues</SelectItem>
                      <SelectItem value="reds">Reds</SelectItem>
                      <SelectItem value="greens">Greens</SelectItem>
                      <SelectItem value="yellows">Yellows</SelectItem>
                      <SelectItem value="purples">Purples</SelectItem>
                      <SelectItem value="oranges">Oranges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Data Format</Label>
                  <div className="flex space-x-4 mt-2">
                    <Button
                      type="button"
                      variant={dataFormat === 'simple' ? 'default' : 'outline'}
                      onClick={() => setDataFormat('simple')}
                      data-testid="button-simple-format"
                    >
                      Simple (a:20,b:60)
                    </Button>
                    <Button
                      type="button"
                      variant={dataFormat === 'json' ? 'default' : 'outline'}
                      onClick={() => setDataFormat('json')}
                      data-testid="button-json-format"
                    >
                      JSON Format
                    </Button>
                  </div>
                </div>

                {dataFormat === 'simple' ? (
                  <div>
                    <Label htmlFor="simple-data">Chart Data</Label>
                    <Input
                      id="simple-data"
                      value={simpleData}
                      onChange={(e) => setSimpleData(e.target.value)}
                      placeholder="a:20,b:60,c:30"
                      data-testid="input-simple-data"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Format: name:value,name:value (e.g., Critical:15,High:25,Medium:10)
                    </p>
                  </div>
                ) : (
                  <div>
                    <Label htmlFor="json-data">Chart Data (JSON)</Label>
                    <Textarea
                      id="json-data"
                      value={jsonData}
                      onChange={(e) => setJsonData(e.target.value)}
                      placeholder={getJsonPlaceholder()}
                      rows={8}
                      data-testid="input-json-data"
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter JSON data for the chart. See placeholder for format.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 bg-gray-50 -mx-6 -mb-6 px-6 py-4">
          <Button variant="outline" onClick={handleClose} data-testid="button-cancel-modal">
            Cancel
          </Button>
          <Button onClick={handleConfirm} data-testid="button-confirm-modal">
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
