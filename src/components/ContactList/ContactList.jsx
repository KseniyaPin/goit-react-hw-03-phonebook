export const ContactList = ({ contacts, onDelete }) => {
  return (
    <>
      <ul>
        {contacts.map(({ id, name, number }) => {
          return (
            <li key={id} id={id} onClick={onDelete}>
              {name}: {number}
              <button type="button">Delete</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
