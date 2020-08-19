// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import * as store from '../../../../modules/store';
import digest from '../../../../modules/digest';

const router = express.Router();

router.use(digest);

router.get('/content', async (req, res) => {
  const b = await store.dbi.findAll();
  res.json(b.map((value) => ({
    id: value.id,
    encrypt: store.c.encrypt(value.id),
    uri: value.uri,
    type: value.antenna,
  })));
});

export default router;
