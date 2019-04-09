import express from 'express';
import { Des, UriString } from '../../../modules/des';
import { Db, redirectType } from '../../../modules/dbi';
import * as store from '../../../modules/store';
const router = express.Router();

const c: Des = store.c;
const db: Db = store.db;


router.post('/accept/post', async (req, res) => {
  const uri: string = req.body.uri;
  const type: redirectType = ('jamp_flag' in req.body) ? redirectType.antenna : redirectType.redirect;

  const id: Uint32Array = await db.update(uri, type);
  const retUri: UriString = c.encrypt(id);
  res.json(retUri);
});

export default router;
