// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');
// отслеживаем клик по кнопке меню и запускаем функцию
menuToggle.addEventListener('click', function (event) {
  // отменяем стандартное поведение ссылки
  event.preventDefault();
  // вешаем класс на меню, когда кликнули по кнопке меню
  menu.classList.toggle('visible');
})

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userName = document.querySelector('.user-name');



const listUsers = [
  {
    id: '01',
    email: 'pikadu@mail.com',
    password: '123456',
    displayName: 'Pika'
  },
  {
    id: '02',
    email: 'dunkan@mail.com',
    password: '123456',
    displayName: 'PikaDunkan'
  }
];

const setUsers = {
  user: null,
  logIn(email, password, handler) {
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut() {
    console.log('LogOut');
  },
  signUp(email, password, handler) {
    if(!this.getUser(email)) {
      const user = {email, password, displayName: email}
      listUsers.push(user);
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с таким email существует');
    }
  },
  getUser(email) {
    return listUsers.find(item => item.email === email)
  },
  authorizedUser(user) {
    this.user = user;
  }
}

const toggleAuthDom = () => {
  const user = setUsers.user;
  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userName.textContent = user.displayName;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  setUsers.logIn(loginEmail.value, loginPassword.value, toggleAuthDom);
});
loginSignup.addEventListener('click', e => {
  e.preventDefault();
  setUsers.signUp(loginEmail.value, loginPassword.value, toggleAuthDom);
})
toggleAuthDom();
