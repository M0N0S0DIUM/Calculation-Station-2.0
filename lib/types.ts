export type Category =
  | "Basic"
  | "Financial"
  | "Health"
  | "Conversion"
  | "Electronics"
  | "Time"
  | "Brewing";

export type CalculatorMeta = {
  slug: string;
  title: string;
  category: Category;
  description: string;
  keywords?: string[];
};

/** Shareable params for URL - flat key/value pairs */
export type ShareParams = Record<string, string | number | boolean>;

/** Callback type for calculator to report state changes */
export type OnStateChange = (params: ShareParams) => void;

export type CalculatorModule = {
  meta: CalculatorMeta;
  Calculator: React.ComponentType<{ onStateChange?: OnStateChange; initialParams?: ShareParams }>;
  /** Optional: get default initial state from URL search params on server/client */
  getInitialState?: (searchParams: URLSearchParams) => ShareParams;
  /** Optional: serialize state to share params */
  serializeState?: (state: unknown) => ShareParams;
};