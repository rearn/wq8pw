/**
 * @jest-environment node
 */

import * as stringint from '../../../srv/modules/stringint';



describe('uint2stringint', () => {
  it('short', () => {
    const inData = new Uint32Array([0, 42]);
    const outData = '42';
    expect(stringint.uint2stringint(inData)).toBe(outData);
  });

  it('mid', () => {
    const inData = new Uint32Array([0x00000012, 0x34567890]);
    const outData = '78187493520';
    expect(stringint.uint2stringint(inData)).toBe(outData);
  });

  it('long', () => {
    const inData = new Uint32Array([0x00041181, 0x923f834f]);
    const outData = '1145148108931919';
    expect(stringint.uint2stringint(inData)).toBe(outData);
  });
});
describe('stringint2uint', () => {
  it('short', () => {
    const inData = '42';
    const outData = new Uint32Array([0, 42]);
    expect(stringint.stringint2uint(inData)).toStrictEqual(outData);
  });

  it('mid', () => {
    const inData = '78187493520';
    const outData = new Uint32Array([0x00000012, 0x34567890]);
    expect(stringint.stringint2uint(inData)).toStrictEqual(outData);

  });

  it('long', () => {
    const inData = '1145148108931919';
    const outData = new Uint32Array([0x00041181, 0x923f834f]);
    expect(stringint.stringint2uint(inData)).toStrictEqual(outData);
  });
});
