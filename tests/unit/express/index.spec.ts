/* eslint-disable vue/max-len */
/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../../../srv/test';
import { dbi } from '../../../srv/modules/store';

const tableSetUp = async () => {
  const connection = await dbi.beginConnection();
  await connection.query('CREATE TABLE `wq8pw` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `uri` varchar(1024) NOT NULL, `antenna` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
  await connection.query('INSERT INTO `wq8pw` VALUES (1, "http://example.com/", false)');
  await connection.query('INSERT INTO `wq8pw` VALUES (2, "http://example.org/test.html", true)');
  await dbi.closeConnection();
};

const tebleReset = async () => {
  const connection = await dbi.beginConnection();
  await connection.query('DROP TABLE `wq8pw`');
  await dbi.closeConnection();
};

beforeAll(tebleReset);

beforeEach(tableSetUp);

afterEach(tebleReset);

describe('POST', () => {
  it('400', () => request(app).post('/api/v1/accept/post').expect(400));
  it('changeless type', () => request(app).post('/api/v1/accept/post')
    .send({ uri: 'http://example.com/', antenna: false })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatch('hjgk26lm7v6qg');
      expect(res.text).toMatch('OkyteWz9fQM');
    }));
  it('change type', () => request(app).post('/api/v1/accept/post')
    .send({ uri: 'http://example.com/', antenna: true })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatch('fy5jyuop4wize');
      expect(res.text).toMatch('LjqcUc_lkZI');
    }));
  it('error url', () => request(app).post('/api/v1/accept/post')
    .send({ uri: 'example.com', antenna: 0 })
    .expect(400));
  it('update', () => request(app).post('/api/v1/accept/post')
    .send({ uri: 'http://example.net/', antenna: 0 })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatch('fy5jyuop4wize');
      expect(res.text).toMatch('LjqcUc_lkZI');
    }));
  it('update2', () => request(app).post('/api/v1/accept/post')
    .send({ uri: 'http://example.org/test.html', antenna: 1 })
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatch('4s5yxhl6exkos');
      expect(res.text).toMatch('5LuLnX4l1Ok');
    }));
});
describe('GET', () => {
  it('path_redirect_long', () => request(app).get('/hjgk26lm7v6qg')
    .then((res) => {
      expect(res.status).toBe(301);
      expect(res.header.location).toBe('http://example.com/');
    }));
  it('path_antenna_long', () => request(app).get('/4s5yxhl6exkos')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatch('http://example.org/test.html');
    }));
  it('path_redirect_short', () => request(app).get('/OkyteWz9fQM')
    .then((res) => {
      expect(res.status).toBe(301);
      expect(res.header.location).toBe('http://example.com/');
    }));
  it('path_antenna_short', () => request(app).get('/5LuLnX4l1Ok')
    .then((res) => {
      expect(res.status).toBe(200);
      expect(res.text).toMatch('http://example.org/test.html');
    }));
  it('path_error_uri_none', () => request(app).get('/LjqcUc_lkZI').expect(404));
  it('path_error_different_path', () => request(app).get('/1234567890ab').expect(404));
  it('path_error_code_none', () => request(app).get('/1234567890ab_').expect(404));
  it('path_error_over_52bit', () => request(app).get('/1234567890a').expect(404));
});
describe('master', () => {
  it('401', () => request(app).get('/api/master/v1/content').expect(401));
  it('get', () => {
    const auth = `Digest ${
      [
        'username="min"',
        'realm="http-auth@example.org"',
        'nonce="zIfyYxm7oe30QPvTy4cYJGZTrg6ZIbGm"',
        'uri="/api/master/v1/content"',
        'cnonce="YjNiNGEwZDc3ZWJiYzVlN2EzYTVlMmVlMjZiNDk3MjM="',
        'nc=00000001',
        'qop=auth',
        'response="ec158a399f5d09a950932aa6379028dedf2a82b72dde14efb6e36d22c9236e5a"',
        'opaque="d6//F+5PvB5czfxLB39NZVDi2MfgnwFy"',
        'algorithm="SHA-256"',
      ].join(', ')}`;
    return request(app).get('/api/master/v1/content')
      .set('Authorization', auth)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
