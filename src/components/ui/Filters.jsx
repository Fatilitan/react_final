export const Filters = ({ name, id, changeFn, ...props }) => {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={id}
        style={{ margin: "0 0.5rem" }}
        onClick={changeFn()}
        {...props}
      />
      <label htmlFor={name}>{name}</label>
    </>
  );
};
