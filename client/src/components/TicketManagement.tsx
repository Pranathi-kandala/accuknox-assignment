import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateWidgetConfiguration } from '../store/dashboardSlice';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Ticket } from 'lucide-react';

interface TicketManagementProps {
  tickets: Array<{ id: number; name: string; status: string }>;
  onUpdateTicket?: (id: number, updates: any) => void;
  onAddTicket?: (ticket: any) => void;
  widgetId?: string;
  categoryId?: string;
}

export default function TicketManagement({ tickets = [], onUpdateTicket, onAddTicket, widgetId, categoryId }: TicketManagementProps) {
  const dispatch = useDispatch();
  const [newTicketName, setNewTicketName] = useState('');
  const [showAddTicket, setShowAddTicket] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'inprocess': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'unresolved': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleStatusChange = (ticketId: number, newStatus: string) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, status: newStatus } : ticket
    );
    
    if (widgetId && categoryId) {
      dispatch(updateWidgetConfiguration({ 
        categoryId, 
        widgetId, 
        config: { tickets: updatedTickets } 
      }));
    }
    
    if (onUpdateTicket) {
      onUpdateTicket(ticketId, { status: newStatus });
    }
  };

  const handleAddTicket = () => {
    if (newTicketName.trim()) {
      const newTicket = {
        id: Date.now(),
        name: newTicketName,
        status: 'unresolved'
      };
      
      const updatedTickets = [...tickets, newTicket];
      
      if (widgetId && categoryId) {
        dispatch(updateWidgetConfiguration({ 
          categoryId, 
          widgetId, 
          config: { tickets: updatedTickets } 
        }));
      }
      
      if (onAddTicket) {
        onAddTicket(newTicket);
      }
      
      setNewTicketName('');
      setShowAddTicket(false);
    }
  };

  return (
    <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
      {tickets.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          <Ticket className="w-12 h-12 mx-auto mb-2 text-gray-300" />
          <p className="text-sm">No tickets found</p>
        </div>
      ) : (
        tickets.map((ticket) => (
          <div key={ticket.id} className="border border-gray-200 rounded-lg p-3 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-gray-900 flex-1 pr-2" data-testid={`ticket-name-${ticket.id}`}>
                {ticket.name}
              </h4>
              <span className={`px-2 py-1 text-xs rounded border ${getStatusColor(ticket.status)}`}>
                {ticket.status}
              </span>
            </div>
            <Select value={ticket.status} onValueChange={(status) => handleStatusChange(ticket.id, status)}>
              <SelectTrigger className="h-8 w-full" data-testid={`select-status-${ticket.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="z-50">
                <SelectItem value="unresolved">Unresolved</SelectItem>
                <SelectItem value="inprocess">In Process</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))
      )}
      
      {showAddTicket ? (
        <div className="border border-gray-200 rounded-lg p-3 space-y-2 bg-gray-50">
          <Input
            value={newTicketName}
            onChange={(e) => setNewTicketName(e.target.value)}
            placeholder="Enter ticket name"
            className="h-8"
            data-testid="input-new-ticket-name"
          />
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleAddTicket} data-testid="button-add-ticket">
              Add
            </Button>
            <Button size="sm" variant="outline" onClick={() => setShowAddTicket(false)} data-testid="button-cancel-ticket">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddTicket(true)}
          className="w-full"
          data-testid="button-show-add-ticket"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Ticket
        </Button>
      )}
    </div>
  );
}