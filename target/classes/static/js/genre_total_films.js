$(function () {
    var chartDom = document.getElementById('genre_total_films');
    var myChart = echarts.init(chartDom);
    var option;

    $.getJSON("/genre_total_films",function (value) {
        // console.log(value)
        let generName = []
        let genrecount = []
        value.forEach(item=>{
            generName[generName.length] = item.genre
            genrecount[genrecount.length] = item.total_count
        })

        const data = genData(value.length);
        option = {
            title: {
                text: '不同风格数量统计',
                subtext: '',
                left: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: data.legendData
            },
            series: [
                {
                    name: '风格',
                    type: 'pie',
                    radius: '55%',
                    center: ['40%', '50%'],
                    data: data.seriesData,
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        function genData(count) {
            const nameList = generName;
            const legendData = [];
            const seriesData = [];

            //填充数据
            for (var i = 0; i < count; i++) {
                var name = nameList[i]
                legendData.push(name);
                seriesData.push({
                    name: name,
                    value: genrecount[i]
                });
            }
            return {
                legendData: legendData,
                seriesData: seriesData
            };
        }

        option && myChart.setOption(option);
    })

})