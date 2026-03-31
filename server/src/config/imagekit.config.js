import ImageKit from 'imagekit';
import config from './config.js';

const imagekit = new ImageKit({
  publicKey: config.imageKitPublicKey,
  privateKey: config.imageKitPrivate,
  urlEndpoint: config.imageKitUrlEndpoint,
});

export default imagekit;
