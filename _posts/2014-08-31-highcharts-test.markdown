---
layout: post
title: "highcharts-test"
date: 2014-08-31 12:22
comments: true
categories: Data
published: false
---

<div id="container" style="width:100%; height:600px;"></div>
<div id="pie-container" style="width:100%; height:600px;"></div>

<div><script src="http://code.highcharts.com/highcharts.js"></script>
<script src="http://code.highcharts.com/modules/exporting.js"></script>

<script>





$(function () { 


Highcharts.setOptions({
        chart: {
            style: {
                fontFamily: '"Source Sans Pro", sans-serif',
				fontWeight: '600'

            }
        }
    });

    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: '# of Check-ins on Yelp by Day'
        },
        xAxis: {
            categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        },
        yAxis: [{
            title: {
                text: 'Avg Rating Given'
            },
opposite: true
        },
		{
            title: {
                text: 'Total # of Checkins'
            },

		
        },
		],
        series: [{
            name: 'Total Checkins',
			type: 'column',
			yAxis: 1,

            data: [
		555038,
		545626,
		555747,
		596296,
		788073,
		937201,
		735830
	]
        },
		{
            name: 'Average Review',
			type: 'spline',
            data: [
		3.6783,
		3.6925,
		3.6963,
		3.6868,
		3.6877,
		3.7039,
		3.6885
	]
        }]
    });



        $('#pie-container').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Browser market shares at a specific website, 2014'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                name: 'Browser share',
                data: [
                    ['Firefox',   45.0],
                    ['IE',       26.8],
                    {
                        name: 'Chrome',
                        y: 12.8,
                        sliced: true,
                        selected: true
                    },
                    ['Safari',    8.5],
                    ['Opera',     6.2],
                    ['Others',   0.7]
                ]
            }]
        });



});
</script>
</div>
