import React, {useEffect, useState} from 'react';
import {Button, Card, Table, Input, Divider} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {studentActions} from "../store/studentSlice";
import {FaCog, FaTrashAlt} from "react-icons/fa";

const StudentList = () => {
    const {Search} = Input;
    const stuList = useSelector(state => state.student.stuList)
    const [showedList, setShowedList] = useState(stuList);

    const dispatch = useDispatch();

    useEffect(() => {
        setShowedList(stuList);
    }, [stuList])

    const getUpdateStu = (id) => {
        dispatch(studentActions.showStudent(id))
    }

    const deleteStu = (id) => {
        dispatch(studentActions.removeStudent(id))
    }

    const onSearch = (e) => {
        if(e.target.value !== "") {
            const searchedValue = e.target.value;
            setShowedList(stuList.filter(item => item.id.startsWith(searchedValue) || item.phoneNumber.startsWith(searchedValue)))
        } else {
            setShowedList(stuList)
        }
    }

    const columns = [
        {
            title: "Mã SV",
            dataIndex: "id"
        },
        {
            title: "Họ tên",
            dataIndex: "fullName"
        },
        {
            title: "Số điện thoại",
            dataIndex: "phoneNumber"
        },
        {
            title: "Email",
            dataIndex: "email"
        },
        {
            title: "",
            key: 'action',
            render: (_, user) => {
                return (
                    <>
                        <Button onClick={() => getUpdateStu(user.id)} type="primary"><FaCog/>Update</Button>
                        <Button onClick={() => deleteStu(user.id)} type="danger"><FaTrashAlt/>Delete</Button>
                    </>
                )
            }
        }

    ]
    return (
        <div>
            <Card title="Danh sách sinh viên"
                  headStyle={{backgroundColor: "#000000", color: "#ffffff"}}>
            </Card>

            <Divider orientation="right" plain>
                <Search
                    addonBefore="Search"
                    placeholder="Id or Phone Number"
                    allowClear
                    onChange={onSearch}
                    style={{
                        width: 304,
                    }}
                />
            </Divider>


            <Table dataSource={showedList.map(stu => {
                return {...stu, key: stu.id}
            })} columns={columns}></Table>
        </div>
    );
};

export default StudentList;