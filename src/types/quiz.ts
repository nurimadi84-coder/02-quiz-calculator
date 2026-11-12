export type BedSize = "90x200" | "160x200" | "180x200";
export type FabricCategory = "standard" | "premium" | "luxury";
export type HeadboardHeight = "standard_100" | "high_130" | "max_150";
export type Urgency = "standard" | "fast" | "express";

export interface QuizState {
  currentStep: number;
  size: BedSize | null;
  fabric: FabricCategory | null;
  headboard: HeadboardHeight | null;
  hasLiftingMechanism: boolean | null;
  hasMattress: boolean | null;
  urgency: Urgency | null;
  customerName: string;
  customerPhone: string;
}

export interface MaterialCostBreakdown {
  dsp: number;
  fabric: number;
  foam: number;
  baseAndMattress: number;
  liftingMechanism: number;
  technicalMaterials: number;
  hardware: number;
  totalMaterials: number;
  estimatedRetailPrice: number;
}

export interface StepOption<T extends string | boolean = string> {
  value: T;
  title: string;
  subtitle: string;
  icon: "User" | "Users" | "Maximize" | "Shirt" | "Sparkles" | "Crown" | "Minus" | "ArrowUp" | "ArrowUpToLine" | "Box" | "Ban" | "BedDouble" | "Clock" | "Zap" | "Rocket";
}
