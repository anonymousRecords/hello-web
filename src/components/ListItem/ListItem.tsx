import { useGSAP } from "@gsap/react";
import "./ListItem.css";
import gsap from "gsap";

type ListItemProps = {
  title?: string;
  onClick?: () => void;
};

function ListItem({ title, onClick }: ListItemProps) {
  useGSAP(() => {
    gsap.to(
      ".list-item",
      { rotate: 10, duration: 0.05, ease: "power4.inOut" }
    );
  }, []);

  return <div className="list-item" onClick={onClick}>{title}</div>;
}

export default ListItem;
