const crypto = require('crypto');

exports.generateCouponCode = (inputString) => {
  // Convert the string to a buffer
  const buffer = Buffer.from(inputString, 'utf-8');

  // Generate random bytes until the length is 14 bytes
  let bytes;
  do {
    bytes = crypto.randomBytes(7);
  } while (bytes.length !== 7);

  const couponCode = bytes.toString('hex');
  

  return couponCode;
};
