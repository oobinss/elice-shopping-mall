import * as Api from '/api.js';
import { navRender } from '../../components/header.js';
import { getCookie } from '/useful-functions.js';
import { pageScroll } from '../../components/pagescroll.js';

navRender();
pageScroll();

if (getCookie('email') === 'manager@gmail.com') {
  orderHistory();
} else {
  alert('관리자만 접근이 가능합니다.');
  window.location.href = '/login';
}

const ordersContainer = document.querySelector('#ordersContainer');

// get으로 데이터를 가져온 후 필요한 정보를 출력
async function orderHistory() {
  // 주문이 완료된 현재 날짜를 가져옴

  const ordersList = await Api.get('/api/orders/admin', '', true);

  // get으로 가져온 데이터에 products(상품명,수량)를 담음

  ordersList.forEach((item) => {
    const orderNumber = item._id;
    const orderItemName = item.purchaseOrderInfo.products[0];
    const orderUserID = item.orderer.email;
    const orderUserName = item.orderer.fullName;
    const orderDate = item.updatedAt;

    // 주문된 상품 리스트를 만들어줌
    ordersContainer.insertAdjacentHTML(
      'beforeend',
      `<div class="columns orders-item" >
        <div class="column is-2">
        ${orderDate.slice(0, 10)} 
        ${orderDate.slice(11, 19)}
        [${orderNumber}]<br>
        </div>
        <div class="column is-2">${orderUserID}<br>${orderUserName}</div>
        <div class="column is-4">${orderItemName}<br></div>
        <div class="column is-2">상품 준비중</div>
        <div class="column is-2"><button class="orderCancel" id="${orderNumber}">주문 취소</button></div>
        </div> `
    );
  });

  // 취소 버튼이 클릭되면 주문을 취소
  const orderCancelBtn = document.querySelectorAll('.orderCancel');
  for (const btn of orderCancelBtn) {
    btn.addEventListener('click', async (event) => {
      const orderId = event.target.id;
      if (window.confirm('삭제하시겠습니까?')) {
        await Api.patch(`/api/orders/${orderId}`);
        location.reload();
      } else {
        return;
      }
    });
  }
}
