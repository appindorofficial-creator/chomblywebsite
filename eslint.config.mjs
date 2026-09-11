import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Phase A transactional code is preserved read-only while it remains gated.
    // Its legacy one-line formatting is covered by domain tests and scheduled
    // for a typed refactor before product activation.
    "app/api/account/**",
    "app/api/admin/**",
    "app/api/bookings/**",
    "app/api/checkout/**",
    "app/api/professionals/**",
    "app/api/wompi/**",
    "components/account-panel.tsx",
    "components/auth-gate.tsx",
    "components/booking-flow.tsx",
    "components/chomby-home.tsx",
    "components/content-shell.tsx",
    "components/help-chat.tsx",
    "components/site-pages.tsx",
    "components/site-shell.tsx",
    "lib/payment.ts",
  ]),
  {
    files: ["components/ui/**/*.{ts,tsx}", "hooks/use-mobile.ts"],
    rules: {
      // These files are vendored verbatim from shadcn@4.17.0. Keep the
      // registry source intact while applying the stricter rules to Site code.
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/purity": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
