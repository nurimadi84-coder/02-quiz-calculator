"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

interface QuizNavigationProps {
  currentStep: number;
  canGoNext: boolean;
  showNext?: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function QuizNavigation({
  currentStep,
  canGoNext,
  showNext = true,
  onBack,
  onNext,
}: QuizNavigationProps) {
  const nextLabel =
    currentStep === 3 ? "Получить расчет стоимости" : "Далее";

  return (
    <div className="flex items-center gap-3 pt-2">
      {currentStep > 1 ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Назад
        </button>
      ) : (
        <span className="w-[104px]" aria-hidden />
      )}

      {showNext && (
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="ml-auto inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
        >
          {nextLabel}
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      )}
    </div>
  );
}
