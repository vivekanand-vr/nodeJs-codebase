/* ===================================================================
 * CH 02 — TypeScript: never and unknown
 * ===================================================================
 *
 * THE SPECTRUM OF TYPE SAFETY
 * ┌──────────┬────────────────────┬──────────────────────────────────┐
 * │ Type     │ Assignable FROM    │ Assignable TO                    │
 * ├──────────┼────────────────────┼──────────────────────────────────┤
 * │ any      │ everything         │ everything (unsafe escape hatch) │
 * │ unknown  │ everything         │ only `unknown` or `any`          │
 * │ never    │ nothing            │ everything (bottom type)         │
 * └──────────┴────────────────────┴──────────────────────────────────┘
 *
 * KEY CONCEPTS
 * -> `never`   : the bottom type — no value can ever have type `never`.
 *                Returned by functions that throw or loop infinitely.
 *                Used in exhaustive checks to verify all cases are handled.
 * -> `unknown` : the safe `any` — you can assign any value to it, but
 *                you MUST narrow it before using it.
 *
 * WHEN TO USE EACH
 * -> `never`   : throw helpers, infinite loops, exhaustive switch defaults
 * -> `unknown` : representing values from external sources (API responses,
 *                JSON.parse, try/catch error objects in ES2022)
 * -> `any`     : quick migration from JS — avoid long-term
 *
 * IMPORTANT NOTES
 * 1. `never` in a union is automatically removed: `string | never` → `string`.
 * 2. With `useUnknownInCatchVariables` (TS 4.4+ / strict mode), the `catch`
 *    clause variable is typed as `unknown`, not `any`.
 * 3. `unknown` forces you to write the type check once; `any` means you
 *    silently skip it — and pay with runtime errors.
 * 4. Narrowing `unknown` to a specific type requires `typeof`, `instanceof`,
 *    or a custom type guard — the same techniques as union narrowing.
 * =================================================================== */

// ─── 1. never — Functions That Never Return ───────────────────────────────────

function throwError(message: string): never {
  throw new Error(message); // throws → never reaches the end
}

function infiniteLoop(): never {
  while (true) {
    console.log("Looping forever...");
  }
}

// ─── 2. unknown — Must Narrow Before Use ────────────────────────────────────

function processInput(input: unknown): void {
  if (typeof input === "string") {
    console.log("String input:", input.toUpperCase());  // input: string
  } else if (typeof input === "number") {
    console.log("Number input:", input.toFixed(2));     // input: number
  } else {
    console.log("Unknown type — cannot operate on it");
  }
}

processInput("typescript"); // Output: String input: TYPESCRIPT
processInput(3.14);         // Output: Number input: 3.14
processInput(true);         // Output: Unknown type — cannot operate on it

// ─── 3. Assignability Rules ───────────────────────────────────────────────────

function assignabilityDemo(): void {
  let anyVal: any     = "hello";
  let unknownVal: unknown = "world";

  const str1: string = anyVal;        // ✅ any → anything is allowed (unsafe)
  // const str2: string = unknownVal; // ❌ Error: must narrow first

  if (typeof unknownVal === "string") {
    const str2: string = unknownVal;  // ✅ narrowed to string
    console.log("After narrowing:", str2);
  }
}

assignabilityDemo();

// ─── 4. never in Exhaustive Switch Checks ────────────────────────────────────
//
// Assign the unhandled value to `never` — if all cases are covered,
// the assignment is valid.  If you ADD a new case without handling it,
// the compiler raises an error here.

type Shape =
  | { kind: "circle";    radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle";  base: number;  height: number };

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return 0.5 * shape.base * shape.height;
    default: {
      // If a new Shape member is added and not handled above,
      // this line becomes a type error (assigned non-never to never).
      const _exhaustive: never = shape;
      throw new Error(`Unhandled shape: ${JSON.stringify(_exhaustive)}`);
    }
  }
}

console.log("Circle area:", area({ kind: "circle", radius: 5 }).toFixed(2));
// Output: Circle area: 78.54

// ─── 5. unknown in catch Blocks (ES2022 / TS 4.4+) ──────────────────────────
//
// With `useUnknownInCatchVariables: true` (enabled in strict mode),
// the catch variable is `unknown`, not `any`.

function safeJsonParse(raw: string): unknown {
  try {
    return JSON.parse(raw);
  } catch (err: unknown) {
    // Must narrow before accessing err.message
    if (err instanceof Error) {
      console.error("Parse failed:", err.message);
    } else {
      console.error("Unknown error:", err);
    }
    return null;
  }
}

const parsed = safeJsonParse('{"key": 42}');
console.log("Parsed value:", parsed);    // Output: Parsed value: { key: 42 }

safeJsonParse("invalid json");           // Output: Parse failed: Unexpected token...

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. `unknown` is `any` with safety gates — you can store anything in
 *    it, but you must narrow before using it.
 * 2. `never` represents "this code is unreachable" — use it in throw
 *    helpers, infinite loops, and exhaustive `switch` defaults.
 * 3. The `switch + never` exhaustiveness trick is zero-runtime-cost:
 *    the extra line is erased after compilation but catches missing
 *    switch cases at build time.
 * 4. In `catch` blocks, prefer `unknown` over `any` so you are forced
 *    to check `instanceof Error` before accessing `.message`.
 * 5. `never | T` simplifies to `T` — never vanishes from unions.
 * 6. Conditional types use `never` as the "no match" branch result:
 *    `T extends string ? string : never` returns `never` when T is not
 *    string, making it disappear in distributed unions.
 * =================================================================== */

export {};
