var Sequelize = require( "sequelize" );

module.exports = function ( sequelize, DataTypes ) {

  var ServiceProvider = sequelize.define( 'ServiceProvider', {
    Name: {
      allowNull: false,
      type: DataTypes.STRING( 50 )
    }

  }, { timestamps: true } );

  return ServiceProvider;

};
