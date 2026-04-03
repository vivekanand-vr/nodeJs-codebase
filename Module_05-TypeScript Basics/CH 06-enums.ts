/* ===================================================================
 * CH 06 — TypeScript Enums
 * ===================================================================
 *
 * WHAT IS AN ENUM?
 *   An enum (enumeration) defines a named set of constants. TypeScript
 *   compiles regular enums into JavaScript objects that exist at
 *   runtime; `const enum` values are inlined and produce no object.
 *
 * ENUM TYPES COMPARISON
 * ┌─────────────────┬─────────────────┬────────────────┬────────────┐
 * │ Feature         │ Numeric enum    │ String enum    │ const enum │
 * ├─────────────────┼─────────────────┼────────────────┼────────────┤
 * │ Auto-increments │ Yes (from 0)    │ No             │ Yes        │
 * │ Reverse lookup  │ Yes             │ No             │ No         │
 * │ Runtime object  │ Yes             │ Yes            │ No (inline)│
 * │ Debuggable      │ Yes             │ Yes            │ Harder     │
 * │ Value type      │ number          │ string         │ number     │
 * └─────────────────┴─────────────────┴────────────────┴────────────┘
 *
 * KEY CONCEPTS
 * -> Numeric enum    : members default to 0, 1, 2… or you set the start
 * -> String enum     : values are explicit strings — no reverse lookup
 * -> const enum      : inlined by compiler — no runtime object emitted
 * -> Heterogeneous   : mixed numeric + string members (avoid in practice)
 * -> Computed member : value calculated from an expression
 * -> as const object : a plain `{ ... } as const` is a lighter alternative
 *
 * IMPORTANT NOTES
 * 1. Numeric enums support REVERSE LOOKUP: `Direction[0]` → `"Up"`.
 *    String enums do NOT (values are not unique enough to reverse).
 * 2. `const enum` is inlined at compile time — this means it cannot be
 *    used in certain cross-module or `isolatedModules` scenarios.
 * 3. Consider `as const` objects as an enum alternative for better
 *    tree-shaking, simpler types, and no runtime overhead.
 * 4. Avoid heterogeneous enums (mixed types) — they imply mixed
 *    semantics and confuse tools.
 * 5. Never compare enum values across different enum types — TypeScript
 *    allows it for numeric enums (structural check), which is a known
 *    quirk. String enums are safer.
 * =================================================================== */

// ─── 1. Numeric Enum ─────────────────────────────────────────────────────────

enum Direction {
  Up,    // 0 — auto-assigned
  Down,  // 1
  Left,  // 2
  Right  // 3
}

const movePlayer = (dir: Direction): void => {
  console.log("Moving:", Direction[dir]); // Reverse lookup by value
};

movePlayer(Direction.Left);  // Output: Moving: Left
movePlayer(Direction.Up);    // Output: Moving: Up

// Auto-increment from a custom start
enum Priority {
  Low = 1,
  Medium,    // 2
  High,      // 3
  Critical   // 4
}

console.log("Priority.High:", Priority.High);         // Output: 3
console.log("Priority[3]:", Priority[3]);             // Output: High — reverse lookup

// ─── 2. String Enum ───────────────────────────────────────────────────────────
//
// Avoids accidental numeric comparisons — each value is a readable string.

enum HttpStatus {
  OK            = "200 OK",
  NotFound      = "404 Not Found",
  Unauthorized  = "401 Unauthorized",
  ServerError   = "500 Server Error"
}

function handleStatus(status: HttpStatus): void {
  if (status === HttpStatus.OK) {
    console.log("Success!");
  } else {
    console.log("Error:", status);     // Error: 404 Not Found
  }
}

handleStatus(HttpStatus.NotFound);   // Output: Error: 404 Not Found
handleStatus(HttpStatus.OK);         // Output: Success!

// ─── 3. const Enum (Inlined — No Runtime Object) ────────────────────────────
//
// The compiler replaces every `Color.Red` usage with its numeric value.
// Useful for performance-critical code; not usable across compilation units.

const enum Color {
  Red    = 0,
  Green  = 1,
  Blue   = 2
}

const favoriteColor: Color = Color.Green;
// Compiled to: const favoriteColor = 1; (no Color object in output)
console.log("Favorite color value:", favoriteColor); // Output: 1

// ─── 4. Computed and Constant Members ────────────────────────────────────────
//
// Enum members can be initialised with expressions.
// Constant members are evaluated at compile time; computed at runtime.

enum FilePermission {
  None    = 0,
  Read    = 1 << 0,   // 1  — bit-flag pattern
  Write   = 1 << 1,   // 2
  Execute = 1 << 2,   // 4
  ReadWrite = Read | Write // 3 — combination
}

console.log("ReadWrite permission:", FilePermission.ReadWrite); // Output: 3
console.log("Execute value:", FilePermission.Execute);         // Output: 4

// Checking bit flags
function hasPermission(user: FilePermission, perm: FilePermission): boolean {
  return (user & perm) === perm;
}

const myPerms = FilePermission.Read | FilePermission.Write;
console.log("Can read:", hasPermission(myPerms, FilePermission.Read));    // Output: true
console.log("Can exec:", hasPermission(myPerms, FilePermission.Execute)); // Output: false

// ─── 5. Heterogeneous Enum (Avoid in Practice) ───────────────────────────────

enum BoolLike {
  No  = 0,
  Yes = "YES" // mixed types — allowed but confusing; avoid
}

// ─── 6. Enum in switch — Exhaustiveness Check ────────────────────────────────

enum Season { Spring, Summer, Autumn, Winter }

function describe(s: Season): string {
  switch (s) {
    case Season.Spring: return "Flowers bloom";
    case Season.Summer: return "Hot and sunny";
    case Season.Autumn: return "Leaves fall";
    case Season.Winter: return "Cold and snowy";
    default:
      // Adding a new Season member without updating the switch
      // converts the leftover type to never → compile error
      const _exhaustive: never = s;
      return _exhaustive;
  }
}

console.log(describe(Season.Autumn)); // Output: Leaves fall

// ─── 7. as const — Lightweight Enum Alternative ──────────────────────────────
//
// No runtime overhead, better tree-shaking, simpler type inference.

const Roles = {
  Admin   : "admin",
  User    : "user",
  Guest   : "guest"
} as const;

// Derive the union type of values
type Role = typeof Roles[keyof typeof Roles]; // "admin" | "user" | "guest"

function getPermissions(role: Role): string[] {
  if (role === Roles.Admin)  return ["read", "write", "delete"];
  if (role === Roles.User)   return ["read", "write"];
  return ["read"];
}

console.log(getPermissions("admin")); // Output: [ 'read', 'write', 'delete' ]
console.log(getPermissions("guest")); // Output: [ 'read' ]

/* ===================================================================
 * CONCLUSION
 * ===================================================================
 * 1. Enums restrict a variable to a named set of constants, making
 *    illegal values unrepresentable at compile time.
 * 2. Numeric enums support reverse lookup (`Enum[value]`) because they
 *    compile into a two-way-mapped object.
 * 3. String enums do NOT support reverse lookup but are more readable
 *    in logs and debuggers — prefer them over numeric in most cases.
 * 4. `const enum` eliminates the runtime object entirely by inlining
 *    values — useful for hot paths, but incompatible with
 *    `isolatedModules` and cross-package usage.
 * 5. Bit-flag enums (powers of two) model permission systems concisely
 *    using bitwise operators.
 * 6. The `switch + never` pattern guarantees exhaustiveness — if a new
 *    member is added, the compiler forces you to handle it.
 * 7. For lightweight alternatives prefer `as const` objects: they
 *    produce clean union types, tree-shake well, and have zero runtime
 *    overhead beyond a plain object literal.
 * =================================================================== */

export {};
