import express from 'express';
import { Des, UriString } from '../../../modules/des';
import { update } from '../../../modules/dbi';
import * as store from '../../../modules/store';
import * as adjuster from 'adjuster';
const router = express.Router();

const c: Des = store.c;

router.post('/accept/post', async (req, res) => {
  const uri: string = req.body.uri;
  if (! adjuster.STRING.PATTERN.URI.test(uri)) {
    return res.status(400).end();
  }
  const type: boolean = req.body.antenna; // ???

  const id: Uint32Array = await update(uri, type);
  const retUri: UriString = c.encrypt(id);
  res.json(retUri);
});

export default router;
