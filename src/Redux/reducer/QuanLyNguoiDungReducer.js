import { USER_LOGIN } from "../../Util/Setting";
import { DANG_NHAP, SET_THONG_TIN_NGUOI_DUNG } from "../Action/Type/QuanLyNguoiDungType"




let usLogin = {};
if(localStorage.getItem(USER_LOGIN)){
    usLogin = JSON.parse(localStorage.getItem(USER_LOGIN))
}

const initialState = {
    userLogin:usLogin,

    thongTinNguoiDung:{}
}

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
    switch (action.type) {

    case DANG_NHAP:
        return { ...state,userLogin:action.userLogin}
    case SET_THONG_TIN_NGUOI_DUNG:
    return{...state,thongTinNguoiDung:action.thongTinNguoiDung}
    default:
        return state
    }
}