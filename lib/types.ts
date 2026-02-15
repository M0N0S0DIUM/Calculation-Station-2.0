export type Category =
  | "Basic"
  | "Financial"
  | "Health"
  | "Conversion"
  | "Electronics"
  | "Time";

export type CalculatorMeta = {
  slug: string;
  title: string;
  category: Category;
  description: string;
  keywords?: string[];
};

export type CalculatorModule = {
  meta: CalculatorMeta;
  Calculator: React.ComponentType;
};
