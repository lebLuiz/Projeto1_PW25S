class RegisterMapper {
  // Captura objeto do Front e transforma no objeto que deseja enviar pro Back.
  toPersistence(domainRegister) {
    return {
      name: domainRegister.name,
      email: domainRegister.email,
      password: domainRegister.password,
      confirm_password: domainRegister.confirmPassword,
      role: domainRegister?.role || null,
      id_user_relation: domainRegister?.idUserRelation || null,
    };
  }
}

export default new RegisterMapper();
