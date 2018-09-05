$( "#submit-new-sp" ).on( "click", function ( event ) {

  let name = $( "#new-name" )
    .val()
    .trim();

  let newSp = {
    Name: name
  }

  $
    .ajax( "/new", {
      type: "POST",
      data: newSp
    } )
    .then( function () {

      // Reload the page to get the updated list
      location.reload();
    } );
  $( "#new-name" ).val( '' );
} )

$( document ).on( "click", "#submit", function ( event ) {
  event.preventDefault();

  let spId = $( "#sp" ).val();
  let Amount = $( "#amount" )
    .val()
    .trim();
  let Status = $( "#status" ).val();

  var newTransaction = {
    status: Status,
    amount: Amount,
    ServiceProviderId: spId
  }

  $( "#sp" ).val( '' );
  $( "#amount" ).val( '' );

  $.post( "/post", newTransaction, function ( req, res ) {
    //
  } )
} )

//Plots

//Pie Chart for Success, Fail, Queue
//get route here
$( "#sfq-pie" ).on( "click", function ( e ) {
  e.preventDefault();

  $.get( "/sfq", function ( data ) {
    console.log( 'data is:', data );

    let successes = [];
    let failures = [];
    let queued = [];

    for ( var i = 0; i < data.length; i++ ) {
      if ( data[ i ].Posted ) {
        successes.push( data[ i ].Amount );
      }

      if ( data[ i ].Failed ) {
        failures.push( data[ i ].Amount );
      }

      if ( data[ i ].Queue ) {
        queued.push( data[ i ].Amount );
      }
    }

    let total = successes.length + failures.length + queued.length;

    let successAvg = successes.length / total;
    let failAvg = failures.length / total;
    let queuedAvg = queued.length / total;

    var pieData = [
      {
        marker: {
          colors: [ '#6fff33', '#ff3347', '#fbff33' ]
        },
        values: [
          successAvg, failAvg, queuedAvg
          /// s f q
        ],
        labels: [
          'Success', 'Fail', 'Queue'
        ],
        type: 'pie'
      }
    ];

    var layout = {
      title: 'Rates by # Transactions',
      height: 400,
      width: 500,
      hovermode: false
    };

    Plotly.newPlot( 'chart', pieData, layout );
  } )

} );

$( "#chart-button-2" ).on( "click", function ( e ) {
  e.preventDefault();

  $.get( "/sfq", function ( data ) {
    console.log( 'data is:', data );

    let successes = [];
    let failures = [];
    let queued = [];

    for ( var i = 0; i < data.length; i++ ) {
      if ( data[ i ].Posted ) {
        successes.push( data[ i ].Amount );
      }

      if ( data[ i ].Failed ) {
        failures.push( data[ i ].Amount );
      }

      if ( data[ i ].Queue ) {
        queued.push( data[ i ].Amount );
      }
    }

    let successTotalDollars = successes.reduce( ( a, b ) => a + b, 0 );
    let failTotalDollars = failures.reduce( ( a, b ) => a + b, 0 );
    let queueTotalDollars = queued.reduce( ( a, b ) => a + b, 0 );

    let totalDollars = successTotalDollars + failTotalDollars + queueTotalDollars;

    let successAvg = successTotalDollars / totalDollars;
    let failAvg = failTotalDollars / totalDollars;
    let queuedAvg = queueTotalDollars / totalDollars;

    var pieData = [
      {
        marker: {
          colors: [ '#6fff33', '#ff3347', '#fbff33' ]
        },
        values: [
          successAvg, failAvg, queuedAvg
          /// s f q
        ],
        labels: [
          'Success', 'Fail', 'Queue'
        ],
        type: 'pie'
      }
    ];

    var layout = {
      title: 'Rates by $',
      height: 400,
      width: 500,
      hovermode: false

    };

    Plotly.newPlot( 'chart', pieData, layout );
  } )

} );

//ticker for total processed?
//total funds processed today vs same day last week
$( "#chart-button-3" ).on( "click", function ( event ) {
  event.preventDefault();

  $.get( "/totaldollars", function ( data ) {
    console.log( 'total dollars data', data );

    let eightBucket = [];
    let nineBucket = [];
    let tenBucket = [];
    let elevenBucket = [];
    let noonBucket = [];
    let oneBucket = [];
    let twoBucket = [];
    let threeBucket = [];
    let fourBucket = [];
    let fiveBucket = [];

    for ( var i = 0; i < data.length; i++ ) {
      let arrayTimes = data[ i ]
        .Posted
        .split( '' );

      for ( var j = 0; j < arrayTimes[ i ].length; j++ ) {

        if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 2 ) ) {
          eightBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 3 ) ) {
          nineBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 4 ) ) {
          tenBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 5 ) ) {
          elevenBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 6 ) ) {
          noonBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 7 ) ) {
          oneBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 8 ) ) {
          twoBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 1 ) && ( arrayTimes[ 12 ] == 9 ) ) {
          threeBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 2 ) && ( arrayTimes[ 12 ] == 0 ) ) {
          fourBucket.push( data[ i ].Amount );
        } else if ( ( arrayTimes[ 11 ] == 2 ) && ( arrayTimes[ 12 ] == 1 ) ) {
          fiveBucket.push( data[ i ].Amount );
        }

      } // end j loop
    } // end i loop

    let bucketsConcat = eightBucket.concat( nineBucket, tenBucket, elevenBucket, noonBucket, oneBucket, twoBucket, threeBucket, fourBucket, fiveBucket );

    console.log( bucketsConcat );

    let bucketsSum = bucketsConcat.reduce( ( a, b ) => a + b, 0 );

    let lastWeekAvg = bucketsSum / bucketsConcat.length;
    console.log( lastWeekAvg );

    let eightSum = eightBucket.reduce( ( a, b ) => a + b, 0 );
    let nineSum = nineBucket.reduce( ( a, b ) => a + b, 0 );
    let tenSum = tenBucket.reduce( ( a, b ) => a + b, 0 );
    let elevenSum = elevenBucket.reduce( ( a, b ) => a + b, 0 );
    let noonSum = noonBucket.reduce( ( a, b ) => a + b, 0 );
    let oneSum = oneBucket.reduce( ( a, b ) => a + b, 0 );
    let twoSum = twoBucket.reduce( ( a, b ) => a + b, 0 );
    let threeSum = threeBucket.reduce( ( a, b ) => a + b, 0 );
    let fourSum = fourBucket.reduce( ( a, b ) => a + b, 0 );
    let fiveSum = fiveBucket.reduce( ( a, b ) => a + b, 0 );

    var xData = [
      [
        '8am',
        '9am',
        '10am',
        '11am',
        'NOON',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm'
      ],
      [
        '8am',
        '9am',
        '10am',
        '11am',
        'NOON',
        '1pm',
        '2pm',
        '3pm',
        '4pm',
        '5pm'
      ]
    ];

    var yData = [
      [
        10,
        15,
        25,
        40,
        30,
        90,
        50,
        20,
        45,
        35
      ],

      //last week data points
      [
        eightSum, //8am
        nineSum,
        tenSum,
        elevenSum,
        noonSum, //NOON
        oneSum,
        twoSum,
        threeSum,
        fourSum,
        fiveSum, //5pm
        // lastWeekAvg
      ]
    ];

    var colors = [ 'red', 'blue' ]; //red = today, blue = same day last week

    var lineSize = [ 4, 2 ]; //today vs. last week

    var labels = [ 'Today', 'Last Week' ];

    var data = [];

    for ( var i = 0; i < xData.length; i++ ) {
      var traceData = {
        x: xData[i],
        y: yData[i],
        type: 'scatter',
        mode: 'lines',
        line: {
          color: colors[i],
          width: lineSize[ i ]
        },
        name: labels[ i ]
      };

      data.push( traceData );
    }

    var layout = {
      showlegend: true,
      legend: {
        font: {
          size: 25,
          color: labels[ i ]
        }
      },
      height: 500,
      width: 1200,
      xaxis: {
        showline: true,
        showgrid: false,
        showticklabels: true,
        linecolor: 'rgb(204,204,204)',
        linewidth: 2,
        autotick: false,
        ticks: 'outside',
        tickcolor: 'rgb(204,204,204)',
        tickwidth: 2,
        ticklen: 5,
        tickfont: {
          family: 'Arial',
          size: 12,
          color: 'rgb(82, 82, 82)'
        }
      },
      yaxis: {
        showgrid: true,
        zeroline: false,
        showline: false,
        showticklabels: true
      },
      autosize: false,
      margin: {
        autoexpand: false,
        l: 100,
        r: 20,
        t: 100
      },
      annotations: [
        {
          xref: 'paper',
          yref: 'paper',
          x: 0.10, //position of title
          y: 1.05,
          xanchor: 'left',
          yanchor: 'bottom',
          text: '$ Processed per Hour',
          font: {
            family: 'Arial',
            size: 30,
            color: 'rgb(37,37,37)' //color of title
          },
          showarrow: false
        }, {
          xref: 'paper',
          yref: 'paper',
          x: 0.5, //position of subtext below graph
          y: -0.1,
          xanchor: 'center',
          yanchor: 'top',
          text: 'Total Dollars Processed per Hour Today vs. Same Day Last Week',
          showarrow: false,
          font: {
            family: 'Arial',
            size: 12,
            color: 'rgb(150,150,150)'
          }
        }
      ]
    };

    Plotly.newPlot( 'chart', data, layout );
  } );
} );
