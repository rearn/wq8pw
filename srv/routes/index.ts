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

  const url: IUriDocument[] = await db.find({id: a[1]});
  if (url.length === 0) {
    res.sendStatus(404);
    return next();
  }
  res.redirect(301, url[0].uri);
});

export default router;
