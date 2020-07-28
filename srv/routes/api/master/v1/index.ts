import express from 'express';
import { Des } from '../../../../modules/des';
import { findAll } from '../../../../modules/dbi';
import * as store from '../../../../modules/store';
import digest from '../../../../modules/digest';
import { stringint2uint } from '../../../../modules/stringint';
const router = express.Router();

router.use(digest);

const c: Des = store.c;


router.get('/content', async (req, res) => {
  const b = await findAll();
  res.json(b.map((value) => {
    return {
      id: value.id,
      encrypt: c.encrypt(stringint2uint(value.id)),
      uri: value.uri,
      type: value.antenna,
    };
  }));
});

export default router;
