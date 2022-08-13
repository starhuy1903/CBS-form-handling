import {createSlice} from "@reduxjs/toolkit";

const studentSlice = createSlice({
    name: 'student',
    initialState: {
        stuList: [
            {
                id: "1",
                fullName: "Huy Nguyen",
                phoneNumber: "01234556",
                email: "huy@gmail.com"
            },
            {
                id: "2",
                fullName: "Hai Nguyen",
                phoneNumber: "09999999",
                email: "hai@gmail.com"
            }
        ],
        selectedStudent: null
    },
    reducers: {
        addStudent(state, action) {
            const newStu = action.payload;
            const foundStudent = state.stuList.find(stu => stu.id === newStu.id);

            if (foundStudent) return alert("Student was existed");

            state.stuList.push(newStu);
        },
        updateStudent(state, action) {
            const updatedStu = action.payload;
            const cloneList = [...state.stuList];
            const index = cloneList.findIndex(item => item.id === updatedStu.id);

            if(index === -1) return;
            cloneList[index] = updatedStu;

            state.stuList = cloneList;

            state.selectedStudent = null;
        },
        removeStudent(state, action) {
            const deletedId = action.payload;
            const cloneList = [...state.stuList];
            const index = cloneList.findIndex(item => item.id === deletedId);

            if(index === -1) return;
            cloneList.splice(index, 1);

            state.stuList = cloneList;

        },
        showStudent(state, action) {
            const id = action.payload;
            const foundStudent = state.stuList.find(stu => stu.id === id);
            if (foundStudent) {
                state.selectedStudent = foundStudent;
            } else {
                state.selectedStudent = null;
            }
        }
    }
})


export const studentActions = studentSlice.actions;

export default studentSlice;