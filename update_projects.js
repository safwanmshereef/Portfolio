const fs = require('fs');

let content = fs.readFileSync('components/Projects.tsx', 'utf-8');

const regexNutri = /\{\s*id:\s*"nutri",[\s\S]*?githubUrl:\s*"https:\/\/github\.com\/safwanmshereef\/NUTRI-VISION-AI",\s*\},\n?/g;
const regexFinance = /\{\s*id:\s*"finance",[\s\S]*?githubUrl:\s*"https:\/\/github\.com\/safwanmshereef\/FINANCE-INSIGHT-HUB",\s*\},\n?/g;
const regexZcb = /\{\s*id:\s*"zcb",[\s\S]*?githubUrl:\s*"https:\/\/github\.com\/safwanmshereef\/ZCB",\s*\}\n?/g;

content = content.replace(regexNutri, '');
content = content.replace(regexFinance, '');
content = content.replace(regexZcb, '');

const financeDashboard = `  {
    id: "finance-dashboard",
    title: "Finance Dashboard",
    stack: "FastAPI • Streamlit • SQLAlchemy • Postgres/SQLite",
    description: "A full-stack financial data processing and access control demo built with a decoupled architecture.",
    features: [
      "User management with roles (viewer, analyst, admin) and status tracking.",
      "Role-based access control across robust API endpoints.",
      "Financial records CRUD with comprehensive validation and filtering.",
      "Dashboard summary APIs for aggregates and dynamic trend analysis."
    ],
    deepDive: [
      "Implemented Date-range analytics controls on dashboard summary and trends.",
      "Built a Monthly budget tracker in the sidebar with an active utilization indicator.",
      "Developed a search-enabled records explorer across category and notes.",
      "Added one-click CSV export functionality for the filtered records table."
    ],
    githubUrl: "https://github.com/safwanmshereef/Finance-Dashboard",
  },
`;

const storeAppRegex = /\{\s*id:\s*"store_app",[\s\S]*?githubUrl:\s*"https:\/\/github\.com\/safwanmshereef\/STORE-APP-ANALYTICS",\s*\},\n?/g;
const storeAppReplacement = `  {
    id: "store_app",
    title: "STORE APP (Internship)",
    stack: "Next.js • FastAPI • Role-Based Auth",
    description: "A two-part store operations and compliance system with role-based access, OTP login, compliance tracking, and third-party system integration.",
    features: [
      "Authentication UI & Role-based routing (Admin, Manager, Operations).",
      "Comprehensive Dashboard views powered by a robust FastAPI backend.",
      "Data fetching, task workflows, and external inventory integrations.",
      "Compliance tracking, stock verification, and legal document management."
    ],
    deepDive: [
      "Decoupled Architecture: Next.js frontend focusing on people-facing dashboards, while FastAPI backend handles business logic and scheduled workflows.",
      "Implemented a secure OTP login experience mapped to distinct operational roles.",
      "Engineered rich UI interactions and animations for complaint handling and task execution modules."
    ],
    githubUrl: "https://github.com/safwanmshereef/store-application",
  },
`;
content = content.replace(storeAppRegex, storeAppReplacement);

const lastBracketRegex = /\s*\];\s*\n\s*export default function Projects\(\)/;
content = content.replace(lastBracketRegex, `\n${financeDashboard}];\n\nexport default function Projects()`);


fs.writeFileSync('components/Projects.tsx', content);
