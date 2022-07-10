export function ButtonMore({ onClick }) {
  return (
    <button
      className="button "
      type="button"
      onClick={() => {
        onClick();
      }}
    >
      More
    </button>
  );
}
