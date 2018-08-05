module.exports = {
  findOrCreate(model, findCondition, defaultValue) {
    return model.findOne({
      where: findCondition
    }).then((data) => {
      if (data) return data
      else {
        return model.create(defaultValue)
      }
    })
    .catch(err => {
      throw err
    })
  }
}
