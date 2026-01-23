"use client";

import { useState } from "react";
import styles from "./PreviewCard.module.css";
import type { InteractionEntry } from "../../app/registry";

interface PreviewCardProps {
  entry: InteractionEntry;
  url: string;
}

export function PreviewCard({ entry, url }: PreviewCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={styles.card} id={entry.id}>
      {isLoading && <div className={styles.skeleton} />}
      <iframe
        src={url}
        className={styles.iframe}
        title={entry.title}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
      />

      <div className={styles.overlay} />

      <div className={styles.meta}>
        <h2 className={styles.title}>{entry.title}</h2>
        <div className={styles.date}>{entry.date}</div>
        {entry.description && (
          <p className={styles.description}>{entry.description}</p>
        )}
        {entry.tags && entry.tags.length > 0 && (
          <div className={styles.tags}>
            {entry.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
