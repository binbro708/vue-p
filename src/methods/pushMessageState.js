import emitter from "@/methods/emitter";
// title給一個預設值
export default function (res, title = "更新") {
  // 如果有用這個function回傳的值是成功
  if (res.data.success) {
    // 這邊會把資料跨元件傳到ToastMessages裡面
    emitter.emit("push-message", {
      style: "success",
      title: `${title}成功`,
    });
  } else {
    // 有些訊息是字串，有些則是陣列，在此統一格式
    // 如果是字串型別，就把他加中括號讓他變陣列，如果是字串就不變
    const message =
      typeof res.data.message === "string"
        ? [res.data.message]
        : res.data.message;
    emitter.emit("push-message", {
      style: "danger",
      title: `${title}失敗`,
      //   失敗回來的訊息
      content: message.join("、"),
    });
  }
}
