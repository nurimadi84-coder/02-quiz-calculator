"use client";

import { motion } from "framer-motion";
import {
  ArrowUp,
  ArrowUpToLine,
  Ban,
  BedDouble,
  Box,
  Check,
  Clock,
  Crown,
  Maximize,
  Minus,
  Rocket,
  Shirt,
  Sparkles,
  User,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { StepOption } from "@/types/quiz";

const iconMap: Record<StepOption["icon"], LucideIcon> = {
  User,
  Users,
  Maximize,
  Shirt,
  Sparkles,
  Crown,
  Minus,
  ArrowUp,
  ArrowUpToLine,
  Box,
  Ban,
  BedDouble,
  Clock,
  Zap,
  Rocket,
};

interface StepCardProps<T extends string | boolean> {
  option: StepOption<T>;
  selected: boolean;
  onSelect: (value: T) => void;
}

export function StepCard<T extends string | boolean>({
  option,
  selected,
  onSelect,
}: StepCardProps<T>) {
  const Icon = iconMap[option.icon];

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(option.value)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className={[
        "relative w-full rounded-2xl border-2 p-4 text-left transition-colors duration-200",
        selected
          ? "border-indigo-600 bg-indigo-50/50 ring-2 ring-indigo-500 dark:bg-indigo-950/30"
          : "border-slate-200 dark:border-slate-800",
      ].join(" ")}
      aria-pressed={selected}
    >
      {selected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute top-3 right-3 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white"
          aria-hidden
        >
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </motion.span>
      )}

      <span className="flex items-start gap-3 pr-8">
        <span
          className={[
            "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
            selected
              ? "bg-indigo-600 text-white"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
          ].join(" ")}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-[15px] font-semibold leading-snug text-slate-900 dark:text-slate-50">
            {option.title}
          </span>
          <span className="mt-1 block text-sm leading-relaxed text-slate-500 dark:text-slate-400">
            {option.subtitle}
          </span>
        </span>
      </span>
    </motion.button>
  );
}
