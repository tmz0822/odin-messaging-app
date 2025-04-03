const getUser = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  console.log(req.user);
  res.json({
    id: req.user.id,
    username: req.user.username,
  });
};

module.exports = {
  getUser,
};
