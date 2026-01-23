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
    <div className={styles.listItem} id={entry.id}>
      <div className={styles.item}>
        {isLoading && <div className={styles.skeleton}>Loading...</div>}
        <iframe
          src={url}
          className={styles.iframe}
          title={entry.title}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
        />
      </div>

      <div className={styles.metaPanel}>
        <h2 className={styles.metaTitle}>{entry.title}</h2>
        <div className={styles.metaDate}>{entry.date}</div>
        {entry.description && (
          <p className={styles.metaDescription}>{entry.description}</p>
        )}
        {entry.tags && entry.tags.length > 0 && (
          <div className={styles.metaTags}>
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
