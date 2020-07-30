export function valiPhone(phone){
  let reg = /^1[0-9]{10}$/
  return reg.test(phone)
}
export function valiCode(code){
  let reg = /^[0-9]{6}$/;
  return reg.test(code)
}
//8-20位密码,数字、字母、字符至少包含两种,不能包含中文和空格
export function valiPass(pass){
  let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{8,20}$/
  return reg.test(pass)
}