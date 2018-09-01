// var plotly = require( 'plotly' )( 'brandongatlin', '••••••••••' );
// Requiring path to so we can use relative routes to our HTML files
var path = require( "path" );
var moment = require( 'moment' );
var db = require( "../models" );
var express = require( 'express' );
const router = express.Router();

const Sequelize = require( "sequelize" )
const Op = Sequelize.Op

module.exports = function ( app ) {

  app.get( "/", function ( req, res ) {
    db
      .ServiceProvider
      .findAll()
      .then( function ( sps ) {
        let hbsObj = {
          sps: sps
        }
        // console.log( sps );
        res.render( "./layouts/main", hbsObj );
      } )
  } );

  app.post( "/new", function ( req, res ) {
    // console.log( req.body );

    db
      .ServiceProvider
      .create( req.body )
      .then( function () {
        res.redirect( "/" )

      } )
  } )

  app.post( "/post", function ( req, res ) {
    // console.log( req.body );

    let now = new Date();
    let status = req.body.status;

    // db.Transaction.create({
    //   ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, status: status
    // })

    if ( status == "Posted" ) {
      db
        .Transaction
        .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Posted: now } )
        .then( function ( newTransaction ) {
          // console.log( 'new transation is', newTransaction );
        } )
    }

    if ( status == "Failed" ) {
      db
        .Transaction
        .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Failed: now } )
        .then( function ( newTransaction ) {
          // console.log( 'new transation is', newTransaction );
        } )
    }

    if ( status == "Queue" ) {
      db
        .Transaction
        .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Queue: now } )
        .then( function ( newTransaction ) {
          // console.log( 'new transation is', newTransaction );
        } )
    }

  } ); //end app.post /post

  //Plots
  //pie charts
  app.get( "/sfq", function ( req, res ) {
    db
      .Transaction
      .findAll()
      .then( function ( rates ) {
        // console.log( 'rates', rates );
        res.json( rates );
      } )
  } );

  app.get( "/totaldollars", function ( req, res ) {

    let today = moment()
      .utc()
      .format();
    let lastWeek = moment()
      .utc()
      .subtract( 7, 'days' )
      .format();

    let todayYear = moment().year();
    let lastWeekYear = moment()
      .subtract( 7, 'days' )
      .format( "YYYY" );

    let thisMonth = moment().format( "MM" );
    let lastWeekMonth = moment()
      .subtract( 7, 'days' )
      .format( "MM" );

    let todayDate = moment().format( "DD" );
    let lastWeekDate = moment()
      .subtract( 7, 'days' )
      .format( "DD" );

    let startHour = 'T13:00:00Z';
    let endHour = 'T22:00:00Z';

    if ( moment().isDST() ) {
      startHour = 'T12:00:00Z';
      endHour = 'T22:00:00Z';
    };

    let lastWeekStartOfDay = lastWeekYear + '-' + lastWeekMonth + '-' + lastWeekDate + startHour; //8am CST
    let lastWeekEndOfDay = lastWeekYear + '-' + lastWeekMonth + '-' + lastWeekDate + endHour; //5pm CST

    console.log( lastWeekStartOfDay );
    console.log( lastWeekEndOfDay );

    db
      .Transaction
      .findAll( {
        where: {
          Posted: {
            [ Op.between ]: [ lastWeekStartOfDay, lastWeekEndOfDay ]
          },
          // Posted: {
          //   [ Op.between ]: [
          //     moment()
          //       .utc()
          //       .format(),
          //     moment()
          //       .utc()
          //       .subtract( 1, 'days' )
          //       .format()
          //   ]
          // }
        } //end where statement
      } )
      .then( function ( totalDollarsData ) {
        // console.log( 'total dollars data', totalDollarsData );
        res.json( totalDollarsData )
      } )
  } )

} //end module.exports