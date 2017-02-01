module.exports = function(Post) {
  Post.validatesLengthOf('caption', {min: 3, message: {min: 'The caption needs at least 3 characters'}});
};
