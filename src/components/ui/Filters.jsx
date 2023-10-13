export const Filters = ({ name, id, ...props }) => {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={id}
        style={{ margin: "0 0.5rem" }}
        {...props}
      />
      <label htmlFor={name}>{name}</label>
    </>
  );
};
