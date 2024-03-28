const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Notes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Связь многие-к-одному: Blocknotes принадлежит одному User
      models.Notes.belongsTo(models.Blocknotes, {foreignKey: 'blocknoteId' })
    }
  }
  Notes.init(
    {
      title: {type: DataTypes.STRING, defaultValue: 'Без названия'},
      text: {type: DataTypes.STRING, defaultValue: ''}
    },
    {
      sequelize,
      modelName: 'Notes',
    }
  );
  return Notes;
};
