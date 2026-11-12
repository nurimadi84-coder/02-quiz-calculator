"use client";

import { TOTAL_STEPS } from "@/constants/quizData";
import { formatTenge } from "@/utils/calculator";

interface ProgressBarProps {
  currentStep: number;
  estimatedPrice: number | null;
}

export function ProgressBar({ currentStep, estimatedPrice }: ProgressBarProps) {
  const safeStep = Math.min(currentStep, TOTAL_STEPS);
  const progress = Math.round((safeStep / TOTAL_STEPS) * 100);

  return (
    <div className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Шаг {safeStep} из {TOTAL_STEPS}
          <span className="ml-2 text-slate-400 dark:text-slate-500">
            · {progress}%
          </span>
        </p>
        <p className="text-right text-lg font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
          {estimatedPrice !== null ? `~${formatTenge(estimatedPrice)}` : "— тг"}
        </p>
      </div>

      <div
        className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Прогресс квиза: ${progress}%`}
      >
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
