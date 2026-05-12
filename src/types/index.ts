
export interface Note {
  id: string;           
  title: string;        
  content: string;      
  createdAt: number;    
  updatedAt: number;    
}

export interface Task {
  id: string;
  text: string;
  completed: boolean;   
  createdAt: number;
}