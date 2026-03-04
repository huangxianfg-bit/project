$(function () {
    var chartDom = document.getElementById('actors_total_films');
    var myChart = echarts.init(chartDom);
    var option;

    $.getJSON("/actor_year_total_films",function(value) {

        let datax1 = []
        let datay1 = []
        let datax2 = []
        let datay2 = []
        let datax3 = []
        let datay3 = []
        let datax4 = []
        let datay4 = []

        //2020
        for (let i = 0; i < 20; i++) {
            // let json = {}
            datay1[datay1.length] = value[i][1]
            datax1[datax1.length] = value[i][0]
        }
        // 2021
        for (let i = 20; i < 40; i++) {
            // let json = {}
            datay2[datay2.length] = value[i][1]
            datax2[datax2.length] = value[i][0]
        }
        //2022
        for (let i = 40; i < 60; i++) {
            // let json = {}
            datay3[datay3.length] = value[i][1]
            datax3[datax3.length] = value[i][0]
        }

        for (let i = 60; i < 80; i++) {
            // let json = {}
            datay4[datay4.length] = value[i][1]
            datax4[datax4.length] = value[i][0]
        }

        datax1 = datax1.reverse()
        datay1 = datay1.reverse()

        datax2 = datax2.reverse()
        datay2 = datay2.reverse()

        datax3 = datax3.reverse()
        datay3 = datay3.reverse()

        datax4 = datax4.reverse()
        datay4 = datay4.reverse()


        option = {
            title: {
                text: '演员出演电影总数'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {},
            grid: {
                left: '10%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                size:16
            },
            yAxis: {
                type: 'category',
                data: datay4,
            },
            series: [
                // {
                //     name: '2020',
                //     type: 'bar',
                //     data: datax1,
                //
                // },
                // {
                //     name: '2021',
                //     type: 'bar',
                //     data: datax2
                // },
                // {
                //     name: '2022',
                //     type: 'bar',
                //     data: datax3
                // },
                {
                    name: '1980-2022',
                    type: 'bar',
                    data: datax4
                },
            ]
        };

        option && myChart.setOption(option);
    })

})