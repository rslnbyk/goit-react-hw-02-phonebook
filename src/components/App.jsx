import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactsList } from './ContactsList/ContactsList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  changeContacts = ({ name, number }) => {
    for (const cont of this.state.contacts) {
      if (cont.name.toLowerCase() === name.toLowerCase()) {
        alert(`${name} is already in contacts`);
        return;
      }
    }
    this.setState(prev => {
      return {
        contacts: [...prev.contacts, { id: nanoid(), name, number }],
      };
    });
  };

  deleteContact = contact => {
    this.setState(prev => {
      return { contacts: prev.contacts.filter(cont => cont.id !== contact.id) };
    });
  };

  setFilter = filter => {
    this.setState({ filter });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    let result = [];
    if (!filter) {
      return [...contacts];
    } else {
      contacts.forEach(cont => {
        if (cont.name.toLowerCase().includes(filter.toLowerCase())) {
          result.push(cont);
        }
      });
    }

    return result;
  };

  render() {
    const { contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.changeContacts} />
        {contacts.length > 0 && (
          <>
            <h2>Contacts</h2>
            <Filter onChangeFilter={this.setFilter} />
            <ContactsList
              contacts={filteredContacts}
              onDeleteContact={this.deleteContact}
            />
          </>
        )}
      </>
    );
  }
}
