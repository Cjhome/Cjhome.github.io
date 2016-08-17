$(function () {
    $('button').click(function(){
        ajaxPlise()
    })
function ajaxPlise(){
     $.ajax({
       type:'get',
       url:'http://apis.baidu.com/apistore/weatherservice/recentweathers',
       dataType:'json',
       headers:{
           'apikey':'fa13c2cc783ee346e2e08c414d2d99d6'
       },
       error:function(err){
           console.log(err)
       },
       data:{
           'cityname':$('#cityname').val()
       },
       success:function(data){
           if(data.retData.length== 0){
                 alert(data.errMsg+'\n请输入正确的城市信息')
           }else{
                console.log(data)
           var retdata = []
           retdata =data.retData.forecast
           console.log(retdata)
           retdata.unshift(data.retData.today)
           console.log(retdata)
           retdata = data.retData.history.concat(retdata)
           console.log(retdata)
            var city = data.retData.city
            var dataHighTemp = []
            var dataLowTemp = []
            var dataDay = []

            retdata.forEach(function(item,index,array){
              
                var hightemp = Number(item.hightemp.replace("℃",""))
                var lowtemp = Number(item.lowtemp.replace("℃",""))
                dataHighTemp.push(hightemp)
                dataLowTemp.push(lowtemp)
                dataDay.push(item.date)
               
            })
             console.log(dataDay)
              highcharts(dataDay,dataHighTemp,dataLowTemp,city)
           }
          
       }
   })
}   
 ajaxPlise()
   function highcharts(dataDay,dataHighTemp,dataLowTemp,city){
       $('#container').highcharts({
        chart: {
            type: 'spline'
        },
        title: {
            text: city+'市八月份温度趋势图'
        },
       xAxis: {
            categories: dataDay
        },
       
        yAxis: {
            title: {
                text: '温度范围'
            },
            labels: {
                formatter: function () {
                    return this.value + '°';
                }
            }
        },
        tooltip: {
            crosshairs: true,
            shared: true
        },
        credits:{
            text: '逗逼者联盟'
        },
        plotOptions: {
            spline: {
                marker: {
                    radius: 4,
                    lineColor: '#666666',
                    lineWidth: 1
                }
            }
        },
        series: [{
            name: ' 最高温度',
            marker: {
                symbol: 'square'
            },
            data: dataHighTemp

        }, {
            name: '最低温度',
            marker: {
                symbol: 'diamond'
            },
            data: dataLowTemp
        }]
    });
   }
   var ddd = 1>=0?'是':'否'
   console.log(ddd)
});