import express from 'express';
import { Des } from '../../../../modules/des';
import { Db } from '../../../../modules/dbi';
import * as store from '../../../../modules/store';
import digest from '../../../../modules/digest';
const router = express.Router();

router.use(digest);

const c: Des = store.c;
const db: Db = store.db;


router.get('/content', async (req, res) => {
  const b = await db.find({});
  res.json(b.map((value) => {
    return {
      id: c.encrypt(new Uint32Array(['addId' in value ? value.addId : 0, value.id])),
      uri: value.uri,
      type: value.type,
    };
  }));
});

export default router;
