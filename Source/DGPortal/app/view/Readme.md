This folder contains the views
// render: function () {
        //     Highcharts.setOptions({
        //         colors: ['#0071cd', '#efefef'],
        //     });
        //     this.chart = new Highcharts.Chart(
        //         {
        //             chart: {
        //                 type: 'solidgauge',
        //                 plotBackgroundColor: 'red',
        //                 plotBorderWidth: 0,
        //                 marginBottom: 0,
        //                 marginTop: -20,
        //                 spacing: [0, 0, 0, 0],
        //                 plotShadow: false,
        //                 renderTo: this.getId()
        //             },

        //             tooltip: { enabled: false },

        //             exporting: {
        //                 enabled: false
        //             },

        //             label: {
        //                 items: {
        //                     html: "6 Sources",
        //                     style: {
        //                         left: '50px',
        //                         top: '50px',
        //                         color: "#3E576F"
        //                     }
        //                 }
        //             },

        //             title: {
        //                 text: '6 SOURCES',
        //                 margin: 0,
        //                 verticalAlign: 'bottom',
        //                 floating: false,
        //                 y: -2
        //             },

        //             subtitle: {
        //                 text: '6 ',
        //                 x: 0,
        //                 y: 100,
        //                 style: {
        //                     color: '#0071cd',
        //                     fontWeight: 'bold',
        //                     fontSize: '40',
        //                     fontFamily: 'helvetica solid 1px'
        //                 }

        //             },

        //             credits: {
        //                 enabled: false
        //             },

        //             pane: {
        //                 size: '76%',
        //                 startAngle: 0,
        //                 endAngle: 360,
        //                 background: [{ // Track for Move
        //                     outerRadius: '105%',
        //                     innerRadius: '94%',
        //                     backgroundColor: '#d2d2d2',//Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
        //                     borderWidth: 0
        //                 }]
        //             },

        //             yAxis: {
        //                 min: 0,
        //                 max: 100,
        //                 lineWidth: 0,
        //                 tickPositions: []
        //             },

        //             plotOptions: {
        //                 solidgauge: {
        //                     borderWidth: '6px',
        //                     dataLabels: {
        //                         enabled: false,
        //                         borderWidth: 0,
        //                         y: -16,
        //                         style: {
        //                             fontWeight: 'bold',
        //                             color: 'blue',
        //                             fontSize: "18px"
        //                         },
        //                         format: '{y} %'
        //                     },
        //                     linecap: 'square',
        //                     stickyTracking: false
        //                 }
        //             },

        //             series: [{
        //                 name: 'Move',
        //                 borderColor: '#0071cd',//Highcharts.getOptions().colors[0],
        //                 data: [{
        //                     color: '#0071cd',//Highcharts.getOptions().colors[0],
        //                     radius: '100%',
        //                     innerRadius: '100%',
        //                     y: this.yVal
        //                 }],
        //                 dataLabels: {
        //                     enabled: true,
        //                     format: " {y} a ",
        //                     verticalAlign: "top",
        //                     y: 35
        //                 }
        //             }]
        //         }
        //         // ,
        //         // function callback() {
        //         //     this.renderer.path(['M 0 4 h 4 V 0 H 0 V 4 Z M 6 4 h 4 V 0 H 6 V 4 Z M 12 4 h 4 V 0 h -4 V 4 Z M 18 0 v 4 h 4 V 0 H 18 Z M 0 10 h 4 V 6 H 0 V 10 Z M 6 10 h 4 V 6 H 6 V 10 Z M 12 10 h 4 V 6 h -4 V 10 Z M 18 10 h 4 V 6 h -4 V 10 Z M 0 16 h 4 v -4 H 0 V 16 Z M 6 16 h 4 v -4 H 6 V 16 Z M 12 16 h 4 v -4 h -4 V 16 Z M 18 16 h 4 v -4 h -4 V 16 Z M 0 22 h 4 v -4 H 0 V 22 Z M 6 22 h 4 v -4 H 6 V 22 Z M 12 22 h 4 v -4 h -4 V 22 Z M 18 22 h 4 v -4 h -4 V 22 Z'])
        //         //         .attr({
        //         //             'fill': '#d1d1d1',

        //         //             'stroke-width': 1,
        //         //             'zIndex': 10
        //         //         })
        //         //         .translate(63, 20)
        //         //         .add(this.series[0].group);

        //         // }
        //     );
        // },