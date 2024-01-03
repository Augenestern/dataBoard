<template>
    <div class="nBox">
        <div class="title"><el-icon style="transform: rotate(180deg) translateY(-2px)">
                <CopyDocument />
            </el-icon> 数据</div>
        <div class="tableSty">
            <el-table :data="tableData" style="width: 100%;background-color: #152029;font-weight: 500;"
                table-layout="fixed" :height="tableHeight"
                :header-cell-style="{ background: '#30343D', color: '#E3E5E7', height: '60px', borderColor: '#152029',fontWeight: 500 }"
                :cell-style="{ height: '50px', background: '#152029',color: '#E3E5E7', borderColor: '#262626' }">
                <el-table-column align="center" prop="date" label="Date" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="address" label="Address" />
            </el-table>
        </div>
        <div style="background-color: #152029;width: 98%;position: absolute;height: 3%;bottom: 0px;z-index: 10;"></div>
    </div>
</template>

<script setup lang="ts">

let tableHeight = ref('200px')
const tableData = [
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        ada: 'wer',
        asda: "sdsd",
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]

const reTableHeight = () => {
    let xx = document.querySelector(".tableSty").offsetHeight+"px"
    tableHeight.value = xx;
}
onMounted(() => {
    reTableHeight()
    window.addEventListener('resize',()=>{
        reTableHeight()
    })
})
onUnmounted(() => {
})
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

.tableSty {
    margin-top: 3px;
    flex: auto;
    height: 0;
}


</style>