import UserApi from './Users.js';
import AssetApi from './Assets.js';
import LikeApi from './Likes.js';

import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = (server) => {
  server.use('/api', UserApi.populateSession);

  server.post('/api/users/signin', UserApi.signIn);
  server.post('/api/users/signup', UserApi.signUp);
  server.post('/api/users/signout', UserApi.hasSession, UserApi.signOut);
  server.get('/api/users/me', UserApi.hasSession, UserApi.me);
  server.get('/api/users/:userId', UserApi.get);
  server.get('/api/users/:userId/assets/likes', LikeApi.getUserLikedAssets);
  server.post('/api/users/assets/:assetId/like', UserApi.hasSession, LikeApi.likeAsset);
  server.post('/api/users/assets/:assetId/unlike', UserApi.hasSession, LikeApi.unlikeAsset);

  server.get('/api/assets/newest', AssetApi.getNewest);
  server.get('/api/assets/category/:category', AssetApi.getByCategory);
  server.get('/api/assets/:assetId', AssetApi.getAsset);
  server.get('/api/assets/:assetId/download', AssetApi.getAssetData);
  server.get('/api/assets/:assetId/liked', LikeApi.getAssetLikedUsers);
  server.post('/api/assets', upload.single('file'), AssetApi.createAsset);
};
