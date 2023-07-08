module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define("Card", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    card_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    cardholder_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    exp_month: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    exp_year: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    cvv: {
      type: DataTypes.STRING(4),
      allowNull: false,
    },
    balance: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Card;
};
