import React, {useEffect, useState} from 'react';
import styles from './form.module.css'
import {Button, Card, Divider, Input} from 'antd'
import {useDispatch, useSelector} from "react-redux";
import * as yup from 'yup'
import {studentActions} from "../store/studentSlice";
import isEmpty from "lodash.isempty";
import {FaCheck, FaEnvelope, FaPhone, FaRegUser, FaUndo} from "react-icons/fa";

const InfoForm = () => {
    const dispatch = useDispatch();

    const selectedStudent = useSelector(state => state.student.selectedStudent)

    const [user, setUser] = useState({
        id: "",
        fullName: "",
        phoneNumber: "",
        email: ""
    })

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (!selectedStudent) return;

        if (selectedStudent.id === user.id) return;

        setUser(selectedStudent);
    }, [selectedStudent])

    const userSchema = yup.object().shape({
        id: yup.string().required("*Please input this field").matches(/^[0-9]+$/g, "Phone number must be alphanumeric"),
        fullName: yup.string().required("*Please input this field").matches(/^[A-Za-z ]+$/g, "Name have to the character"),
        phoneNumber: yup.string().required("*Please input this field").matches(/^[0-9]+$/g, "Phone number must be alphanumeric"),
        email: yup.string().required("*Please input this field").email("*Email is not match format"),
    })

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const validateForm = async () => {
        const validationErrors = {}
        try {
            await userSchema.validate(user, {abortEarly: false});
        } catch (err) {
            // console.log({...err})
            const errObj = {...err};

            errObj.inner.forEach(validationError => {
                if (validationErrors[validationError.path]) return

                validationErrors[validationError.path] = validationError.message
            });
            // console.log(validationErrors)
            setErrors(validationErrors)
        }

        return isEmpty(validationErrors);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = await validateForm();
        if (!isValid) return;

        if (selectedStudent) {
            dispatch(studentActions.updateStudent(user))
        } else {
            dispatch(studentActions.addStudent(user))
        }
        setErrors([])
        resetForm();
    }

    const resetForm = () => {
        setUser({
            id: "",
            fullName: "",
            phoneNumber: "",
            email: ""
        })
        setErrors([])
        dispatch(studentActions.showStudent(null))
    }

    return (
        <Card title="Thông tin sinh viên" headStyle={{
            backgroundColor: "#000000",
            color: "white"
        }}>
            <form onSubmit={handleSubmit} className={styles.form}>

                <div className={styles.formGroup}>
                    <label style={{ display: "block", textAlign: "left" }}>Mã SV</label>
                    <Input disabled={selectedStudent} value={user.id} name="id" onChange={handleChange}
                           placeholder="Mã SV" prefix={<FaRegUser/>}></Input>
                    <span className={styles.warningSpan}>{errors.id}</span>
                </div>

                <div className={styles.formGroup}>

                    <label>Họ tên</label>
                    <Input value={user.fullName} name="fullName" onChange={handleChange} placeholder="Họ tên"
                           prefix={<FaRegUser/>}></Input>
                    <span className={styles.warningSpan}>{errors.fullName}</span>
                </div>

                <div className={styles.formGroup}>
                    <label>Số điện thoại</label>
                    <Input value={user.phoneNumber} name="phoneNumber" onChange={handleChange}
                           placeholder="Số điện thoại" prefix={<FaPhone/>}></Input>
                    <span className={styles.warningSpan}>{errors.phoneNumber}</span>
                </div>

                <div className={styles.formGroup}>
                    <label>Email</label>
                    <Input value={user.email} name="email" onChange={handleChange} placeholder="Email"
                           prefix={<FaEnvelope/>} type="email"></Input>
                    <span className={styles.warningSpan}>{errors.email}</span>
                </div>

                <div className={styles.btn}>
                    <Button htmlType="submit" type="primary"><FaCheck/>{selectedStudent ? "Cập nhật" : "Thêm sinh viên"}
                    </Button>
                    <Button onClick={resetForm} type="default"><FaUndo/> {selectedStudent ? "Hủy" : "Reset"}</Button>
                </div>
            </form>
        </Card>
    );
};

export default InfoForm;