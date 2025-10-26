import { useEffect, useRef } from "react";
import styles from "./PreviewCard.module.css";
import { LogModule } from "../../app/page";

export function PreviewCard({ id, mod }: { id: string; mod?: LogModule }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mod || !hostRef.current) return;

    hostRef.current.innerHTML = "";
    const div = document.createElement("div");
    hostRef.current.appendChild(div);

    const cleanup = mod.mount(div);

    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
      if (hostRef.current) hostRef.current.innerHTML = "";
    };
  }, [mod]);

  return (
    <div className={styles.listItem} id={id}>
      <div className={styles.item} ref={hostRef}>
        {!mod && <Placeholder />}
      </div>

      <div className={styles.metaPanel}>
        <h2 className={styles.metaTitle}>{mod?.meta.title ?? "..."}</h2>
        <div className={styles.metaDate}>{mod?.meta.date ?? ""}</div>
        <pre className={styles.metaMd}>{mod?.md ?? ""}</pre>
      </div>
    </div>
  );
}

function Placeholder() {
  return <div className={styles.skeleton}>Loading</div>;
}
