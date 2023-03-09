const cloudinary = require('cloudinary');
const router = require('express').Router();
require('dotenv').config();

cloudinary.config({
  cloud_name: 'dpt7imdp1',
  api_key: '829315958135213',
  api_secret: 'ig2PxlfeMQNS-Z7px7cKzAwmJbU',
});

router.delete('/:public_id', async (req, res) => {
  const { public_id } = req.params;
  try {
    await cloudinary.uploader.destroy(public_id);
    res.status(200).send();
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;
