export const uint2stringint = (v: Uint32Array) => {
  if (v[0] === 0) {
    return v[1].toString();
  }
  const n = 0x10000;
  const m = 10000000000;

  const u = Math.floor(v[0] / n);
  const l = v[0] - u * n;
  const ll =  l * n * n + v[1];
  if (u === 0) {
    return ll.toString();
  }
  const a = u * n * n;
  const b = Math.floor(a / m);
  const c = a - b * m;
  const cnll = c * n + ll;
  const cnllD = Math.floor(cnll / m);
  const cnllM = cnll - cnllD * m;
  const uStr = (b * n + cnllD).toString();
  const lStr = cnllM.toString().padStart(m.toString().length - 1, '0');
  return uStr.concat(lStr);
};

export const stringint2uint = (v: string) => {
  if (v.length >= 10) {
    const m = 0x100000000;
    const n = 10;
    const a = parseInt(v.slice(0, 10), 10);
    // tslint:disable-next-line:no-shadowed-variable
    const b = v.slice(10).split('').map((v) => parseInt(v, 10));
    let c = Math.floor(a / m);
    let d = a - c * m;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < b.length; i++) {
      d = d * n + b[i];
      const e = Math.floor(d / m);
      d -= e * m;
      c = c * n + e;
    }
    if (c >= m) {
      throw new Error('でかすぎる');
    }
    return new Uint32Array([c, d]);
  }
  return new Uint32Array([0, parseInt(v, 10)]);
};
