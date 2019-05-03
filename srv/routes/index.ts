import express from 'express';
import { Des } from '../modules/des';
import { Db, IUriDocument } from '../modules/dbi';
import * as store from '../modules/store';
const router = express.Router();

const c: Des = store.c;
const db: Db = store.db;

router.get('/:id', async (req, res, next) => {
  let a: Uint32Array;
  try {
    a = c.decrypt(req.params.id);
  } catch (err) {
    res.sendStatus(404);
    return next();
  }
  const url: IUriDocument[] = await db.find({addId: a[0], id: a[1]});
  if (url.length === 0) {
    res.sendStatus(404);
    return next();
  }
  const uri = url[0];
  if (uri.type === 0) {
    return res.redirect(301, uri.uri);
  }
  const html = `
  <!DOCTYPE html>
  <html lang="ja">
  <head>
    <meta charset="UTF-8">
    <title>Confirmation</title>
  </head>
  <body>
    <header>
      <h1>確認ください</h1>
    </header>
    <section>
      <p>
        要求されたアクセスは以下の URL です。
      </p>
      <a href="${uri.uri}">${uri.uri}</a>
    </section>
  </body>
  </html>
  `;
  return res.send(html);
});

export default router;
