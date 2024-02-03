import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact } from '../redux/contacts/contacts-slice';
import { setFilter } from '../redux/filter/filter-slice';
import ConstactsList from './ContactsList/ContactsList';
import PhoneForm from './PhoneForm/PhoneForm';
import Filter from './Filter/Filter';
import style from './App.module.css';
import { getFiltredContacts } from '../redux/contacts/contact-selectors';

const App = () => {
  const contacts = useSelector(getFiltredContacts);

  const dispatch = useDispatch();

  const isDublicate = ({ name }) => {
    const normalizetName = name.toLowerCase();
    const dublicateName = contacts.find(item => {
      const normalizetCurrentName = item.name.toLowerCase();
      return normalizetCurrentName === normalizetName;
    });
    return Boolean(dublicateName);
  };

  const onAddContact = formState => {
    if (isDublicate(formState)) {
      return alert(`${formState.name} is already in contacts`);
    }

    dispatch(addContact(formState));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const changeFilter = ({ target }) => dispatch(setFilter(target.value));

  return (
    <div className={style.box}>
      <h1 className={style.title}>Phonebook</h1>
      <PhoneForm onSubmit={onAddContact} />
      <h2 className={style.title}>Contacts</h2>
      <Filter onChange={changeFilter} />
      <ConstactsList items={contacts} onDeleteContact={onDeleteContact} />
    </div>
  );
};

export default App;
