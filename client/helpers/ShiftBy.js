export function ShiftBy({ x = 0, y = 0, children, ...delegated }) {
  return (
    <div
      {...delegated}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      {children}
    </div>
  );
}
