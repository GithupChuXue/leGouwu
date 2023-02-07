// 引入uuid
import { v4 as uuidv4 } from "uuid";
// 暴露一个生成随机的游客身份id ，且必须持久化
export const getUuid = () => {
  //先从本地存储获取是否有
  let uuid = localStorage.getItem("UUId");
  //如果没有
  if(!uuid){
    uuid = uuidv4();
    // 本地存储
    localStorage.setItem("UUID",uuid);
  }
// 返回结果
  return uuid;
};
