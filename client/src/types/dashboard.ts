export interface Widget {
  id: string;
  name: string;
  type: 'donut-chart' | 'risk-donut-chart' | 'horizontal-bar' | 'empty-state' | 'ticket-management';
  enabled: boolean;
  configuration?: Record<string, any>;
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardConfig {
  categories: Category[];
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps {
  data: ChartData[];
  centerValue: string;
  centerLabel?: string;
}

export interface RiskDonutChartProps {
  data: ChartData[];
  centerValue: string;
  legend: Array<{ name: string; value: number; color: string }>;
}

export interface HorizontalBarChartProps {
  title: string;
  data: Array<{ label: string; value: number; color: string }>;
}
