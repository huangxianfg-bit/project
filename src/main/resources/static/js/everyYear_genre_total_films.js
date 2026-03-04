$(function () {
    var chartDom = document.getElementById('everyYear_genre_total_films');
    var myChart = echarts.init(chartDom);
    var option;

    $.getJSON("/everyYearGenreTotalFilms",function (value) {
        let genre_name = value[0]
        let time = value[1]
        let data = []
        //
        value = value.slice(2)

        for (let i = 0; i < value.length-1; i++) {
            let json = {type:'line'}
            json.name = genre_name[i]
            json.data = value[i]
            data.push(json)
        }

        // let data2 = [
        //     {
        //         name: 'Email',
        //         type: 'line',
        //         stack: 'Total',
        //         data: [120, 132, 101, 134, 90, 230, 210]
        //     },
        //     {
        //         name: 'Union Ads',
        //         type: 'line',
        //         stack: 'Total',
        //         data: [220, 182, 191, 234, 290, 330, 310]
        //     },
        //     {
        //         name: 'Video Ads',
        //         type: 'line',
        //         stack: 'Total',
        //         data: [150, 232, 201, 154, 190, 330, 410]
        //     },
        //     {
        //         name: 'Direct',
        //         type: 'line',
        //         stack: 'Total',
        //         data: [320, 332, 301, 334, 390, 330, 320]
        //     },
        //     {
        //         name: 'Search Engine',
        //         type: 'line',
        //         stack: 'Total',
        //         data: [820, 932, 901, 934, 1290, 1330, 1320]
        //     }
        // ]
        option = {
            title: {
                text: ''
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: genre_name
            },
            grid: {
                left: '10%',
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
                data: time
            },
            yAxis: {
                type: 'value'
            },
            series:data
        };

        option && myChart.setOption(option);
    })
})
