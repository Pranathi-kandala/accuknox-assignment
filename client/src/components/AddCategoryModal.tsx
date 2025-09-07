import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../store/dashboardSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');

  const handleClose = () => {
    setCategoryName('');
    onClose();
  };

  const handleCreate = () => {
    if (categoryName.trim()) {
      const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
      dispatch(addCategory({ id: categoryId, name: categoryName }));
      handleClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md" data-testid="modal-add-category">
        <DialogHeader>
          <DialogTitle>Create New Dashboard</DialogTitle>
          <DialogDescription>
            Create a new dashboard section to organize your widgets
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-6">
          <div>
            <Label htmlFor="category-name">Dashboard Name</Label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="e.g., Security Monitoring, Performance Dashboard"
              data-testid="input-category-name"
            />
          </div>
        </div>
        
        <div className="flex items-center justify-end space-x-3 mt-6">
          <Button variant="outline" onClick={handleClose} data-testid="button-cancel-category">
            Cancel
          </Button>
          <Button 
            onClick={handleCreate} 
            disabled={!categoryName.trim()}
            data-testid="button-create-category"
          >
            Create Dashboard
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}