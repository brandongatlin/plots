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

    // switch (expression) {
    //   case expression:
    //
    //     break;
    //   default:
    //
    // }

    switch ( status ) {
      case "Posted":
        db
          .Transaction
          .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Posted: now } )
          .then( function ( newTransaction ) {
            // console.log( 'new transation is', newTransaction );
          } );
        break;

      case "Failed":
        db
          .Transaction
          .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Failed: now } )
          .then( function ( newTransaction ) {
            // console.log( 'new transation is', newTransaction );
          } );
        break;

      case "Queue":
        db
          .Transaction
          .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Queue: now } )
          .then( function ( newTransaction ) {
            // console.log( 'new transation is', newTransaction );
          } );
        break;

      default:
        alert( "oops!" );

    } //end of switch

  } ); //end app.post /post

  // if ( status == "Posted" ) {
  //   db
  //     .Transaction
  //     .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Posted: now } )
  //     .then( function ( newTransaction ) {
  //        console.log( 'new transation is', newTransaction );
  //     } )
  // }
  //
  // if ( status == "Failed" ) {
  //   db
  //     .Transaction
  //     .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Failed: now } )
  //     .then( function ( newTransaction ) {
  //        console.log( 'new transation is', newTransaction );
  //     } )
  // }
  //
  // if ( status == "Queue" ) {
  //   db
  //     .Transaction
  //     .create( { ServiceProviderId: req.body.ServiceProviderId, Amount: req.body.amount, Queue: now } )
  //     .then( function ( newTransaction ) {
  //        console.log( 'new transation is', newTransaction );
  //     } ) }

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

    // let today = moment()
    //   .utc()
    //   .format();
    // let lastWeek = moment()
    //   .utc()
    //   .subtract( 7, 'days' )
    //   .format();

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

    //get today's stuff: can i pass 4 things to between? get 1 hour each time, but each time increment by 1 hr, then keep old data and add on to it. Not sure that would work. After refresh, the old hours would go away?

    //findAll between starttime and now!! that would be accurate even on refresh and is simple.

    //start testing

    let todayStartOfDay = todayYear + '-' + thisMonth + '-' + todayDate + startHour;

    db
      .Transaction
      .findAll( {
        where: {
          Posted: {
            [ Op.between ]: [ todayStartOfDay, moment()
                .utc()
                .format() ]
          }
        }
      } )
      .then( function ( totalTodayData ) {
        console.log( "today's up to the hour info", totalTodayData );
        res.json( totalTodayData )

      } )

    //end testing - this works, but I must find a way to combine both db querries. what i need is, posted between blah and blah, or blah and blah. maybe use a raw sql querry?
    // db
    //   .Transaction
    //   .findAll( {
    //     where: {
    //       Posted: {
    //         [ Op.between ]: [ lastWeekStartOfDay, lastWeekEndOfDay ]
    //       },
    //        Posted: {
    //          [ Op.between ]: [
    //            moment()
    //              .utc()
    //              .format(),
    //            moment()
    //              .utc()
    //              .subtract( 1, 'days' )
    //              .format()
    //          ]
    //        }
    //     } end where statement
    //   } )
    //   .then( function ( totalDollarsData ) {
    //      console.log( 'total dollars data', totalDollarsData );
    //     res.json( totalDollarsData )
    //   } )
  } )

} //end module.exports