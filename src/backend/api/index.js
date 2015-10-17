import UserApi from './Users.js';
import AssetApi from './Assets.js';
import LikeApi from './Likes.js';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = (server) => {
  server.use('/backend', UserApi.populateSession);

  server.post('/backend/users/signin', UserApi.signIn);
  server.post('/backend/users/signup', UserApi.signUp);
  server.get('/backend/users/me', UserApi.hasSession, UserApi.me);
  server.get('/backend/users/:userId', UserApi.get);
  server.get('/backend/users/:userId/assets/likes', LikeApi.getUserLikedAssets);
  server.get('/backend/users/assets/:assetId/like', UserApi.hasSession, LikeApi.likeAsset);
  server.get('/backend/users/assets/:assetId/unlike', UserApi.hasSession, LikeApi.unlikeAsset);

  server.get('/backend/assets/newest', AssetApi.getNewest);
  server.get('/backend/assets/category/:category', AssetApi.getByCategory);
  server.get('/backend/assets/:assetId', AssetApi.getAsset);
  server.get('/backend/assets/:assetId/liked_by', LikeApi.getAssetLikedByUsers);
  server.post('/backend/assets', UserApi.hasSession, upload.single('asset'), AssetApi.createAsset);
};
