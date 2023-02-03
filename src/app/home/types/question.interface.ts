type QuestionType = 'single' | 'multi';
type QuestionDifficulty = 'light' | 'medium' | 'hard';

export interface QuestionInterface {
  id: number;
  title: string;
  content: { options: string[]; correctAnswer: string[] };
  type: QuestionType;
  difficulty: QuestionDifficulty;
  description: string;
  timer: number;
  topicId: number;
  moderationId: number;
}
