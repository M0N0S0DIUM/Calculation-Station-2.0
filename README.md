# Calculation Station (50 calculators)

This is a Next.js (App Router) project with **50 modular calculators**.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Where calculators live

Each calculator is **one file**:

```
/calculators/<slug>.tsx
```

Every calculator exports a `CalculatorModule` like:

```ts
export const myCalc: CalculatorModule = {
  meta: { slug: "my-calc", title: "...", category: "Basic", description: "..." },
  Calculator: MyComponent,
};
```

## Add a new calculator (2 steps)

1) Create a new file under `calculators/` (copy any existing one).  
2) Register it in `lib/calculators.ts` (add an import + add it to `CALCULATORS`).

## Deploy

Works great on Vercel:

- import the repo
- `npm install` / `npm run build` / `npm start` are default
