<template>
    <div class='nBox'>
        <div class="title"><svg t="1703926514434" class="icon" viewBox="0 0 1062 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="7597" width="16" height="16">
                <path
                    d="M1019.465882 938.043796h-91.130825a42.259405 42.259405 0 0 0 0-5.749579V437.542953a42.834363 42.834363 0 0 0-42.834363-42.834362 42.834363 42.834363 0 0 0-42.834363 42.834362v494.463785a42.259405 42.259405 0 0 0 0 5.749579h-117.578888a42.259405 42.259405 0 0 0 0-5.749579V630.441325a42.834363 42.834363 0 0 0-42.834363-42.834363 42.834363 42.834363 0 0 0-42.834362 42.834363v301.852892a42.259405 42.259405 0 0 0 0 5.749579h-100.042673a42.259405 42.259405 0 0 0 0-5.749579V536.148231a42.834363 42.834363 0 0 0-86.243683 0v395.858507a42.259405 42.259405 0 0 0 0 5.749579H350.789857a42.546884 42.546884 0 0 0 0-6.037058v-169.325098a42.834363 42.834363 0 1 0-86.243683 0v169.325098a42.546884 42.546884 0 0 0 0 6.037058H80.272171V194.623245A42.834363 42.834363 0 0 0 37.437808 151.788883h2.58731A40.534531 40.534531 0 0 0 0.065545 194.623245v829.376755h1019.400337a42.834363 42.834363 0 0 0 42.834363-42.834363 42.834363 42.834363 0 0 0-42.834363-43.121841z"
                    fill="#ffffff" p-id="7598"></path>
                <path
                    d="M316.292384 459.966311l187.436272-187.436272 169.037619 169.03762L961.970093 150.064009v46.859068A42.834363 42.834363 0 0 0 1006.241851 239.75744a42.834363 42.834363 0 0 0 42.834362-42.834363V42.834363A42.834363 42.834363 0 0 0 1006.241851 0h-143.739473a42.834363 42.834363 0 0 0-42.834362 42.834363A42.834363 42.834363 0 0 0 860.490026 86.243683h45.134194l-234.29534 234.29534-169.037619-169.612577-247.80685 247.80685A42.834363 42.834363 0 1 0 316.292384 459.966311z"
                    fill="#ffffff" p-id="7599"></path>
            </svg> 统计</div>
        <div class="echarts" ref="leftEcharts">
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'

onMounted(() => {
    initEcharts()
})
onUnmounted(() => {
})
//数据
let xData = ['11-01 12:00', '11-01 13:00', '11-01 14:00', '11-01 15:00', '11-01 16:00', '11-01 17:00', '11-01 18:00', '11-01 19:00', '11-01 20:00', '11-01 21:00', '11-01 22:00', '11-01 23:00', '11-02 00:00', '11-02 01:00', '11-02 02:00', '11-02 03:00', '11-02 04:00', '11-02 05:00', '11-02 06:00', '11-02 07:00', '11-02 08:00', '11-02 09:00', '11-02 10:00', '11-02 11:00']
let y1Data = [6, 4, 3, 4, 4, 4, 6, 3, 6, 2, 3, 5, 4, 4, 6, 3, 6, 2, 3, 4, 4, 4, 6, 3]
let y2Data = [5, 3, 3, 3, 3, 3, 4, 2, 5, 2, 3, 4, 1, 3, 5, 2, 5, 1, 2, 3, 4, 4, 6, 3]

//echarts
let myChart: any = null
let first = true
let leftEcharts: any = ref(null)

//颜色数组
let colors: any = ["#d5b00a","#19a3df", "#3fb594", "#db6c72", "#585eaa", "#d5b00a", "#3fb594", '#db6c72']
let initEcharts = () => {
    if (first) { myChart = echarts.init(leftEcharts.value as any); }
    first = false
    let state = reactive({
        option: {
            tooltip: {
                trigger: "axis",
                textStyle: {
                    fontSize: 12,
                },
                formatter: function (params: any) {
                    var relVal = params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                        relVal +=
                            "<br/>" + params[i].marker + params[i].seriesName + '  ' + params[i].value.toFixed(3) + "A";
                    }
                    return relVal;
                }
            },
            legend: {
                show: true,
                // icon: "rect",
                itemWidth: 10,
                itemHeight: 6,
                data: ["电流", '电压'],
                textStyle: {
                    color: colors,
                    fontSize: 12
                }
            },
            grid: {
                top: "14%",
                bottom: '8%',
                left: '6%',
                right: '12%'
            },
            xAxis: {
                data: xData,
                type: "category",
                boundaryGap: false,
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    interval: "auto",
                    // formatter: function (value: any) {
                    //     return value.slice(5)
                    // },
                    fontSize: 12,
                    color: '#a6bde9'
                },
            },
            yAxis: [
                {
                    name: '电流',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        fontSize: 12,
                        color: '#a6bde9'
                    },
                },
                {
                    name: '电压',
                    type: 'value',
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        show: true
                    },
                    axisLabel: {
                        fontSize: 12,
                        color: '#a6bde9'
                    },
                },
            ],
            series: [
                {
                    name: '电流',
                    data: y1Data,
                    type: "line",
                    symbol: "circle",
                    symbolSize: 6,
                    // showSymbol: false,
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    zlevel: 3,
                    lineStyle: {
                        normal: {
                            width: 2,
                            //线条颜色
                            color: colors[0],
                        },
                    },
                    itemStyle: {
                        //圆点颜色
                        color: colors[0],
                        // borderColor: "#a3c8d8",
                    },
                    smooth: false,
                },
                {
                    name: '电压',
                    data: y2Data,
                    type: "bar",
                    symbol: "circle",
                    symbolSize: 6,
                    zlevel: 3,
                    xAxisIndex: 0,
                    yAxisIndex: 1,
                    itemStyle: {
                        //圆点颜色
                        color: colors[1],
                        // borderColor: "#a3c8d8",
                    },
                    lineStyle: {
                        normal: {
                            width: 2,
                            //线条颜色
                            color: colors[1],
                        },
                    },
                    smooth: false,
                }
            ]
        }
    })
    state.option && myChart.setOption(state.option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

</script>
<style lang="less" scoped>
.nBox {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 2%;
    box-sizing: border-box;
}

.title {
    font-size: 17px;
    height: 40px;
    line-height: 34px;
    margin-left: 4px;
}

.echarts {
    margin-left: 3%;
    width: 100%;
    height: 80%;
    // background-color: aqua;
}
</style>