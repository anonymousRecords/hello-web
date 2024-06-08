import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import "./Home.css";
import ListItem from "../components/ListItem/ListItem";

export default function Home() {
  const lists = Array.from({ length: 20 }, (_, i) => i);

  useGSAP(() => {
    gsap.fromTo(
      "#title",
      { y: 0, opacity: 0 },
      { y: -10, opacity: 1, duration: 0.5 },
    );
  }, []);

  return (
    <>
      <header className="header">
        <h1 id="title">Hello CSS</h1>
      </header>
      <section className="section">
        {lists.map((item) => (
          <ListItem key={item} title={`Item ${item}`} />
        ))}
      </section>
    </>
  );
}
