import React from 'react';
import wppIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';

function TeacherItem() {
  return (
    <article className="teacher-item">
      <header>
        <img src="https://instagram.fvix2-1.fna.fbcdn.net/v/t51.2885-19/s150x150/39341857_312471546169651_297025017474973696_n.jpg?_nc_ht=instagram.fvix2-1.fna.fbcdn.net&_nc_ohc=kY8-aKPjtOsAX9FsVuS&oh=d454a544fd19da3d352596cdc452934d&oe=5F525684" alt="Lucio"/>
        <div>
          <strong>Lucio Sandrini</strong>
          <span>Programação</span>
        </div>
      </header>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        <br/><br/>
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>

      <footer>
        <p>
          Preço/hora
          <strong>R$ 80,00</strong>
        </p>
        <button type="button">
          <img src={wppIcon} alt="Whatsapp"/>
          Entrar em contato
        </button>
      </footer>

    </article>
  );
}

export default TeacherItem;