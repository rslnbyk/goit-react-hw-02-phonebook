import { Component } from 'react';
import PropTypes from 'prop-types';
import { DeleteButton, ContactsListItem } from './ContactsList.styled';

export class ContactsList extends Component {
  filterNames = () => {
    const { filter, contacts } = this.props;
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
    return (
      <ul>
        {this.filterNames().map(cont => (
          <ContactsListItem key={cont.id}>
            {cont.name}: {cont.number}
            <DeleteButton
              type="button"
              onClick={() => {
                this.props.onDeleteContact(cont);
              }}
            >
              Delete
            </DeleteButton>
          </ContactsListItem>
        ))}
      </ul>
    );
  }
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  filter: PropTypes.string.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
