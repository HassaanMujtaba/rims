export const FiltersContainer = ({ refer, children }) => {
  return (
    <div ref={refer} className="filtersContainer">
      {children}Myself
    </div>
  );
};
