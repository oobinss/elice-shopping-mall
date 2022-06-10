import { navRender } from '../components/header.js';
import { pageScroll } from '../components/pagescroll.js';
import { getCookie } from '/useful-functions.js';

navRender();
pageScroll();

if (getCookie.getItem('email') !== 'manager@gmail.com') {
  alert('관리자만 접근이 가능합니다.');
  window.location.href = '/login';
}
