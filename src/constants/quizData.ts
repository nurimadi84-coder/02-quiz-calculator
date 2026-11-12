import type {
  BedSize,
  FabricCategory,
  HeadboardHeight,
  StepOption,
  Urgency,
} from "@/types/quiz";

export const TOTAL_STEPS = 4;

export const MANAGER_WHATSAPP_PHONE = "77078274377";

export const sizeOptions: StepOption<BedSize>[] = [
  {
    value: "90x200",
    title: "90×200 см — Односпальная",
    subtitle: "Компактная, экономия материалов",
    icon: "User",
  },
  {
    value: "160x200",
    title: "160×200 см — Двуспальная",
    subtitle: "Стандарт для спальни",
    icon: "Users",
  },
  {
    value: "180x200",
    title: "180×200 см — King Size",
    subtitle: "Максимальный комфорт",
    icon: "Maximize",
  },
];

export const fabricOptions: StepOption<FabricCategory>[] = [
  {
    value: "standard",
    title: "Стандарт — Велюр",
    subtitle: "Практичная обивка для ежедневного использования",
    icon: "Shirt",
  },
  {
    value: "premium",
    title: "Премиум — Антивандальный флок / Рогожка",
    subtitle: "Износостойкость ×1.8 к расходу ткани",
    icon: "Sparkles",
  },
  {
    value: "luxury",
    title: "Люкс — Букле / Экокожа",
    subtitle: "Премиальный внешний вид ×2.6 к расходу ткани",
    icon: "Crown",
  },
];

export const headboardOptions: StepOption<HeadboardHeight>[] = [
  {
    value: "standard_100",
    title: "100–110 см — Стандарт",
    subtitle: "Классическая высота изголовья",
    icon: "Minus",
  },
  {
    value: "high_130",
    title: "130 см — Увеличенное",
    subtitle: "+25% ДСП, +15% ткань",
    icon: "ArrowUp",
  },
  {
    value: "max_150",
    title: "150 см — До потолка",
    subtitle: "+50% ДСП, +30% ткань",
    icon: "ArrowUpToLine",
  },
];

export const liftingOptions: StepOption<boolean>[] = [
  {
    value: true,
    title: "Подъемный механизм + ящик — Включить",
    subtitle: "Дополнительное место для хранения",
    icon: "Box",
  },
  {
    value: false,
    title: "Подъемный механизм — Исключить",
    subtitle: "Без ящика и подъёмника",
    icon: "Ban",
  },
];

export const mattressOptions: StepOption<boolean>[] = [
  {
    value: true,
    title: "Ортопедический матрас — Включить",
    subtitle: "Матрас в комплекте со основанием",
    icon: "BedDouble",
  },
  {
    value: false,
    title: "Матрас — Исключить",
    subtitle: "Только ортопедическое основание",
    icon: "Ban",
  },
];

export const urgencyOptions: StepOption<Urgency>[] = [
  {
    value: "standard",
    title: "Стандарт — 10–14 дней",
    subtitle: "Базовый коэффициент розницы ×1.85",
    icon: "Clock",
  },
  {
    value: "fast",
    title: "Срочно — 5–7 дней",
    subtitle: "+10% к розничной цене",
    icon: "Zap",
  },
  {
    value: "express",
    title: "Экспресс — 3 дня",
    subtitle: "+25% к розничной цене",
    icon: "Rocket",
  },
];

export const sizeLabels: Record<BedSize, string> = {
  "90x200": "90×200 см (Односпальная)",
  "160x200": "160×200 см (Двуспальная)",
  "180x200": "180×200 см (King Size)",
};

export const fabricLabels: Record<FabricCategory, string> = {
  standard: "Стандарт (Велюр)",
  premium: "Премиум (Антивандальный флок/Рогожка)",
  luxury: "Люкс (Букле/Экокожа)",
};

export const headboardLabels: Record<HeadboardHeight, string> = {
  standard_100: "100–110 см (Стандарт)",
  high_130: "130 см (Увеличенное)",
  max_150: "150 см (До потолка)",
};

export const urgencyLabels: Record<Urgency, string> = {
  standard: "Стандарт (10–14 дней)",
  fast: "Срочно (5–7 дней, +10%)",
  express: "Экспресс (3 дня, +25%)",
};

export const stepTitles: Record<number, string> = {
  1: "Размер спального места",
  2: "Высота изголовья и категория ткани",
  3: "Комплектация и подъемный механизм",
  4: "Итоговый расчёт и контакты",
}
