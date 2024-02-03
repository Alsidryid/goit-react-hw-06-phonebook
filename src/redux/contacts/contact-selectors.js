export const getAllContacts = store => store.contacts;

export const getFiltredContacts = store => {
  const { contacts, filter } = store;
  if (!filter) {
    return contacts;
  }
  return contacts.filter(({ name }) => {
    return name.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
  });
};
