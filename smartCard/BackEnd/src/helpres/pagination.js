exports.getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  };
  exports.getPagingData = (
    page,
    limit,
    data,
    totalItems,
    extraData,
  ) => {
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalPages, currentPage, data, totalItems, extraData };
  };