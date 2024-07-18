export interface TodoItem {
  // editingTitle: string;
  // editingDueDate: string;
  id: string;
  title: string;
  completed: boolean;
  creationDate?: Date;
  dueDate?: Date;
  lastUpdatedDate?: Date;
  editing?: boolean;  
}
