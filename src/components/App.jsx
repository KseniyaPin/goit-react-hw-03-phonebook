import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Form } from './Form/Form';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './Form/Form.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  //  contacts: [
  //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-45' },
  //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  // ],

  handleInputChange = evt => {
    evt.preventDefault();

    const inputForm = {
      name: evt.currentTarget.name.value,
      number: evt.currentTarget.number.value,
    };

    // Пошук елемента по унікальному значенню властивості в масиві сontacts
    if (
      this.state.contacts.find(
        option => option.name.toLowerCase() === inputForm.name.toLowerCase()
      )
    ) {
      alert(`${inputForm.name} is already in contacts.`);
      return;
    }

    // Записуємо в state введені дані із Input
    this.setState(prevState => {
      return {
        name: inputForm.name,
        number: inputForm.number,
        contacts: [
          ...prevState.contacts,
          { name: inputForm.name, number: inputForm.number, id: nanoid() },
        ],
      };
    });

    // Видаляємо із Input поточні дані, очищуємо після Submit
    const { name, number } = evt.currentTarget;
    number.value = '';
    name.value = '';
  };

  // Фільтруємо дані у полі пошука
  handleSearch = evt => {
    const { value } = evt.currentTarget;
    this.setState({
      filter: value,
    });
  };

  // Для видалення контакту, фільтруємо його по id
  handleDeleteContact = evt => {
    this.setState({
      contacts: this.state.contacts.filter(
        contact => contact.id !== evt.currentTarget.id
      ),
    });
  };

  // Отримуємо із локального сховища масив обєктів, а потім записуємо в state
  //Обов'язово перевіряємо if чи є там дані, щоб не було значення null
  componentDidMount(prevProps, prevState) {
    const getData = localStorage.getItem('contacts');
    const parseGetData = JSON.parse(getData); // Парсимо у масив
    if (parseGetData) {
      this.setState({ contacts: parseGetData });
    }
  }

  // Порівнюємо чи обновився Компонент, якщо так, то записуємо у локальне сховище.
  // (!) перед рендером розміщуємо componentDidUpdate. Не стрілка, а функція
  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    // Шукаємо співпадіння у filter
    const filterContacts = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });

    return (
      <div>
        <h1>Phonebook</h1>
        <Form onInput={this.handleInputChange} />

        <h2>Contacts</h2>
        <section className={css.sectionStyle}>
          <Filter onSearch={this.handleSearch} value={this.state.filter} />
          <ContactList
            contacts={filterContacts}
            onDelete={this.handleDeleteContact}
          />
        </section>
      </div>
    );
  }
}

export default App;
