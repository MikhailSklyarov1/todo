import { create } from 'zustand';
import axios from 'axios';

const useStore = create((set) => ({
    dataStore: [{ text: "", id: 0 }],
    getTodos: () => {
        axios.get('http://unit-vlg.ru:9000/api/actions/getAll')
            .then(res => {
                const todo = res.data;
                const mainData = todo.map(item => ({
                    text: item.task,
                    id: item.id
                }))
                set(() => ({dataStore: mainData}))
            })
    },

    deleteTodo: (id) => {
        axios.delete(`http://unit-vlg.ru:9000/api/actions/delete?id=${id}`)
            .then(res => {
                const todo = res.data;
                const mainData = todo.map(item => ({
                    text: item.task,
                    id: item.id
                }))
                set(() => ({dataStore: mainData}))
            })
    },

    createTodo: (newTodo) => {
        axios.post('http://unit-vlg.ru:9000/api/actions/create', {...newTodo})
            .then(res => {
                const todo = res.data;
                const mainData = todo.map(item => ({
                    text: item.task,
                    id: item.id
                }))
                set(() => ({dataStore: mainData}))
            })
    },
}))


export default useStore;