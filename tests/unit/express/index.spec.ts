/**
 * @jest-environment node
 */

import request from 'supertest';
import app from '../../../srv/test';
import { beginConnection, closeConnection } from '../../../srv/dbConnection';

const tableSetUp = async () => {
  const connection = await beginConnection();
  await connection.query('CREATE TABLE `wq8pw` (`id` bigint UNSIGNED NOT NULL AUTO_INCREMENT, `uri` varchar(1024) NOT NULL, `antenna` tinyint NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB');
  await connection.query('INSERT INTO `wq8pw` VALUES (1, "http://example.com/", false)');
  await connection.query('INSERT INTO `wq8pw` VALUES (2, "http://example.org/test.html", true)');
  await closeConnection();
};

const tebleReset = async () => {
  const connection = await beginConnection();
  await connection.query('DROP TABLE `wq8pw`');
  await closeConnection();
};

beforeAll(tebleReset);

beforeEach(tableSetUp);

afterEach(tebleReset);

describe('POST', () => {
  it('400', () => {
    return request(app).post('/api/v1/accept/post').expect(400);
  });
  it('changeless type', () => {
    return request(app).post('/api/v1/accept/post')
      .send({uri: 'http://example.com/', antenna: 0})
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toMatch('hv2zlkml76aj2');
        expect(res.text).toMatch('PXWVqYv_gJ0');
    });
  });
  it('change type', () => {
    return request(app).post('/api/v1/accept/post')
      .send({uri: 'http://example.com/', antenna: 1})
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toMatch('4s5yxhl6exkos');
        expect(res.text).toMatch('5LuLnX4l1Ok');
    });
  });
  it('error url', () => {
    return request(app).post('/api/v1/accept/post')
      .send({uri: 'example.com', antenna: 0})
      .expect(400);
  });
  it('update', () => {
    return request(app).post('/api/v1/accept/post')
      .send({uri: 'http://example.net/', antenna: 0})
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toMatch('4s5yxhl6exkos');
        expect(res.text).toMatch('5LuLnX4l1Ok');
    });
  });
  it('update2', () => {
    return request(app).post('/api/v1/accept/post')
      .send({uri: 'http://example.org/test.html', antenna: 1})
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toMatch('OkyteWz9fQM');
        expect(res.text).toMatch('hjgk26lm7v6qg');
    });
  });
});
describe('GET', () => {
  it('path_redirect_long', () => {
    return request(app).get('/hv2zlkml76aj2')
      .then((res) => {
        expect(res.status).toBe(301);
        expect(res.header.location).toBe('http://example.com/');
      });
  });
  it('path_antenna_long', () => {
    return request(app).get('/hjgk26lm7v6qg')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toMatch('http://example.org/test.html');
      });
  });
  it('path_redirect_short', () => {
    return request(app).get('/PXWVqYv_gJ0')
      .then((res) => {
        expect(res.status).toBe(301);
        expect(res.header.location).toBe('http://example.com/');
      });
  });
  it('path_antenna_short', () => {
    return request(app).get('/OkyteWz9fQM')
      .then((res) => {
        expect(res.status).toBe(200);
        expect(res.text).toMatch('http://example.org/test.html');
      });
  });
  it('path_error_uri_none', () => {
    return request(app).get('/5LuLnX4l1Ok').expect(404);
  });
  it('path_error_different_path', () => {
    return request(app).get('/1234567890ab').expect(404);
  });
  it('path_error_code_none', () => {
    return request(app).get('/1234567890ab_').expect(404);
  });
  it('path_error_over_52bit', () => {
    return request(app).get('/1234567890a').expect(404);
  });
});
describe('master', () => {
  it('401', () => {
    return request(app).get('/api/master/v1/content').expect(401);
  });
  it('get', () => {
    const auth = 'Digest ' +
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
    ].join(', ');
    return request(app).get('/api/master/v1/content')
      .set('Authorization', auth)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });
});
