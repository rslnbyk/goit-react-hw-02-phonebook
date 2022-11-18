import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm';
import { Filter } from './Filter';
import { ContactsList } from './ContactsList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  changeContacts = (name, number) => {
    for (const cont of this.state.contacts) {
      if (cont.name === name) {
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

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onSubmitForm={this.changeContacts} />
        <h2>Contacts</h2>
        <Filter onChangeFilter={this.setFilter} />
        <ContactsList
          contacts={this.state.contacts}
          filter={this.state.filter}
          onDeleteContact={this.deleteContact}
        />
      </>
    );
  }
}
