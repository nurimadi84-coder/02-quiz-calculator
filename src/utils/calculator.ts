import type { MaterialCostBreakdown, QuizState } from "@/types/quiz";

type CalcInput = Pick<
  QuizState,
  | "size"
  | "fabric"
  | "headboard"
  | "hasLiftingMechanism"
  | "hasMattress"
  | "urgency"
>;

/**
 * Чистый расчёт себестоимости материалов и розничной цены
 * строго по формуле из ТЗ.
 */
export function calculateBedCost(state: CalcInput): MaterialCostBreakdown | null {
  if (
    state.size === null ||
    state.fabric === null ||
    state.headboard === null ||
    state.hasLiftingMechanism === null ||
    state.hasMattress === null ||
    state.urgency === null
  ) {
    // Частичный расчёт по размеру — для живого preview на ранних шагах
    if (state.size === null) return null;
    return calculatePartial(state);
  }

  return calculateFull(state as RequiredCalcInput);
}

type RequiredCalcInput = {
  size: NonNullable<QuizState["size"]>;
  fabric: NonNullable<QuizState["fabric"]>;
  headboard: NonNullable<QuizState["headboard"]>;
  hasLiftingMechanism: boolean;
  hasMattress: boolean;
  urgency: NonNullable<QuizState["urgency"]>;
};

const baseCosts = {
  "90x200": {
    dsp: 13500,
    fabric: 6000,
    foam: 4900,
    baseAndMattress: 25000,
    liftingMechanism: 7500,
    technicalMaterials: 9650,
    hardware: 4000,
    totalMaterials: 70550,
  },
  "160x200": {
    dsp: 18000,
    fabric: 8000,
    foam: 8800,
    baseAndMattress: 36000,
    liftingMechanism: 8500,
    technicalMaterials: 12500,
    hardware: 5000,
    totalMaterials: 96800,
  },
  "180x200": {
    dsp: 21000,
    fabric: 10000,
    foam: 10500,
    baseAndMattress: 42000,
    liftingMechanism: 9500,
    technicalMaterials: 14000,
    hardware: 6000,
    totalMaterials: 113000,
  },
} as const;

function calculateFull(state: RequiredCalcInput): MaterialCostBreakdown {
  const base = baseCosts[state.size];
  let fabricCost: number = base.fabric;
  let baseAndMattressCost: number = base.baseAndMattress;
  let liftingCost: number = base.liftingMechanism;

  // Модификатор ткани
  if (state.fabric === "premium") fabricCost *= 1.8;
  if (state.fabric === "luxury") fabricCost *= 2.6;

  // Модификатор высоты изголовья (увеличение расхода ДСП и ткани)
  let dspCost: number = base.dsp;
  if (state.headboard === "high_130") {
    dspCost *= 1.25;
    fabricCost *= 1.15;
  } else if (state.headboard === "max_150") {
    dspCost *= 1.5;
    fabricCost *= 1.3;
  }

  // Опциональность матраса и подъемника
  if (!state.hasMattress) {
    // Вычитаем стоимость матраса (оставляем только ортопедическое основание)
    baseAndMattressCost = state.size === "90x200" ? 14000 : 20000;
  }
  if (!state.hasLiftingMechanism) {
    liftingCost = 0;
  }

  const totalMaterials = Math.round(
    dspCost +
      fabricCost +
      base.foam +
      baseAndMattressCost +
      liftingCost +
      base.technicalMaterials +
      base.hardware
  );

  // Коэффициент работы, сборки и маржинальности (x1.85 от себестоимости материалов)
  let retailMultiplier = 1.85;
  if (state.urgency === "fast") retailMultiplier += 0.1;
  if (state.urgency === "express") retailMultiplier += 0.25;

  const estimatedRetailPrice = Math.round(totalMaterials * retailMultiplier);

  return {
    dsp: Math.round(dspCost),
    fabric: Math.round(fabricCost),
    foam: base.foam,
    baseAndMattress: Math.round(baseAndMattressCost),
    liftingMechanism: liftingCost,
    technicalMaterials: base.technicalMaterials,
    hardware: base.hardware,
    totalMaterials,
    estimatedRetailPrice,
  };
}

/** Preview: применяем только уже выбранные модификаторы. */
function calculatePartial(state: CalcInput): MaterialCostBreakdown {
  const size = state.size!;
  const fabric = state.fabric ?? "standard";
  const headboard = state.headboard ?? "standard_100";
  const hasLiftingMechanism = state.hasLiftingMechanism ?? true;
  const hasMattress = state.hasMattress ?? true;
  const urgency = state.urgency ?? "standard";

  return calculateFull({
    size,
    fabric,
    headboard,
    hasLiftingMechanism,
    hasMattress,
    urgency,
  });
}

export function formatTenge(value: number): string {
  return `${value.toLocaleString("ru-RU")} тг`;
}
