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
const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const loginEmail = document.querySelector('.login-email');
const loginPassword = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');
const userElem = document.querySelector('.user');
const userName = document.querySelector('.user-name');

const exit = document.querySelector('.exit');
const edit = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatar = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

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
    if (!regExpValidEmail.test(email)) {
      alert('email is not valid');
      return;
    }
    const user = this.getUser(email);
    if(user && user.password === password) {
      this.authorizedUser(user);
      handler();
    } else {
      alert('Пользователь с такими данными не найден');
    }
  },
  logOut(handler) {
    this.user = null;
    handler();
  },
  signUp(email, password, handler) {
    if (!regExpValidEmail.test(email)) {
      alert('email is not valid');
      return;
    }
    if (!email.trim() || !password.trim()) {
      alert('Enter your email');
      return;
    }
    if(!this.getUser(email)) {
      const user = {email, password, displayName: email.substring(0, email.indexOf('@'))}
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
  },
  editUser(userName, userPhoto, handler) {
    if(userName) {
      this.user.displayName = userName;
    }
    if(userPhoto) {
      this.user.photo = userPhoto;
    }
    handler();
  }
}

const setPosts = {
  allPosts: [
    {
      title: 'Заголовлок поста',
      text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его снова решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство чтовопроса ведущими о решила одна алфавит!',
      tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
      author: 'pika@mail.com',
      date: '11.11.2020, 20:54:00',
      like: 15,
      comments: 10
    },
    {
      title: 'Заголовлок поста2',
      text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad beatae delectus eos expedita minus modi, nam necessitatibus nobis odio pariatur perferendis possimus quisquam rem saepe, similique sint vero vitae, voluptatum?',
      tags: ['свежее', 'старое', 'холодное', 'мое', 'гласных'],
      author: 'iusea@mail.com',
      date: '10.11.2020, 09:22:32',
      like: 56,
      comments: 34
    }
  ]
}

const toggleAuthDom = () => {
  const user = setUsers.user;
  if(user) {
    loginElem.style.display = 'none';
    userElem.style.display = '';
    userName.textContent = user.displayName;
    userAvatar.src = user.photo || userAvatar.src;
  } else {
    loginElem.style.display = '';
    userElem.style.display = 'none';
  }
};

const showAllPosts = () => {
  let postHTML = '';
  setPosts.allPosts.forEach( post => {
    postHTML += `
            <section class="post">
        <div class="post-body">
          <h2 class="post-title">${post.title}</h2>
          <p class="post-text">${post.text}</p>
          <div class="tags">
            <a href="#" class="tag">#свежее</a>
          </div>
        </div>
        <div class="post-footer">
          <div class="post-buttons">
            <button class="post-button likes">
              <svg width="19" height="20" class="icon icon-like">
                <use xlink:href="img/icons.svg#like"></use>
              </svg>
              <span class="likes-counter">${post.like}</span>
            </button>
            <button class="post-button comments">
              <svg width="21" height="21" class="icon icon-comment">
                <use xlink:href="img/icons.svg#comment"></use>
              </svg>
              <span class="comments-counter">${post.comments}</span>
            </button>
            <button class="post-button save">
              <svg width="19" height="19" class="icon icon-save">
                <use xlink:href="img/icons.svg#save"></use>
              </svg>
            </button>
            <button class="post-button share">
              <svg width="17" height="19" class="icon icon-share">
                <use xlink:href="img/icons.svg#share"></use>
              </svg>
            </button>
          </div>

          <div class="post-author">
            <div class="author-about">
              <a href="#" class="author-username">${post.author}</a>
              <span class="post-time">5 минут назад</span>
            </div>
            <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
          </div>

        </div>
      </section>
    `;
  });

  postsWrapper.innerHTML = postHTML;
}

const init = () => {
  showAllPosts();
  toggleAuthDom();
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    setUsers.logIn(loginEmail.value, loginPassword.value, toggleAuthDom);
    loginForm.reset();
  });
  loginSignup.addEventListener('click', e => {
    e.preventDefault();
    setUsers.signUp(loginEmail.value, loginPassword.value, toggleAuthDom);
    loginForm.reset();
  });
  exit.addEventListener('click', e => {
    e.preventDefault();
    setUsers.logOut(toggleAuthDom);
  })

  edit.addEventListener('click', e => {
    e.preventDefault();
    editContainer.classList.toggle('visible');
    editUsername.value = setUsers.user.displayName;
  });

  editContainer.addEventListener('submit', e => {
    e.preventDefault();
    setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
    editContainer.classList.remove('visible');
  });
}

document.addEventListener('DOMContentLoaded', init);
