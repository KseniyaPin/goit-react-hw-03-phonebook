export const Filter = ({ value, onSearch }) => (
  <label>
    Find contacts by name
    <input type="text" value={value} onChange={onSearch} />
  </label>
);
