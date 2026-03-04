$(function () {
    var chartDom = document.getElementById('directorAvg');
    var myChart = echarts.init(chartDom);
    var option;

    $.getJSON("/directorAvg",function (value) {

        let Topdata = value.slice(1,10)
        let Bottomdata = value.slice(-10)

        option = {
            xAxis: {
                data: ['Top10', 'Bottom10']
            },
            yAxis: {},
            dataGroupId: '',
            animationDurationUpdate: 500,
            series: {
                type: 'bar',
                id: 'sales',
                data: [
                    {
                        value: 5,
                        groupId: 'Top10'
                    },
                    {
                        value: 2,
                        groupId: 'Bottom10'
                    }
                ],
                universalTransition: {
                    enabled: true,
                    divideShape: 'clone'
                }
            }
        };
        const drilldownData = [
            {
                dataGroupId: 'Top10',
                data: Topdata
            },
            {
                dataGroupId: 'Bottom10',
                data: Bottomdata
            },

        ];
        myChart.on('click', function (event) {
            if (event.data) {
                var subData = drilldownData.find(function (data) {
                    return data.dataGroupId === event.data.groupId;
                });
                if (!subData) {
                    return;
                }
                myChart.setOption({
                    xAxis: {
                        data: subData.data.map(function (item) {
                            return item[0];
                        })
                    },
                    series: {
                        type: 'bar',
                        id: 'sales',
                        dataGroupId: subData.dataGroupId,
                        data: subData.data.map(function (item) {
                            return item[1];
                        }),
                        universalTransition: {
                            enabled: true,
                            divideShape: 'clone'
                        }
                    },
                    graphic: [
                        {
                            type: 'text',
                            left: 50,
                            top: 20,
                            style: {
                                text: 'Back',
                                fontSize: 18
                            },
                            onclick: function () {
                                myChart.setOption(option);
                            }
                        }
                    ]
                });
            }
        });

        option && myChart.setOption(option);
    })
})
//directorAvg