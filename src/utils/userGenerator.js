function generateUserCredentials() {
  const timestamp = Date.now();

  const userName = `user_${timestamp}`;
  const password = `Password!${timestamp}`;

  return {
    userName,
    password
  };
}

module.exports = {
  generateUserCredentials
};


