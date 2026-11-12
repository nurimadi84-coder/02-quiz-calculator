"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";
import { useEffect, useState, type FormEvent } from "react";
import {
  fabricLabels,
  headboardLabels,
  MANAGER_WHATSAPP_PHONE,
  sizeLabels,
  urgencyLabels,
} from "@/constants/quizData";
import { formatPhoneInput, isValidKzPhone } from "@/lib/phone";
import type { MaterialCostBreakdown, QuizState } from "@/types/quiz";
import { formatTenge } from "@/utils/calculator";

interface FinalScreenProps {
  state: QuizState;
  breakdown: MaterialCostBreakdown;
  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
}

function AnimatedPrice({ value }: { value: number }) {
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
    return unsubscribe;
  }, [spring]);

  return (
    <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
      {formatTenge(display)}
    </span>
  );
}

export function FinalScreen({
  state,
  breakdown,
  onNameChange,
  onPhoneChange,
}: FinalScreenProps) {
  const [openBreakdown, setOpenBreakdown] = useState(false);
  const [touched, setTouched] = useState({ name: false, phone: false });

  const nameValid = state.customerName.trim().length >= 2;
  const phoneValid = isValidKzPhone(state.customerPhone);
  const formValid = nameValid && phoneValid;

  const fabricAndFoam = breakdown.fabric + breakdown.foam;
  const mechanismsAndHardware =
    breakdown.liftingMechanism + breakdown.hardware + breakdown.technicalMaterials;

  const handleWhatsAppSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, phone: true });
    if (!formValid || state.size === null || state.fabric === null || state.headboard === null || state.urgency === null) {
      return;
    }

    const phone = MANAGER_WHATSAPP_PHONE;

    const text = `Добрый день! Меня интересует расчет мягкой кровати:
- Размер: ${sizeLabels[state.size]}
- Ткань: ${fabricLabels[state.fabric]}
- Изголовье: ${headboardLabels[state.headboard]}
- Подъемный механизм: ${state.hasLiftingMechanism ? "Да" : "Нет"}
- Матрас: ${state.hasMattress ? "Да" : "Нет"}
- Срочность: ${urgencyLabels[state.urgency]}
---
Ориентировочная стоимость: ${breakdown.estimatedRetailPrice.toLocaleString("ru-RU")} тг
Себестоимость материалов: ${breakdown.totalMaterials.toLocaleString("ru-RU")} тг

Клиент: ${state.customerName.trim()}
Телефон: ${state.customerPhone}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Ориентировочная розничная стоимость
        </p>
        <AnimatedPrice value={breakdown.estimatedRetailPrice} />
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Материалы: {formatTenge(breakdown.totalMaterials)}
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => setOpenBreakdown((v) => !v)}
          className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 dark:text-slate-100 dark:hover:bg-slate-900"
          aria-expanded={openBreakdown}
        >
          Детализация себестоимости
          <ChevronDown
            className={[
              "h-4 w-4 shrink-0 transition-transform duration-300",
              openBreakdown ? "rotate-180" : "",
            ].join(" ")}
            aria-hidden
          />
        </button>

        <AnimatePresence initial={false}>
          {openBreakdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <ul className="space-y-2 border-t border-slate-200 px-4 py-3 text-sm dark:border-slate-800">
                <li className="flex justify-between gap-3">
                  <span className="text-slate-500">Каркас и ДСП</span>
                  <span className="font-medium">{formatTenge(breakdown.dsp)}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-slate-500">Обивочная ткань и наполнитель</span>
                  <span className="font-medium">{formatTenge(fabricAndFoam)}</span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-slate-500">Матрас и основание</span>
                  <span className="font-medium">
                    {formatTenge(breakdown.baseAndMattress)}
                  </span>
                </li>
                <li className="flex justify-between gap-3">
                  <span className="text-slate-500">Механизмы и фурнитура</span>
                  <span className="font-medium">
                    {formatTenge(mechanismsAndHardware)}
                  </span>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <form onSubmit={handleWhatsAppSubmit} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <label
            htmlFor="customerName"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Имя <span className="text-rose-500">*</span>
          </label>
          <input
            id="customerName"
            name="customerName"
            type="text"
            autoComplete="name"
            value={state.customerName}
            onChange={(e) => onNameChange(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            placeholder="Как к вам обращаться"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          />
          {touched.name && !nameValid && (
            <p className="text-xs text-rose-500">Укажите имя (минимум 2 символа)</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="customerPhone"
            className="block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Телефон / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <input
            id="customerPhone"
            name="customerPhone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={state.customerPhone}
            onChange={(e) => onPhoneChange(formatPhoneInput(e.target.value))}
            onBlur={() => setTouched((t) => ({ ...t, phone: true }))}
            placeholder="+7 (7XX) XXX-XX-XX"
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none ring-indigo-500 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-950"
          />
          {touched.phone && !phoneValid && (
            <p className="text-xs text-rose-500">
              Введите номер в формате +7 (7XX) XXX-XX-XX
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={!formValid}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500 dark:disabled:bg-slate-700 dark:disabled:text-slate-400"
        >
          <MessageCircle className="h-5 w-5" aria-hidden />
          Получить подробную смету в WhatsApp
        </button>
      </form>
    </motion.div>
  );
}
