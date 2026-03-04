$(function () {
  var chartDom = document.getElementById('duration_avg_vote');
  var myChart = echarts.init(chartDom);

  $.getJSON("/duration_avg_vote",function(value) {
  var option;
    var xdata=[]
    var ydata=[]
    for(var i=0;i<value.length;i++){
      xdata.push(value[i].duration_group)
      ydata.push(value[i].average_rating)
    }
  option = {
    xAxis: {
      type: 'category',
      data: xdata
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: ydata,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  option && myChart.setOption(option);
  })
})