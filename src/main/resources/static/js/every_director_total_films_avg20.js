$(function () {
    var chartDom = document.getElementById('everyDirectorTotalFilms');
    var myChart = echarts.init(chartDom);

    $.getJSON("/everyDirectorTotalFilms",function(value) {
        let res = []
        res[0] = ['AVG', 'director', 'amount']

        value.reverse()
        // console.log(value)
        value.forEach(item=>{
            res[res.length] = [item.AVG,item.director,item.total_films]
        })
        // for(var i=0;i<value.length;i++){
        //     res[res.length] = [value.AVG,value.director,value.total_films]
        // }
        console.log(res)

        option = {
            dataset: {
                source:res
            },
            grid: { containLabel: true },
            xAxis: { name: 'amount' },
            yAxis: { type: 'category' },
            visualMap: {
                orient: 'horizontal',
                left: 'center',
                min: 5,
                max: 8,
                text: ['High Score', 'Low Score'],
                // Map the score column to color
                dimension: 0,
                inRange: {
                    color: ['#e392b7', '#c44e4e', '#d91209', ]
                }
            },
            series: [
                {
                    type: 'bar',
                    encode: {
                        // Map the "amount" column to X axis.
                        x: 'amount',
                        // Map the "product" column to Y axis
                        y: 'director'
                    }
                }
            ]
        };

        option && myChart.setOption(option);

    })
})