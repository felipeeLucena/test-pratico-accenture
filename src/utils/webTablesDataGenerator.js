function generateWebTableRecord() {
  const timestamp = Date.now();

  const firstName = `Nome${timestamp}`;
  const lastName = `Sobrenome${timestamp}`;
  const email = `webtable_${timestamp}@example.com`;
  const age = Math.floor(Math.random() * (75 - 18 + 1)) + 18;
  const salary = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000;
  const department = `Dept ${timestamp}`;

  return {
    firstName,
    lastName,
    email,
    age,
    salary,
    department
  };
}

module.exports = {
  generateWebTableRecord
};


