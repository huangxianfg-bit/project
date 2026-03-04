$(function (){
    var chartDom = document.getElementById('year_country_sort_total_films');
    var myChart = echarts.init(chartDom);
    var option;

// 更新频率
    const updateFrequency = 2000;
    const dimension = 0;
    const countryColors = {
        Australia: '#00008b',
        Canada: '#f00',
        China: '#ffde00',
        Cuba: '#002a8f',
        Finland: '#003580',
        France: '#ed2939',
        Germany: '#000',
        Iceland: '#003897',
        India: '#f93',
        Japan: '#bc002d',
        'North Korea': '#024fa2',
        'South Korea': '#000',
        'New Zealand': '#00247d',
        Norway: '#ef2b2d',
        Poland: '#dc143c',
        Russia: '#d52b1e',
        Turkey: '#e30a17',
        'United Kingdom': '#00247d',
        'United States': '#b22234',
        Italy:'#346536'

    };
    $.when(
        // 获取本地数据
        $.getJSON('../json/year_country_sort_total_films_data.json'),
        $.getJSON("/yearCountrySortFilmsCount")
    ).done(function (res0,res1) {

        const data = res1[0]

        const flags = res0[0];

        let data1 = ['Income', 'Life Expectancy', 'Population', 'Country', 'Year']
        data.unshift(data1)


        // var data = data3
        // console.log(data);
        const years = [];

        // 填装年份
        for (let i = 0; i < data.length; ++i) {
            if (years.length === 0 || years[years.length - 1] !== data[i][4]) {
                years.push(data[i][4]);
            }
        }

        // data.forEach(element => {
        //     if(element[3] === "null") {
        //         element[3] = "aaa"
        //     }
        // });
        //
        function getFlag(countryName) {
            if (!countryName) {
                return '';
            }
            return (
                flags.find(function (item) {
                    return item.name === countryName;
                }) || {}
                // 简写
            ).emoji || countryName.slice(0,2);
        }
        // 开始时间
        let startIndex = 71;
        let startYear = years[startIndex];//1980

        option = {
            title: {
                text: '1980-2022年地区电影数量动态排名', // 标题文本
                textStyle: {
                    fontSize: 18, // 标题字号
                    fontWeight: 'bold' // 标题字体粗细
                },
                left: 'center', // 设置标题水平居中
                top: 10 // 设置标题在顶部
            },
            grid: {
                top: 60,
                bottom: 30,
                left: 150,
                right: 80
            },

            xAxis: {
                type:'value',
                show:true,
                max: 'dataMax',
                // max:10,
                axisLabel: {
                    formatter: function (n) {
                        return Math.round(n) + '';
                    }
                }
            },
            dataset: {
                // 数据开始截取第一个元素后面的数据
                source: data.slice(1).filter(function (d) {
                    return d[4] === startYear;
                })
            },

            yAxis: {
                type: 'category',
                inverse: true,
                max: 10,
                axisLabel: {
                    show: true,
                    fontSize: 14,
                    formatter: function (value) {
                        return value + '{flag|' + getFlag(value) + '}';
                    },
                    rich: {
                        flag: {
                            fontSize: 25,
                            padding: 5
                        }
                    }
                },
                animationDuration: 0,
                animationDurationUpdate: 300
            },
            series: [
                {
                    realtimeSort: true,
                    seriesLayoutBy: 'column',
                    type: 'bar',
                    itemStyle: {
                        color: function (param) {
                            return countryColors[param.value[3]] || '#5470c6';
                        }
                    },
                    encode: {
                        x: 0,
                        y: 3
                    },
                    label: {
                        show: true,
                        precision: 0,
                        position: 'right',
                        valueAnimation: true,
                        fontFamily: 'monospace'
                    }
                }
            ],
            // Disable init animation.
            animationDuration: 0,
            animationDurationUpdate: updateFrequency,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            graphic: {
                elements: [
                    {
                        type: 'text',
                        right: 160,
                        bottom: 60,
                        style: {
                            text: startYear,
                            font: 'bolder 80px monospace',
                            fill: 'rgba(100, 100, 100, 0.25)'
                        },
                        z: 100
                    }
                ]
            }
        };
        // console.log(option);
        myChart.setOption(option);
        // 每隔一段时间修改数据原
        for (let i = startIndex; i < years.length - 2; ++i) {
            (function (i) {
                setTimeout(function () {
                    updateYear(years[i + 1]);
                }, (i - startIndex) * updateFrequency);
            })(i);
        }
        function updateYear(year) {
            let source = data.slice(1).filter(function (d) {
                return d[4] === year;
            }).sort(function(a, b) {
                // 比较函数根据第一个元素进行排序
                return b[0] - a[0];
            });
            option.series[0].data = source;
            option.graphic.elements[0].style.text = year;
            // console.log(source);
            myChart.setOption(option);
        }
        option && myChart.setOption(option);
    });
})