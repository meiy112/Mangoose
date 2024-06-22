import { createContext, useContext, useState, ReactNode } from "react";

interface LessonContextType {
  farthestPage: number;
  setFarthestPage: (page: number) => void;
  isQuestionPage: boolean;
  setIsQuestionPage: (isQuestionPage: boolean) => void;
  canProgress: boolean;
  setCanProgress: (canProgress: boolean) => void;
  canCheckAnswers: boolean;
  setCanCheckAnswers: (canCheckAnswers: boolean) => void;
}

const LessonContext = createContext<LessonContextType | undefined>(undefined);

export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a PageProvider");
  }
  return context;
}

interface LessonProviderProps {
  children: ReactNode;
}

export function LessonProvider({ children }: LessonProviderProps) {
  const [farthestPage, setFarthestPage] = useState<number>(0);
  const [isQuestionPage, setIsQuestionPage] = useState(false);
  const [canProgress, setCanProgress] = useState(true);
  const [canCheckAnswers, setCanCheckAnswers] = useState(false);

  return (
    <LessonContext.Provider
      value={{
        farthestPage,
        setFarthestPage,
        isQuestionPage,
        setIsQuestionPage,
        canProgress,
        setCanProgress,
        canCheckAnswers,
        setCanCheckAnswers,
      }}
    >
      {children}
    </LessonContext.Provider>
  );
}
