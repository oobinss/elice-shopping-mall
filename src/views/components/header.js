import { isAuth, getCookie, deleteCookie } from '../useful-functions.js';

const UserLogOut = () => {
  if (!isAuth()) {
    window.location.href = '/login';
    return;
  }
  const logout = window.confirm('로그아웃 하시겠습니까?');
  if (!logout) return;
  deleteCookie('email');
  deleteCookie('accessToken');
  deleteCookie('refreshToken');
  window.location.href = '/';
};

const onOffLoginOut = () => {
  const logout = document.querySelector('.logout');
  logout.addEventListener('click', UserLogOut);
};

const navSection = () => {
  const isLoggedIn = isAuth();
  const isAdmin = getCookie('email') === 'manager@gmail.com';
  const shoppingMallHeader = document.querySelector('.shopping-mall-header');
  const header = `<nav class="header-navbar display-center">
  <div class="header-navbar-container">
    <div class="header-navbar-brand">
      <a class="header-navbar-item" href="/">
        <img src="../../../uploads/logo.svg" width="130"/>
      </a>
    </div>
        <ul class="header-navbar-menu">
        <li><a href="/product">Product</a></li>
        <li><a class="logout">${isLoggedIn ? `Logout` : `Login`}</a></li>
        ${isLoggedIn ? '' : `<li><a href="/register">Sign up</a></li>`}
          ${isAdmin ? `<li><a href="/admin">Admin</a></li>` : ''}
          ${
            isLoggedIn
              ? `<li><a href="/mypage"><i class="fa-solid fa-user-large"></i></a></li>`
              : ''
          }
          ${
            isLoggedIn
              ? `<li>
          <a href="/cart" aria-current="page">
            <i class="fa-solid fa-cart-shopping"></i>
          </a>
        </li>`
              : ''
          }
        </ul>
    </div>
  </div>
  </nav>
  `;
  shoppingMallHeader.innerHTML = header;
};

const navRender = () => {
  navSection();
  onOffLoginOut();
};

export { navRender };
