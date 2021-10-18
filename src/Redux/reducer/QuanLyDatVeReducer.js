import { ThongTinPhongVe } from "../../_core/models/ThongTinPhongVe";
import { CHUYEN_TAB, CHUYEN_TAB_ACTIVE, DAT_VE, DAT_VE_HOAN_TAT, SET_CHI_TIET_PHONG_VE } from "../Action/Type/QuanLyDatVeType";



const initialState = {
    chiTietPhongVe : new ThongTinPhongVe(),
    danhSachGheDangDat:[],
    danhSachGheKhachDat:[{maGhe:47561},{maGhe:47562}],
    tabActive: '1',
}

export const QuanLyDatVeReducer = (state = initialState, action) => {
    switch (action.type) {

    case SET_CHI_TIET_PHONG_VE:
        return {...state,chiTietPhongVe:action.chiTietPhongVe}; 
    case DAT_VE :
        //cập nhật gheDangDat
        const danhSachGheCapNhat = [...state.danhSachGheDangDat];

        let index = danhSachGheCapNhat.findIndex(gheDD =>gheDD.maGhe === action.gheDuocChon.maGhe)
        if(index !== -1){
            //xóa giá trị tìm thấy đã có trong mảng
            danhSachGheCapNhat.splice(index,1)
        }else{
            danhSachGheCapNhat.push(action.gheDuocChon)
        }
        return{...state,danhSachGheDangDat:danhSachGheCapNhat}
    case DAT_VE_HOAN_TAT:
        return{...state,danhSachGheDangDat:[]}

    case CHUYEN_TAB :
        return {...state,tabActive:'2'}
    case CHUYEN_TAB_ACTIVE:
        return {...state,tabActive:action.key}
    default:
        return state;
    }
}
