module.exports = (sequelize, DataTypes) => {
  const Report = sequelize.define('Report', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfReport: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeOfReport: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    selectedImage: {
      type: DataTypes.STRING,
    },
    otherDamages: {
      type: DataTypes.TEXT,
    },
  });

  return Report;
};
