var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var Transaction = sequelize.define( 'Transaction', {
    Amount: {
      allowNull: false,
      type: DataTypes.INTEGER( 5 )
    },

    Posted: {
      allowNull: true,
      type: DataTypes.DATE(),
      defaultValue: null
    },

    Failed: {
      allowNull: true,
      type: DataTypes.DATE(),
      defaultValue: null
    },

    Queue: {
      allowNull: true,
      type: DataTypes.DATE(),
      defaultValue: null
    }

  }, { timestamps: true } );

  return Transaction;

};
