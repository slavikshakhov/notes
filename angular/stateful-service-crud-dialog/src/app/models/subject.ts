export enum Level {
  all = 'all',
  beginner = 'beginner',
  intermediate = 'intermediate',
  advanced = 'advanced',
}

export interface Subject {
  id: number;
  name: string;
  credits: number;
  level: Level;
  instructor?: string
}
