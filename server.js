const express = require( "express" );
const bodyParser = require( "body-parser" );
const app = express();
const path = require( "path" );
const db = require( "./models" );
const sequelize = require( "sequelize" );
const chalkAnimation = require( 'chalk-animation' );
const exphbs = require( "express-handlebars" );

// const session = require( "express-session" );

const PORT = process.env.PORT || 3000;

// =============================================================
// NEEDED FOR PASSPORT

// Creating express app and configuring middleware needed for authentication
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( bodyParser.text() );
app.use( bodyParser.json( { type: "application/vnd.api+json" } ) );
app.use( express.static( "public" ) );
// app.use( '/static', express.static( path.join( __dirname, 'public' ) ) )

// We need to use sessions to keep track of our user's login status
// app.use( session( {
//   secret: "keyboard cat",
//   resave: true,
//   saveUninitialized: true
// } ) );
// app.use( passport.initialize() );
// app.use( passport.session() );
//
//  Requiring our routes
require( "./routes/routes.js" )( app );
// require( "./routes/api-routes.js" )( app );

// =============================================================

// Routes
// =============================================================
// Set Handlebars as the
// default templating engine.
app.engine( "handlebars", exphbs( {
  defaultLayout: "main",
  partialsDir: [//  path to your partials
    __dirname + '/views/layouts/partials']
} ) );
app.set( "view engine", "handlebars" );
// const routes = require( "./config/routes.js" )
// app.use( "/", apiRoutes, htmlRoutes );
// app.use( "/", router );

// Syncing our sequelize models and then starting our Express app
// =============================================================
db
  .sequelize
  .sync( {
    // force: true,
    // force makes the db drop and recreate everytime you start the server
    logging: true

  } )
  .then( function () {
    app.listen( PORT, function () {
      console.log( "------------------------------------------------------------------------------------------------------------" );
      console.log( 'N - e - w     D - a - t - a     N - e - w     D - a - t - a     N - e - w     D - a - t - a' );
      console.log( "------------------------------------------------------------------------------------------------------------" );
      chalkAnimation.rainbow( "App listening on port " + PORT + "!" );
    } );
  } );

//sequelize associations
db
  .ServiceProvider
  .hasMany( db.Transaction );
db
  .Transaction
  .belongsTo( db.ServiceProvider );

// db.Donation.belongsTo( db.User, { as: 'donated_by' } );