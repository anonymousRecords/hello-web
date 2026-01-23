"use client";

import { interactions, getUrl } from "./registry";
import styles from "./page.module.css";
import { PreviewCard } from "../components/ui/PreviewCard";

export default function Page() {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {interactions.map((entry) => (
          <PreviewCard
            key={entry.id}
            entry={entry}
            url={getUrl(entry.id, isDev)}
          />
        ))}
      </div>
    </div>
  );
}
