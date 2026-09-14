export interface Task {
  id: number;
  name: string;
  completed: boolean;
  completedAt: Date | null;
}

export interface Post {
  id: number;
  materia: string;
  assunto: string;
  descricao: string;
  habilitado: number;
  autor?: string
}