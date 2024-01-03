<template>
    <div class="wBox">
        <div class="header">
            <div class="header-left">
                <el-icon size="30px">
                    <Histogram />
                </el-icon>
                <div>&nbsp;数据监测看板</div>
                <el-icon class="elIcon" @click="fullScreen">
                    <FullScreen />
                </el-icon>
            </div>
            <div class="header-right">
                <div style="font-size: 14px;text-align: right;color: #cacaca;">{{ nowTimeM }}</div>
                <div style="font-size: 22px;">{{ nowTimeT }}</div>
            </div>
        </div>
        <div class="body">
            <div class="body-left"><bodyLeft></bodyLeft></div>
            <div class="body-mid"><bodyMid></bodyMid></div>
            <div class="body-right">
                <div  class="body-right-one"><bodyRight1></bodyRight1></div>
                <div  class="body-right-two"><bodyRight2></bodyRight2></div>
            </div>
        </div>
        <div class="bottom"><bottomTable></bottomTable></div>
    </div>
</template>

<script setup lang="ts">
import bodyLeft from '@/components/bodyLeft.vue';
import bodyMid from '@/components/bodyMid.vue';
import bodyRight1 from '@/components/bodyRight1.vue';
import bodyRight2 from '@/components/bodyRight2.vue';
import bottomTable from '@/components/bottomTable.vue'
import dayjs from 'dayjs'

//右上角时间
let nowTimeM = ref('0000-00-00')
let nowTimeT = ref('00:00:00')
setInterval(() => {
    nowTimeM.value = dayjs().format('YYYY-MM-DD')
    nowTimeT.value = dayjs().format('HH:mm:ss')
}, 1000)

//全屏按钮
const fullScreen = () => {
    var docElm: any = document.documentElement;
    // W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    // FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    // Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    // IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
    // 退出全屏
    // W3C
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    // FireFox
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    // Chrome等
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
        data.name = "全屏";
    }
    // IE11
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}
onMounted(() => {
    //监听F11
    window.addEventListener('keydown', (e:any)=>{
    if(e.key == 'F11'){
      e.preventDefault()
      fullScreen()
    }
  });
})
onUnmounted(() => {
})
</script>

<style lang="less" scoped>
.wBox {
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    padding: 10px;
    display: flex;
    flex-direction: column;
    background-color: #151419;
}

.header {
    width: 100%;
    height: 60px;
    background-color: #152029;
    position: relative;
    color: #fff;

    &-left {
        font-size: 1.6rem;
        font-weight: 800;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 15px;
        display: flex;
        align-items: center;
    }

    &-right {
        right: 15px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
    }
}

.body {
    flex: 3;
    height: 0;
    margin-top: 10px;
    display: flex;
    color: #fff;
    &-left {
        flex: 1;
        margin-right: 10px;
        background-color: #152029;
        border-top: 3px solid #1091ED;
        width: 0;
    }

    &-mid {
        flex: 3;
        background-color: #152029;
        border-top: 3px solid #4EC8A2;
        width: 0;
    }

    &-right {
        flex: 1;
        margin-left: 10px;
        border-top: 3px solid #F97577;
        display: flex;
        flex-direction: column;
        width: 0;
        &-one{
            flex: 1;
            background-color: #152029;
            height: 0;
            
        }
        &-two{
            margin-top: 10px;
            flex: 1;
            background-color: #152029;
            height: 0;
        }
    }
}

.bottom {
    flex: 1;
    background-color: #152029;
    margin-top: 10px;
    color: #fff;
}

//icon动画
.elIcon:hover {
    transform: scale(1.2);
    transition-duration: 0.2s;
    color: #fff;
}

.elIcon {
    margin-top: 10px;
    margin-left: 10px;
    font-size: 20px;
    color: #6d6e6e;
}
</style>