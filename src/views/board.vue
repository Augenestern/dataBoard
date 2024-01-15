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
      <el-upload
        ref="upload"
        class="upload-demo"
        :limit="1"
        :on-exceed="handleExceed"
        :auto-upload="false"
        :show-file-list="false"
        :on-change="daoru"
      >
        <template #trigger>
          <el-tooltip class="box-item" effect="dark" placement="bottom">
            <template #content>
              <div style="font-size: 14px; text-align: center">导入</div>
            </template>
            <div class="header-rightIcon1">
              <el-icon class="iconSty"><Upload /></el-icon>
            </div>
          </el-tooltip>
        </template>
      </el-upload>
      <el-tooltip class="box-item" effect="dark" placement="bottom">
        <template #content>
          <div style="font-size: 14px; text-align: center">导出</div>
        </template>
        <div class="header-rightIcon">
          <el-icon class="iconSty"  @click="exportFunc"><Download /></el-icon>
        </div>
      </el-tooltip>

      <div class="header-right">
        <div style="font-size: 14px; text-align: right; color: #cacaca">
          {{ nowTimeM }}
        </div>
        <div style="font-size: 22px">{{ nowTimeT }}</div>
      </div>
    </div>
    <div class="body">
      <div class="body-left"><bodyLeft></bodyLeft></div>
      <div class="body-mid"><bodyMid></bodyMid></div>
      <div class="body-right">
        <div class="body-right-one"><bodyRight1></bodyRight1></div>
        <div class="body-right-two"><bodyRight2></bodyRight2></div>
      </div>
    </div>
    <div class="bottom"><bottomTable></bottomTable></div>
  </div>
</template>

<script setup lang="ts">
import bodyLeft from "@/components/bodyLeft.vue";
import bodyMid from "@/components/bodyMid.vue";
import bodyRight1 from "@/components/bodyRight1.vue";
import bodyRight2 from "@/components/bodyRight2.vue";
import bottomTable from "@/components/bottomTable.vue";
import dayjs from "dayjs";
import { genFileId, ElNotification } from "element-plus";
import * as XLSX from "xlsx";

const upload = ref();
//最多上传一个报表，第二次会替换第一次的
const handleExceed = (files: any) => {
  upload.value!.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

//上传成功导入
const daoru = (file: any) => {
  if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
    ElNotification({
      title: "Error",
      message: "导入报表格式不正确，请上传xls或者xlsx格式",
      type: "error",
      duration: 3000,
    });
  } else {
    ElNotification({
      title: "Success",
      message: "成功导入报表",
      type: "success",
      duration: 2500,
    });
    const fileReader = new FileReader();
    fileReader.onload = (ev: any) => {
      try {
        const data = ev.target.result; // 获取结果
        // 获取所有表的信息
        const workbook = XLSX.read(data, {
          type: "binary", // 以字符编码的方式解析
          cellDates: true, // 将excel中日期类型数据，转化为标准日期格式，而不是默认的数字格式
        });
        // 获取第一张表的表名
        const exlname = workbook.SheetNames[0];
        // 转换成json数据
        const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]); // 生成json表格内容
        // 打印 ws 就可以看到读取出的表格数据
        console.log(exl);
        exportDataSource.value = exl
        // 数据处理
        //   submit_from(exl)
      } catch (e) {
        console.log("error");
        return false;
      }
    };
    console.log(file.raw);
    fileReader.readAsBinaryString(file.raw);

    // 数据处理成需要的格式
    //     const submit_from = (data)=>{
    //       // 遍历处理数据（根据你自己实际情况修改内容）
    //       data.forEach((item) => {
    //         let obj = {}
    //         for (let i = 0; i <= data.length; i++) {
    //           obj.id = item.账号
    //           obj.name = item.用户名
    //           obj.address = item.地址
    //           obj.job = item.职业
    //           obj.status = item.账号状态 === '启用' ? 'true' : 'false'
    //           obj.birthday = moment(item.生日).format('YYYY-MM-DD')
    //         }
    //         // 赋值给参数jsondata
    //         this.jsondata.push(obj)
    //       })
    //       console.log(this.jsondata)
    //       // 遍历post请求添加数据到mysql（换成你自己的post接口）
    //       this.jsondata.forEach((item) => {
    //         this.$api.addgameuser(item.id, item.name, item.job, item.birthday, item.address, item.status, '')
    //           .then((res) => {
    //             this.resdata.push(res.data)// 返回添加结果
    //           })
    //           .catch((err) => {
    //             console.log(err)
    //           })
    //     console.log(file);
    //   })}
  }
};

//json转excel并下载----导出
const openDownloadDialog = (url:any, saveName:any) => {
  if (typeof url == "object" && url instanceof Blob) {
    url = URL.createObjectURL(url); // 创建blob地址
  }
  var aLink = document.createElement("a");
  aLink.href = url;
  aLink.download = saveName || ""; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
  var event;
  if (window.MouseEvent) event = new MouseEvent("click");
  else {
    event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
  }
  aLink.dispatchEvent(event);
};
// 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
const sheet2blob = (sheet:any, sheetName:any) => {
  sheetName = sheetName || "sheet1";
  var workbook:any = {
    SheetNames: [sheetName],
    Sheets: {},
  };
  workbook.Sheets[sheetName] = sheet;
  // 生成excel的配置项
  var wopts:any = {
    bookType: "xlsx", // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: "binary",
  };
  var wbout = XLSX.write(workbook, wopts);
  var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  // 字符串转ArrayBuffer
  function s2ab(s:any) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }
  return blob;
};
var exportDataSource:any = ref([
  {
    name: "路人甲",
    phone: "123456789",
    email: "000@123456.com",
  },
  {
    name: "炮灰乙",
    phone: "123456789",
    email: "000@123456.com",
  },
  {
    name: "土匪丙",
    phone: "123456789",
    email: "000@123456.com",
  },
  {
    name: "流氓丁",
    phone: "123456789",
    email: "000@123456.com",
  },
]); //导出json数据源
const exportFunc = () => {
// 数据处理成需要的格式
//   var excelItems = [];
//   for (let i = 0; i < exportDataSource.value.length; i++) {
//       excelItems.push({
//         姓名: exportDataSource.value[i].name,
//         电话: exportDataSource.value[i].phone,
//         邮箱: exportDataSource.value[i].email,
//       }); //属性
//   }
//   console.log(excelItems);
  var sheet = XLSX.utils.json_to_sheet(exportDataSource.value);
  openDownloadDialog(sheet2blob(sheet,"sheet1"), "exportdata.xlsx");
};

//右上角时间
let nowTimeM = ref("0000-00-00");
let nowTimeT = ref("00:00:00");
setInterval(() => {
  nowTimeM.value = dayjs().format("YYYY-MM-DD");
  nowTimeT.value = dayjs().format("HH:mm:ss");
}, 1000);

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
};
onMounted(() => {
  //监听F11全屏，防止全屏按钮冲突
  window.addEventListener("keydown", (e: any) => {
    if (e.key == "F11") {
      e.preventDefault();
      fullScreen();
    }
  });
});
onUnmounted(() => {});
</script>

<style lang="less" scoped>
.upload-demo {
  right: 160px;
  position: absolute;
  top: 16%;
  //   transform: translateY(-50%);
}
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
  &-rightIcon {
    font-size: 30px;
    right: 110px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  &-rightIcon1 {
    font-size: 30px;
  }
}
.iconSty {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: #3e3e3e;
}
.iconSty:hover {
  background-color: #5d5d5d;
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
    border-top: 3px solid #1091ed;
    width: 0;
  }

  &-mid {
    flex: 3;
    background-color: #152029;
    border-top: 3px solid #4ec8a2;
    width: 0;
  }

  &-right {
    flex: 1;
    margin-left: 10px;
    border-top: 3px solid #f97577;
    display: flex;
    flex-direction: column;
    width: 0;
    &-one {
      flex: 1;
      background-color: #152029;
      height: 0;
    }
    &-two {
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
