class CategoryMapper {
  // Captura objeto do Front e transforma no objeto que deseja enviar pro Back.
  toPersistence(domainCategory) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }
}

export default new CategoryMapper();
