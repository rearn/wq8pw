import express from 'express';
import { Des, UriString } from '../../../modules/des';
import { Db, redirectType } from '../../../modules/dbi';
import * as store from '../../../modules/store';
import * as adjuster from 'adjuster';
const router = express.Router();

const c: Des = store.c;
const db: Db = store.db;


router.post('/accept/post', async (req, res) => {
  const uri: string = req.body.uri;
  if (! adjuster.STRING.PATTERN.URI.test(uri)) {
    return res.status(400).end();
  }
  const type: redirectType = req.body.antenna;

  const id: Uint32Array = await db.update(uri, type);
  const retUri: UriString = c.encrypt(id);
  res.json(retUri);
});

export default router;
