import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';
import { categoryService } from '../services';

const categoryRouter = Router();

// 상품추가 api (아래는 /register이지만, 실제로는 /api/register로 요청해야 함.)
categoryRouter.post('/register', loginRequired, async (req, res, next) => {
  try {
    // Content-Type: application/json 설정을 안 한 경우, 에러를 만들도록 함.
    // application/json 설정을 프론트에서 안 하면, body가 비어 있게 됨.
    if (is.emptyObject(req.body)) {
      throw new Error(
        'headers의 Content-Type을 application/json으로 설정해주세요'
      );
    }

    // jwt에서 sellerId 받아오기
    const role = req.currentRole;
    if (role !== 'admin') {
      throw new Error('해당 기능은 매니저만 가능합니다.');
    }
    // req (request)의 body 에서 데이터 가져오기
    const { name } = req.body;
    const { code } = req.body;
    const { codeRef } = req.body;
    console.log(role);
    // 위 데이터를 제품 db에 추가하기
    const newCategory = await categoryService.addCategory({
      name,
      code,
      codeRef,
    });

    // 추가된 유저의 db 데이터를 프론트에 다시 보내줌
    // 물론 프론트에서 안 쓸 수도 있지만, 편의상 일단 보내 줌
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
});

// 전체 상품 목록을 가져옴 (배열 형태임)
// 미들웨어로 loginRequired 를 썼음 (이로써, jwt 토큰이 없으면 사용 불가한 라우팅이 됨)
categoryRouter.get('/categorylist', async (req, res, next) => {
  try {
    // 전체 제품 목록을 얻음
    const category = await categoryService.getCategoryAll();

    // 제품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

// 카테고리 상세
categoryRouter.get('/detail/:categoryName', async (req, res, next) => {
  try {
    const { categoryName } = req.params;
    const getcategoryName = await categoryService.findByCategory(categoryName);
    console.log('ddd');
    res.status(200).json(getcategoryName);
  } catch (error) {
    next(error);
  }
});

// 상품 삭제
categoryRouter.delete(
  '/delete/:categoryId',
  loginRequired,
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      await categoryService.deleteCategory(categoryId);
      const ok = { success: 'success' };
      res.status(200).json(ok);
    } catch (error) {
      next(error);
    }
  }
);
export { categoryRouter };
