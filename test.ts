import { DES } from 'des.js';
const encrypt = ( key, data: number ) => {
  const b = DES.create({type: 'encrypt', key: Buffer.from(key)});

  return Buffer.from(b.update((Buffer.from(('0000000000000000' + data.toString(16)).substr(-16), 'hex'))));

}

const decrypt = ( key, data: Buffer ) => {
  const b = DES.create({type: 'dencrypt', key: Buffer.from(key)});

  return parseInt(Buffer.from(b.update(data)).toString('hex'), 16);
}

['abcdefgh', '12345678'].forEach(key => {
    for (let i = 0; i < 0xffff; i++) {
        const a = encrypt(key, i);
        const b = decrypt(key, a);
        if (i !== b) {    
            console.log(i,b);
        }
    }
    
});
