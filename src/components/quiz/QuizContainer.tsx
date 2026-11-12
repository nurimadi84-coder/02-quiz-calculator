"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  fabricOptions,
  headboardOptions,
  liftingOptions,
  mattressOptions,
  sizeOptions,
  stepTitles,
  TOTAL_STEPS,
  urgencyOptions,
} from "@/constants/quizData";
import type {
  BedSize,
  FabricCategory,
  HeadboardHeight,
  QuizState,
  Urgency,
} from "@/types/quiz";
import { calculateBedCost } from "@/utils/calculator";
import { FinalScreen } from "@/components/quiz/FinalScreen";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { QuizNavigation } from "@/components/quiz/QuizNavigation";
import { StepCard } from "@/components/quiz/StepCard";

const initialState: QuizState = {
  currentStep: 1,
  size: null,
  fabric: null,
  headboard: null,
  hasLiftingMechanism: null,
  hasMattress: null,
  urgency: null,
  customerName: "",
  customerPhone: "",
};

function canProceed(state: QuizState): boolean {
  switch (state.currentStep) {
    case 1:
      return state.size !== null;
    case 2:
      return state.fabric !== null && state.headboard !== null;
    case 3:
      return (
        state.hasLiftingMechanism !== null &&
        state.hasMattress !== null &&
        state.urgency !== null
      );
    default:
      return false;
  }
}

export function QuizContainer() {
  const [state, setState] = useState<QuizState>(initialState);

  const breakdown = useMemo(() => calculateBedCost(state), [state]);

  const update = <K extends keyof QuizState>(key: K, value: QuizState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const goBack = () => {
    setState((prev) => ({
      ...prev,
      currentStep: Math.max(1, prev.currentStep - 1),
    }));
  };

  const goNext = () => {
    if (!canProceed(state)) return;
    setState((prev) => ({
      ...prev,
      currentStep: Math.min(TOTAL_STEPS, prev.currentStep + 1),
    }));
  };

  return (
    <div className="desktop-atmosphere min-h-screen">
      <main className="mx-auto min-h-screen w-full max-w-[520px] border-neutral-200 px-4 py-6 sm:my-8 sm:min-h-[auto] sm:rounded-3xl sm:border sm:px-6 sm:py-8 sm:shadow-2xl dark:border-neutral-800 mobile-card">
        <div className="mb-6 space-y-1">
          <a
            href="http://localhost:3000"
            className="text-xs font-medium text-slate-500 transition-colors hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400"
          >
            ← На главную
          </a>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Расчет кровати
          </h1>
          <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            Пошаговый квиз с динамическим пересчётом себестоимости и розничной цены
          </p>
        </div>

        <div className="space-y-6">
          <ProgressBar
            currentStep={state.currentStep}
            estimatedPrice={breakdown?.estimatedRetailPrice ?? null}
          />

          <div className="space-y-1">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
              {stepTitles[state.currentStep]}
            </h2>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={state.currentStep}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {state.currentStep === 1 && (
                <div className="space-y-3">
                  {sizeOptions.map((option) => (
                    <StepCard
                      key={option.value}
                      option={option}
                      selected={state.size === option.value}
                      onSelect={(value: BedSize) => update("size", value)}
                    />
                  ))}
                </div>
              )}

              {state.currentStep === 2 && (
                <div className="space-y-6">
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Категория ткани
                    </h3>
                    {fabricOptions.map((option) => (
                      <StepCard
                        key={option.value}
                        option={option}
                        selected={state.fabric === option.value}
                        onSelect={(value: FabricCategory) =>
                          update("fabric", value)
                        }
                      />
                    ))}
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Высота изголовья
                    </h3>
                    {headboardOptions.map((option) => (
                      <StepCard
                        key={option.value}
                        option={option}
                        selected={state.headboard === option.value}
                        onSelect={(value: HeadboardHeight) =>
                          update("headboard", value)
                        }
                      />
                    ))}
                  </section>
                </div>
              )}

              {state.currentStep === 3 && (
                <div className="space-y-6">
                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Подъемный механизм + ящик
                    </h3>
                    {liftingOptions.map((option) => (
                      <StepCard
                        key={String(option.value)}
                        option={option}
                        selected={state.hasLiftingMechanism === option.value}
                        onSelect={(value: boolean) =>
                          update("hasLiftingMechanism", value)
                        }
                      />
                    ))}
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Ортопедический матрас
                    </h3>
                    {mattressOptions.map((option) => (
                      <StepCard
                        key={String(option.value)}
                        option={option}
                        selected={state.hasMattress === option.value}
                        onSelect={(value: boolean) =>
                          update("hasMattress", value)
                        }
                      />
                    ))}
                  </section>

                  <section className="space-y-3">
                    <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                      Сроки изготовления
                    </h3>
                    {urgencyOptions.map((option) => (
                      <StepCard
                        key={option.value}
                        option={option}
                        selected={state.urgency === option.value}
                        onSelect={(value: Urgency) => update("urgency", value)}
                      />
                    ))}
                  </section>
                </div>
              )}

              {state.currentStep === 4 && breakdown && (
                <FinalScreen
                  state={state}
                  breakdown={breakdown}
                  onNameChange={(value) => update("customerName", value)}
                  onPhoneChange={(value) => update("customerPhone", value)}
                />
              )}
            </motion.div>
          </AnimatePresence>

          <QuizNavigation
            currentStep={state.currentStep}
            canGoNext={canProceed(state)}
            showNext={state.currentStep < 4}
            onBack={goBack}
            onNext={goNext}
          />
        </div>
      </main>
    </div>
  );
}
