var chart;

/**
 * Request data from the server, add it to the graph and set a timeout
 * to request again
 */
function requestData() {
    $.ajax({
        url: '/live-data_8',
        success: function(point) {
            var series = chart.series[0];
            chart.series[0].setData(point, true);
            // call it again after three seconds
            setTimeout(requestData, 3000);
        },
        cache: false
    });
}

$(document).ready(function () {
    chart = new Highcharts.Chart({
        chart: {
            type: 'column',
            renderTo: 'data-container',
            events: {
                load: requestData
            }
        },
        title: {
            text: 'Audio Recognition'
        },
        xAxis: {
            categories: ['angry', 'fear', 'happy', 'sad'],
            labels: {
                x: -10
            }
        },
        yAxis: {
            min: 0,
            gridLineWidth: 0,
            minorGridLineWidth: 0,

            title: {
                text: 'Percentage',
                y: 10
            },
            labels: {
                overflow: 'justify'
            }
        },
        series: [{
             data: requestData
         }]
    });
});
