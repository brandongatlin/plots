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
          colors: [ '#6fff33', '#ff3347', 'yellow' ]
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
      width: 500
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
          colors: [ '#6fff33', '#ff3347', 'yellow' ]
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
      width: 500
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
        74,
        82,
        80,
        74,
        73,
        72,
        74,
        70,
        70,
        66,
        66,
        70
      ],
      [
        45,
        42,
        50,
        46,
        36,
        36,
        34,
        35,
        32,
        31,
        31,
        28
      ]
    ];

    var colors = [ 'red', 'blue' ]; //red = today, blue = same day last week

    var lineSize = [ 4, 2 ]; //today vs. last week

    var labels = [ 'Today', 'Last Week' ];

    var data = [];

    for ( var i = 0; i < xData.length; i++ ) {
      var todayTrace = {
        x: xData[i],
        y: yData[i],
        type: 'scatter',
        mode: 'lines',
        line: {
          color: colors[i],
          width: lineSize[ i ]
        }
      };
      var lastWeekTrace = {
        x: [
          xData[ i ][0], xData[ i ][ 11 ]
        ],
        y: [
          yData[ i ][0], yData[ i ][ 11 ]
        ],
        type: 'scatter',
        mode: 'markers',
        marker: {
          color: colors[i],
          size: 12
        }
      };
      data.push( todayTrace, lastWeekTrace );
    }

    var layout = {
      showlegend: false,
      height: 500,
      width: 900,
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
          x: 0.0,
          y: 1.05,
          xanchor: 'left',
          yanchor: 'bottom',
          text: '$ Processed',
          font: {
            family: 'Arial',
            size: 30,
            color: 'rgb(37,37,37)'
          },
          showarrow: false
        }, {
          xref: 'paper',
          yref: 'paper',
          x: 0.5,
          y: -0.1,
          xanchor: 'center',
          yanchor: 'top',
          text: 'Total Dollars Processed Today vs. Same Day Last Week',
          showarrow: false,
          font: {
            family: 'Arial',
            size: 12,
            color: 'rgb(150,150,150)'
          }
        }
      ]
    };

    for ( var i = 0; i < xData.length; i++ ) {
      var todayTrace = {
        xref: 'paper',
        x: 0.05,
        y: yData[ i ][0],
        xanchor: 'right',
        yanchor: 'middle',
        text: labels[ i ] + ' ' + '$' + yData[ i ][0],
        showarrow: false,
        font: {
          family: 'Arial',
          size: 16,
          color: 'black'
        }
      };
      var lastWeekTrace = {
        xref: 'paper',
        x: 0.95,
        y: yData[ i ][11],
        xanchor: 'left',
        yanchor: 'middle',
        text: '$' + yData[ i ][11],
        font: {
          family: 'Arial',
          size: 16,
          color: 'black'
        },
        showarrow: false
      };

      layout
        .annotations
        .push( todayTrace, lastWeekTrace );
    }

    Plotly.newPlot( 'chart', data, layout );
  } )
} )
