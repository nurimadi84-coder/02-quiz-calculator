import type { Metadata } from "next";
import { QuizContainer } from "@/components/quiz/QuizContainer";

export const metadata: Metadata = {
  title: "Расчет кровати — квиз-калькулятор",
  description:
    "Пошаговый расчёт стоимости мягкой кровати по индивидуальным параметрам с отправкой сметы в WhatsApp",
};

export default function QuizPage() {
  return <QuizContainer />;
}
