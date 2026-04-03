#  Node.js & TypeScript Learning Repository

This repository documents my structured learning journey through JavaScript, TypeScript, and Node.js backend development. It contains annotated code examples organised by topic — from JS fundamentals to building a production-ready Express + TypeScript server template.

### Notes & Documentation

<div>
  <a href="https://www.notion.so/Lambda-4-0-Node-js-Backend-Devops-Course-Notes-1a4a67c6ab4580a5b706d00babb1679c">
    <img src="https://img.shields.io/badge/Notion-white?style=for-the-badge&logo=notion&logoColor=000000" alt="Notion Notes"/>
  </a>
</div>

Detailed notes for each module are available in my Notion workspace. Click the badge above for explanations, diagrams, and additional resources.

---

### Tech Stack

<div>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=000000" alt="JavaScript"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
</div>

---

### Repository Structure

```
📂 JavaScript Code Snippets/     — Quick-reference snippets (closures, promises, async, etc.)
📂 Module_01-JavaScript Basics/  — Types, variables, operators, loops, functions
📂 Module_02-JavaScript Intermediate/ — Coercion, scoping, hoisting, boxing, equality
📂 Module_03-JavaScript Advance/ — Closures, HOFs, callbacks, promises, generators, async/await
📂 Module_04-HTTP Servers/
    ├── 01-Plain REST API/        — Vanilla Node.js HTTP server
    ├── 02-Express Server/        — Basic Express.js setup
    └── 03-Express TypeScript Template/ — Production-ready Express + TS template
                                          (Winston logging, Zod validation, correlation IDs,
                                           structured error handling, graceful shutdown)
📂 Module_05-TypeScript Basics/  — Types, unions, arrays, interfaces, functions, enums
📂 Module_06-TypeScript Intermediate/ — Narrowing, never/unknown, classes, objects, mapped types
```

---

###  Getting Started

Each module contains standalone examples that can be run independently.

```bash
# For plain JS files
node filename.js

# For the Express TypeScript Template
cd "Module_04-HTTP Servers/03-Express TypeScript Template"
npm install
npm run dev       # development (nodemon + ts-node)
npm run build     # compile to dist/
npm start         # run compiled output
```

---

<div align="center">
  Built by <a href="https://github.com/vivekanand-vr">vivekanand-vr</a>
</div>
