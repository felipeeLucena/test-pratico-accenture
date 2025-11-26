class BookstoreApi {
  constructor() {
    this.accountPath = "/Account/v1";
    this.bookstorePath = "/BookStore/v1";
  }

  createUser(userName, password) {
    return cy.api({
      method: "POST",
      url: `${this.accountPath}/User`,
      body: {
        userName,
        password
      }
    });
  }

  generateToken(userName, password) {
    return cy.api({
      method: "POST",
      url: `${this.accountPath}/GenerateToken`,
      body: {
        userName,
        password
      }
    });
  }

  confirmAuthorization(userName, password) {
    return cy.api({
      method: "POST",
      url: `${this.accountPath}/Authorized`,
      body: {
        userName,
        password
      }
    });
  }

  listBooks() {
    return cy.api({
      method: "GET",
      url: `${this.bookstorePath}/Books`
    });
  }

  rentBooks(userId, isbns, token) {
    return cy.api({
      method: "POST",
      url: `${this.bookstorePath}/Books`,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {
        userId,
        collectionOfIsbns: isbns.map(isbn => ({ isbn }))
      }
    });
  }

  getUserDetails(userId, token) {
    return cy.api({
      method: "GET",
      url: `${this.accountPath}/User/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}

module.exports = {
  BookstoreApi
};


