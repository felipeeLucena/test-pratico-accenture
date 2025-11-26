function generateStudentData() {
  const timestamp = Date.now();

  const firstName = `Nome${timestamp}`;
  const lastName = `Sobrenome${timestamp}`;
  const email = `student_${timestamp}@example.com`;
  const mobile = `9${String(timestamp).slice(-9)}`;
  const address = `Endereço teste ${timestamp}`;
  const gender = "Male";
  const hobby = "Sports";
  const filePath = "cypress/fixtures/upload-test.txt";

  return {
    firstName,
    lastName,
    email,
    mobile,
    address,
    gender,
    hobby,
    filePath
  };
}

module.exports = {
  generateStudentData
};


