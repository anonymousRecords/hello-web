"use client";

import { useEffect, useMemo, useState } from "react";
import { entries, load } from "./registry";
// TODO
import { Meta } from "../../../packages/scripts/gen-log-bridges/types";
import styles from "./page.module.css";
import { PreviewCard } from "../components/ui/PreviewCard";

export type LogModule = {
  meta: Meta;
  md: string;
  mount: (container: HTMLElement) => void | (() => void);
};

export default function Page() {
  const [mods, setMods] = useState<Record<string, LogModule>>({});
  const ids = useMemo(() => entries.map((e) => e.id), []);

  useEffect(() => {
    let canceled = false;

    (async () => {
      const pairs = await Promise.all(
        ids.map(async (id) => {
          const mod = (await load(id)) as LogModule;
          return [id, mod] as const;
        })
      );

      if (canceled) return;

      setMods(Object.fromEntries(pairs));
    })();

    return () => {
      canceled = true;
    };
  }, [ids]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {entries.map((e) => (
          <PreviewCard key={e.id} id={e.id} mod={mods[e.id]} />
        ))}
      </div>
    </div>
  );
}
