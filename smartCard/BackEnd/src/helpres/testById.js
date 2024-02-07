exports.isValidId = async (model, id) => {
  console.log("tessssssssssssssssssst");
  try {
    console.log("******************************");
    const foundId = await model.findOne({
      where: {
        id: id,
      },
    });

    if (!foundId) {
      console.log("khaled");
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(`Error validating Id: ${error.message || error}`);
    return {
      status: 500,
      message: `Internal Server Error: ${error.message || error}`,
    };
  }
};
