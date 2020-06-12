const cloud = require('wx-server-sdk')
cloud.init({
  env: 'travel-e2e51'
})
const db = cloud.database();
exports.main = async (event, context) => {
  console.log(event)
  await db.collection('travelMessage').add({
    data: event,
    success: res => {
      console.log('[数据库] [新增记录] ', res)
    },
    fail: err => {
      console.error('[数据库] [新增记录] 失败：', err)
    }
  });
};

// const cloud = require('wx-server-sdk')
// cloud.init({
//   env: 'travel-e2e51'
// })
// const db = cloud.database()
// exports.main = async (event, context) => {
//   try {
//     console.log('新增数据：', event);
//     return await db.collection('travelMessage').add({
//       // data 字段表示需新增的 JSON 数据
//       data: event
//     })
//   } catch(e) {
//     console.error(e)
//   }
// }