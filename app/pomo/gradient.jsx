function GradientSVG() {
  const idCSS = "hello";
  const gradientTransform = `rotate(0)`;
  return (
    <svg style={{ height: 0 }}>
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="16.29%" stopColor="#5c7cfa" />
          <stop offset="85.56%" stopColor="#DB64C1" />

        </linearGradient>
      </defs>
    </svg>
  );
}

export default GradientSVG;
