const QRCode = require('qrcode');

exports.generateQR = async txt => {
  try {
    const data = await QRCode.toDataURL(txt || 'I am a pony!');
    console.log('DATA', data);
    return data;
  } catch (e) {
    console.log('Error', e);
  }
};

exports.generateQRConsole = async txt => {
  try {
    const qrCode = await QRCode.toString(txt || 'I am a pony!', { type: 'terminal' });
    // Printing the generated code
    console.log(qrCode);
  } catch (e) {
    console.log('Error', e);
  }
};
