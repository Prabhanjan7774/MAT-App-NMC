export type ModuleId = "Numerical" | "Verbal" | "Visual" | "Situational";

export interface Topic {
  id: string; // "1" to "36"
  name: string;
  moduleId: ModuleId;
  description: string;
  order: number;
}

export type QuestionType =
  | "multiple-choice"
  | "interactive-venn"
  | "interactive-mirror"
  | "interactive-counting"
  | "interactive-matrix"
  | "interactive-sequence"
  | "interactive-dice"
  | "interactive-cube";

export interface Question {
  id: string;
  topicId: string;
  type: QuestionType;
  questionText: string;
  options: string[];
  correctAnswer: string; // The correct option index (e.g. "0", "1") or specific value
  explanation: string;
  difficulty: "Easy" | "Medium" | "Hard";
  hint: string;
  // Dynamic fields to render unique SVG, matrix grid, or sequences in React
  visualData?: {
    matrixGrid?: (number | string | null)[][]; // for Number Matrix/Missing figure
    sequence?: string[]; // for letter/number series
    shapeType?: "triangles" | "rectangles" | "circles" | "polygon"; // for Counting Figures
    svgPaths?: { d: string; color?: string; id: number }[]; // for Counting Figures
    vennSets?: { label: string; count?: number; items: string[] }[]; // for Venn Diagrams
    mirrorType?: "mirror" | "water"; // Mirror vs Water image
    originalImageSvg?: string; // custom simple SVG string to represent figure
    mirrorImageSvgOptions?: string[]; // four SVG options for Mirror/Water images
    diceFaces?: string[]; // dice flat net faces (6 values)
    cubeOptions?: string[][]; // cube perspective options
  };
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  lives: number;
  lastActiveDate: string; // YYYY-MM-DD
  powerups: {
    hints: number;
    fiftyFifty: number;
    extraLife: number;
  };
  completedTopicIds: string[];
  unlockedTopicIds: string[];
  correctAnswersByTopic: Record<string, number>;
  totalAttemptsByTopic: Record<string, number>;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  iconName: string;
  moduleId?: ModuleId;
  unlocked: boolean;
}
