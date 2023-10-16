class AuthMapper {
  // Captura objeto do Front e transforma no objeto que deseja enviar pro Back.
  toPersistence(domainAuth) {
    return {
      email: domainAuth.email,
      password: domainAuth.password,
    };
  }
}

export default new AuthMapper();
