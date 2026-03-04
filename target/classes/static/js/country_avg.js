$(function () {
  var chartDom = document.getElementById('country_avg');
  var myChart = echarts.init(chartDom);
  var option;
  $.getJSON("/country_avg_vote",function (value) {
    let namedata = []
    let data = []

    value.forEach(item=>{
      namedata[namedata.length] = item.country
      data[data.length] = item.AVG
    })
    data[0] = {
      value: data[0],
      itemStyle: {
        color: '#a90000'
      }
    }

    option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: namedata,
          axisTick: {
            alignWithLabel: true
          },
          // axisTick: {
          //   alignWithLabel: true, // 刻度与标签对齐
          //   interval: -3 // 刻度之间的间隔，默认为 0，表示刻度不重叠
          // },
          // axisLabel: {
          //   fontSize: 10 // 设置刻度的字体大小
          // }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: data
        }
      ]
    };

    option && myChart.setOption(option);

  })


})