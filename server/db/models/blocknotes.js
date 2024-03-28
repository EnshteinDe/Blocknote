const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blocknotes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Связь многие-к-одному: Blocknotes принадлежит одному User
      models.Blocknotes.belongsTo(models.User, {foreignKey: 'userId'})
      models.Blocknotes.hasMany(models.Notes, {foreignKey: 'blocknoteId', onDelete: 'cascade',  hooks: true, })
    }
  }
  Blocknotes.init(
    {
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Blocknotes',
    }
  );
  return Blocknotes;
};
