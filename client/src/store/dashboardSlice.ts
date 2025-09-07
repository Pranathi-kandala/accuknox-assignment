import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DashboardConfig, Widget } from '../types/dashboard';
import { initialDashboardConfig } from '../lib/dashboardConfig';

interface DashboardState {
  config: DashboardConfig;
  searchQuery: string;
  isAddWidgetModalOpen: boolean;
  activeModalTab: string;
}

const initialState: DashboardState = {
  config: initialDashboardConfig,
  searchQuery: '',
  isAddWidgetModalOpen: false,
  activeModalTab: 'cspm',
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<{ categoryId: string; widget: Widget }>) => {
      const category = state.config.categories.find(cat => cat.id === action.payload.categoryId);
      if (category) {
        category.widgets.push({ ...action.payload.widget, enabled: true });
      }
    },
    removeWidget: (state, action: PayloadAction<{ categoryId: string; widgetId: string }>) => {
      const category = state.config.categories.find(cat => cat.id === action.payload.categoryId);
      if (category) {
        category.widgets = category.widgets.filter(widget => widget.id !== action.payload.widgetId);
      }
    },
    toggleWidget: (state, action: PayloadAction<{ categoryId: string; widgetId: string; enabled: boolean }>) => {
      const category = state.config.categories.find(cat => cat.id === action.payload.categoryId);
      if (category) {
        const widget = category.widgets.find(w => w.id === action.payload.widgetId);
        if (widget) {
          widget.enabled = action.payload.enabled;
        }
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    openAddWidgetModal: (state, action: PayloadAction<string>) => {
      state.isAddWidgetModalOpen = true;
      state.activeModalTab = action.payload;
    },
    closeAddWidgetModal: (state) => {
      state.isAddWidgetModalOpen = false;
    },
    setActiveModalTab: (state, action: PayloadAction<string>) => {
      state.activeModalTab = action.payload;
    },
    updateWidgetConfiguration: (state, action: PayloadAction<{ categoryId: string; widgetId: string; config: Record<string, any> }>) => {
      const category = state.config.categories.find(cat => cat.id === action.payload.categoryId);
      if (category) {
        const widget = category.widgets.find(w => w.id === action.payload.widgetId);
        if (widget) {
          widget.configuration = { ...widget.configuration, ...action.payload.config };
        }
      }
    },
    addCategory: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const newCategory = {
        id: action.payload.id,
        name: action.payload.name,
        widgets: []
      };
      state.config.categories.push(newCategory);
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.config.categories = state.config.categories.filter(
        category => category.id !== action.payload
      );
    },
  },
});

export const {
  addWidget,
  removeWidget,
  toggleWidget,
  setSearchQuery,
  openAddWidgetModal,
  closeAddWidgetModal,
  setActiveModalTab,
  updateWidgetConfiguration,
  addCategory,
  removeCategory,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
