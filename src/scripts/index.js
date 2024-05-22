import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import '../styles/main.css';
import swRegister from './utils/sw-register.js';
import './components/app-bar.js';
import './components/app-hero.js';
import './components/footer-bar.js';
import App from './views/app.js';

const START = 10;
const NUMBER_OF_IMAGES = 100;

const app = new App({
  button: document.querySelector('#hamburger'),
  drawer: document.querySelector('#drawer'),
  content: document.querySelector('#restoList'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});
 
window.addEventListener('load', async () => {
  app.renderPage();
  await swRegister();
});

// Dynamic import of lodash.filter
const filterContacts = async () => {
  try {
    const { default: filter } = await import('lodash.filter');
    const contacts = []; // Your contacts data here
    const contactType = { value: 'all' }; // Your contactType logic here
    
    filter(contacts, contactType.value === 'all' ? {} : { type: contactType.value })
      .forEach(renderContact);
  } catch (error) {
    alert(error);
  }
};

// Call filterContacts when needed
filterContacts();

function renderContact(contact) {
  // Your render logic here
}
