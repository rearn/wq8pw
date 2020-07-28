import express from 'express';
import { Des } from '../modules/des';
import { findUri } from '../modules/dbi';
import * as store from '../modules/store';
const router = express.Router();

const c: Des = store.c;

router.get('/:id', async (req, res, next) => {
  let a: Uint32Array;
  try {
    a = c.decrypt(req.params.id);
  } catch (err) {
    res.sendStatus(404);
    return next();
  }
  const url = await findUri(a);
  if (url === undefined) {
    res.sendStatus(404);
    return next();
  }
  if (! url.antenna) {
    return res.redirect(301, url.uri);
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
      <a href="${url.uri}">${url.uri}</a>
    </section>
  </body>
  </html>
  `;
  return res.send(html);
});

export default router;
