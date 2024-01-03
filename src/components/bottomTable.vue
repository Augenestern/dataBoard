<template>
    <div class="nBox">
        <div class="title"><el-icon><DocumentCopy /></el-icon> 报表</div>
        <div class="tableSty1">
            <el-table :data="tableData" style="width: 100%;background-color: #152029;font-weight: 500;border: 1px solid #1D2A38"
                table-layout="fixed" :height="tableHeight"
                :header-cell-style="{ background: '#30343D', color: '#E3E5E7', height: '40px', border: '1px solid #1D2A38',fontWeight: 500 }"
                :cell-style="{ height: '30px', background: '#152029',color: '#E3E5E7',  border: '1px solid #1D2A38' }">
                <el-table-column align="center" prop="date" label="Date" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="name" label="Name" />
                <el-table-column align="center" prop="address" label="Address" />
            </el-table>
        </div>
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
    let xx = document.querySelector(".tableSty1").offsetHeight+"px"
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
    padding: 0.5%;
    box-sizing: border-box;
}

.title {
    font-size: 17px;
    height: 30px;
    line-height: 20px;
    margin-left: 4px;
}

.tableSty {
    margin-top: 3px;
    flex: auto;
    height: 0;
}
</style>