"use client";

import { DesktopOnly } from "@repo/ui/desktop-only";

export function DesktopOnlyWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DesktopOnly message="데스크탑 환경에서만 접속 가능해요.">
      {children}
    </DesktopOnly>
  );
}
