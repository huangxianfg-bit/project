$(function () {
    var chartDom = document.getElementById('every_year_total_films_2');
    var myChart = echarts.init(chartDom);
    var option;
    $.getJSON("/everyYearTotalFilms",function (value) {

        let dataAxis = []
        let data = []
        value.forEach(item=>{
            dataAxis[dataAxis.length] = item.year
            data[data.length] = item.total_films
        })
        dataAxis = dataAxis.reverse().slice(0,-1)
        data = data.reverse().slice(0,-1)
        option = {
            title: {
                text: '每年电影数量统计(折线图)'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                // data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: dataAxis
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '数量',
                    type: 'line',
                    stack: 'Total',
                    data: data
                },
                // {
                //     name: 'Union Ads',
                //     type: 'line',
                //     stack: 'Total',
                //     data: [220, 182, 191, 234, 290, 330, 310]
                // },
                // {
                //     name: 'Video Ads',
                //     type: 'line',
                //     stack: 'Total',
                //     data: [150, 232, 201, 154, 190, 330, 410]
                // },
                // {
                //     name: 'Direct',
                //     type: 'line',
                //     stack: 'Total',
                //     data: [320, 332, 301, 334, 390, 330, 320]
                // },
                // {
                //     name: 'Search Engine',
                //     type: 'line',
                //     stack: 'Total',
                //     data: [820, 932, 901, 934, 1290, 1330, 1320]
                // }
            ]
        };

        option && myChart.setOption(option);

    })
})