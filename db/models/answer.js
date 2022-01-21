const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'user_id' });
    }
  }
  Answer.init({
    question: DataTypes.STRING,
    answer: DataTypes.STRING,
    img: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};
