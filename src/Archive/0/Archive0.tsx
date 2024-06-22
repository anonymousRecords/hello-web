import "./Archive0.css";
import useMousePosition from "./hook/useMousePostion";
function Archive0() {
  const lists = Array.from({ length: 4 }, (_, i) => i);
  const mousePosition = useMousePosition();

  const mouseDecoration = (e: MouseEvent) => {
    return {
      position: "absolute",
      top: mousePosition.y,
      left: mousePosition.x,
      width: "20px",
      height: "20px",
      background: "red",
    };
  }

  return (
    <main className="body" onMouseMove={(e) => mouseDecoration}>
      {JSON.stringify(mousePosition)}
      <div className="card-container">
        {lists.map((item) => (
          <div
            key={item}
            className="card"
            style={{
              
            }}
          >
            Item {item}
          </div>
        ))}
      </div>
    </main>
  );
}

export default Archive0;
