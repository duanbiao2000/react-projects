// 将一个颜色分量转换为16进制表示
function componentToHex(c) {
  // 将颜色分量转换为16进制表示
  var hex = c.toString(16);
  // 如果转换后的16进制表示只有一位，则在前面补0
  return hex.length == 1 ? '0' + hex : hex;
}

// 将RGB颜色转换为16进制表示
function rgbToHex(r, g, b) {
  // 将RGB颜色转换为16进制表示
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// 导出rgbToHex函数
export default rgbToHex;
