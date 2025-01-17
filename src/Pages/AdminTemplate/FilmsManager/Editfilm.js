import React, { useState, useEffect } from 'react'
import { Redirect } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import swal from 'sweetalert'

import Rating from '../../HomeTemplate/Home/HomeComponents/Content/CarouselFilm/Rating';
import { USER_LOGIN, GROUP_ID } from '../../../Util/Setting';
import { phimAction, updatePhimAction, deletePhimAction } from '../../../Redux/Action/PhimAction';

import { Table, Space, DatePicker, Form, Switch } from 'antd';

export default function Editfilm() {

    const { arrPhim } = useSelector(state => state.QuanLyPhimReducer);
    const [imgSrc, setImgSrc] = useState('');
    const dispatch = useDispatch();

    const [maPhim, setMaPhim] = useState('');
    const [biDanh, setBiDanh] = useState('');
    const [date, setDate] = useState('');
    const [dangChieu, setDangChieu] = useState(true);
    const [sapChieu, setSapChieu] = useState(true);
    const [hot, setHot] = useState(true);
    const [img, setImg] = useState('');
    const [change, setChange] = useState(false);



    useEffect(() => {
        const actionPhim = phimAction(GROUP_ID);
        dispatch(actionPhim);
    }, [])




    const confirmData = () => {
        if (change === true) {
            let frmData = new FormData();
            frmData.append('maPhim', maPhim)
            // frmData.append('biDanh', biDanh)
            frmData.append('tenPhim', document.getElementById('filmModalName').value)
            frmData.append('trailer', document.getElementById('filmModalTrailer').value)
            frmData.append('moTa', document.getElementById('filmModalDetail').value)
            frmData.append('ngayKhoiChieu', date)
            frmData.append('danhGia', document.getElementById('filmModalDanhGia').value)
            frmData.append('DangChieu', dangChieu)
            frmData.append('SapChieu', sapChieu)
            frmData.append('Hot', hot)
            frmData.append('hinhAnh', img)
            dispatch(updatePhimAction(frmData));
        } else {
            swal({
                title: 'Not Changed !',
                text: 'Không có dữ liệu nào thay đổi',
                icon: 'info'
            })
        }
    }
    const editData = (dataInput) => {
        setMaPhim(dataInput.maPhim)
        setBiDanh(dataInput.biDanh)
        document.getElementById('filmModalName').value = dataInput.tenPhim
        document.getElementById('filmModalTrailer').value = dataInput.trailer
        document.getElementById('filmModalDetail').value = dataInput.moTa
        setDangChieu(dataInput.dangChieu)
        setSapChieu(dataInput.sapChieu)
        setHot(dataInput.hot)
        document.getElementById('filmModalDanhGia').value = dataInput.danhGia
    }
    const deleteData = (dataInput) => {
        var result = window.confirm("Want to delete " + dataInput.tenPhim + " ?");
        if (result) {
            const actionDeletePhim = deletePhimAction(dataInput.maPhim);
            dispatch(actionDeletePhim);
        }
    }
    const formChange = () => {
        setChange(true)
    }




    const dateHandleChange = (data) => {
        var m = new Date(data);
        var newDateString = ("0" + m.getUTCDate()).slice(-2) + "/" +
            ("0" + (m.getUTCMonth() + 1)).slice(-2) + "/" + m.getUTCFullYear();
        setDate(newDateString)
    }
    const dangChieuHandleChangeSwitch = () => {
        setDangChieu(!dangChieu)
    }
    const sapChieuHandleChangeSwitch = () => {
        setSapChieu(!sapChieu)
    }
    const hotHandleChangeSwitch = () => {
        setHot(!hot)
    }
    const handleChangeInputFile = async (event) => {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            await setImg(file)

            let fileReader = new FileReader()
            fileReader.readAsDataURL(file);
            fileReader.onload = async (e) => {
                await setImgSrc(e.target.result);
            }   // Convert IMG data to base 64
        }
    }





    const columns = [
        {
            title: 'Mã Phim',
            dataIndex: 'maPhim',
            key: 'maPhim',
        }, {
            title: 'Tên Phim',
            key: 'tenPhim',
            render: (text) => (
                <p style={{ width: '170px' }}>{text.tenPhim}</p>
            )
        }, {
            title: 'Trailer',
            key: 'trailer',
            render: (text) => (
                <p style={{ width: '170px' }}>{text.trailer}</p>
            )
        }, {
            title: 'Hình ảnh',
            key: 'hinhAnh',
            render: (text) => (
                <img src={text.hinhAnh} style={{ width: '50px' }}></img>
            )
        }, {
            title: 'Mô Tả',
            key: 'moTa',
            render: (text) => (
                <p style={{
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    width: '250px'
                }}>
                    {text.moTa}
                </p>
            )
        }, {
            title: 'Mã Nhóm',
            dataIndex: 'maNhom',
            key: 'maNhom',
        }, {
            title: 'Khởi Chiếu',
            key: 'ngayKhoiChieu',
            render: (text) => {
                let dateString = text.ngayKhoiChieu, reggie = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/;
                var dateArray = reggie.exec(dateString);
                return (<div style={{ width: '80px' }}>{dateArray[3]}-{dateArray[2]}-{dateArray[1]}</div>)
            }
        }, {
            title: 'Đánh Giá',
            key: 'danhGia',
            render: (text) => (
                <span><Rating value={text.danhGia / 2} />&nbsp;&nbsp;{text.danhGia}/10</span>
            )
        }, {
            title: 'Action',
            key: 'action',
            render: (record) => (
                <Space size="middle">
                    <button type="button" data-toggle="modal" data-target="#filmModal" className="btn btn-success"
                        style={{ fontSize: '.85rem' }} onClick={() => { editData(record) }}>Edit</button>
                    <button className="btn btn-danger" style={{ fontSize: '.85rem' }} onClick={() => { deleteData(record) }}>Delete</button>
                </Space>
            ),
        }
    ]
    const search = (dataInput) => {
        console.log(dataInput)
        dispatch({
            type: 'SEARCH_FILM',
            tenPhim: dataInput,
        })
    }

    return (
        <div>
            <div className="modal fade" id="filmModal" tabIndex={-1} aria-labelledby="filmModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="filmModalLabel">Cập Nhật Thông Tin Phim</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onChange={formChange}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="filmModalName">Tên phim</label>
                                        <input type="text" className="form-control" id="filmModalName" />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="filmModalTrailer">Trailer</label>
                                        <input type="text" className="form-control" id="filmModalTrailer" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="filmModalDetail">Mô tả</label>
                                    <textarea type="text" rows="4" className="form-control" id="filmModalDetail" />
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="filmModalDate">Ngày khởi chiếu</label><br />
                                            <DatePicker initialValues={{ size: 'large', }} size="large" onChange={dateHandleChange}
                                                name="ngayKhoiChieu" format="DD/MM/YYYY" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="permissionFormControlSelect">Đánh giá</label>
                                            <input type="number" max="10" min="0" className="form-control" id="filmModalDanhGia" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="col-md-6">
                                        <Form.Item label="Đang chiếu" valuePropName="checked">
                                            <Switch name="editDangChieu" checked={dangChieu} onChange={dangChieuHandleChangeSwitch} />
                                        </Form.Item>
                                        <Form.Item label="Sắp chiếu" valuePropName="checked">
                                            <Switch name="editSapChieu" checked={sapChieu} onChange={sapChieuHandleChangeSwitch} />
                                        </Form.Item>
                                        <Form.Item label="Hot" valuePropName="checked">
                                            <Switch name="editHot" checked={hot} onChange={hotHandleChangeSwitch} />
                                        </Form.Item>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label for="permissionFormControlSelect">Hình ảnh</label><br />
                                            <input type="file" className="mb-3" name="hinhAnh" onChange={handleChangeInputFile}
                                                accept="image/png, image/jpeg,image/gif,image/png" /><br />
                                            <img src={imgSrc} alt="..." width="200" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => { confirmData() }}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h3 className="col-12 col-lg-3">Quản lý Phim</h3>
                <div className="col-12 d-none d-md-block col-lg-3"></div>
                <div className="col-12 d-none d-md-block col-lg-3"></div>
                <div className="col-12 col-lg-3">
                    <input
                        className="form-control mb-3"
                        placeholder="Nhập tên phim ..."
                        onKeyUp={(e) => { search(e.target.value) }}
                    />
                </div>
            </div>
            <Table dataSource={arrPhim} columns={columns} responsive={true}
                pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30', '40'] }} />
        </div>
    )
}
