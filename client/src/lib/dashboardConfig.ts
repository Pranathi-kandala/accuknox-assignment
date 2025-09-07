import { DashboardConfig, Widget } from '../types/dashboard';

export const initialDashboardConfig: DashboardConfig = {
  categories: [
    {
      id: 'cspm',
      name: 'CSPM Executive Dashboard',
      widgets: [
        {
          id: 'cloud-accounts',
          name: 'Cloud Accounts',
          type: 'donut-chart',
          enabled: true,
          configuration: {
            data: [
              { name: 'Connected', value: 2, color: '#3B82F6' },
              { name: 'Not Connected', value: 2, color: '#E5E7EB' }
            ],
            centerValue: '2',
            centerLabel: 'Total'
          }
        },
        {
          id: 'risk-assessment',
          name: 'Cloud Account Risk Assessment',
          type: 'risk-donut-chart',
          enabled: true,
          configuration: {
            data: [
              { name: 'Failed', value: 1689, color: '#EF4444' },
              { name: 'Warning', value: 681, color: '#F59E0B' },
              { name: 'Not available', value: 36, color: '#E5E7EB' },
              { name: 'Passed', value: 7253, color: '#22C55E' }
            ],
            centerValue: '9659',
            legend: [
              { name: 'Failed', value: 1689, color: '#EF4444' },
              { name: 'Warning', value: 681, color: '#F59E0B' },
              { name: 'Not available', value: 36, color: '#E5E7EB' },
              { name: 'Passed', value: 7253, color: '#22C55E' }
            ]
          }
        }
      ]
    },
    {
      id: 'cwpp',
      name: 'CWPP Dashboard',
      widgets: [
        {
          id: 'namespace-alerts',
          name: 'Top 5 Namespace Specific Alerts',
          type: 'empty-state',
          enabled: true
        },
        {
          id: 'workload-alerts',
          name: 'Workload Alerts',
          type: 'empty-state',
          enabled: true
        }
      ]
    },
    {
      id: 'registry',
      name: 'Registry Scan',
      widgets: [
        {
          id: 'image-risk',
          name: 'Image Risk Assessment',
          type: 'horizontal-bar',
          enabled: true,
          configuration: {
            title: '1470 Total Vulnerabilities',
            data: [
              { label: 'Critical', value: 9, color: '#EF4444' },
              { label: 'High', value: 150, color: '#F59E0B' }
            ]
          }
        },
        {
          id: 'image-security',
          name: 'Image Security Issues',
          type: 'horizontal-bar',
          enabled: true,
          configuration: {
            title: '2 Total Images',
            data: [
              { label: 'Critical', value: 2, color: '#EF4444' },
              { label: 'High', value: 2, color: '#F59E0B' }
            ]
          }
        }
      ]
    },
    {
      id: 'ticket',
      name: 'Ticket Management',
      widgets: [
        {
          id: 'ticket-dashboard',
          name: 'Ticket Management Dashboard',
          type: 'ticket-management',
          enabled: true,
          configuration: {
            tickets: [
              { id: 1, name: 'Security Vulnerability Fix', status: 'inprocess' },
              { id: 2, name: 'Database Performance Issue', status: 'unresolved' },
              { id: 3, name: 'Network Configuration Update', status: 'resolved' }
            ]
          }
        }
      ]
    }
  ]
};

export const availableWidgets: Record<string, Widget[]> = {
  csmp: [
    {
      id: 'cloud-accounts',
      name: 'Cloud Accounts',
      type: 'donut-chart',
      enabled: false
    },
    {
      id: 'risk-assessment',
      name: 'Cloud Account Risk Assessment',
      type: 'risk-donut-chart',
      enabled: false
    }
  ],
  cwpp: [
    {
      id: 'namespace-alerts',
      name: 'Top 5 Namespace Specific Alerts',
      type: 'empty-state',
      enabled: false
    },
    {
      id: 'workload-alerts',
      name: 'Workload Alerts',
      type: 'empty-state',
      enabled: false
    }
  ],
  image: [
    {
      id: 'image-risk',
      name: 'Image Risk Assessment',
      type: 'horizontal-bar',
      enabled: false
    },
    {
      id: 'image-security',
      name: 'Image Security Issues',
      type: 'horizontal-bar',
      enabled: false
    }
  ],
  ticket: [
    {
      id: 'ticket-management',
      name: 'Ticket Management',
      type: 'empty-state',
      enabled: false
    }
  ]
};
