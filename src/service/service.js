import http from '../http'

class service {
    getTodo(){
        return http.get('/');
    }
    getOne(id){
        return http.get(`/one/${id}`)
    }
    createTodo(data){
        return http.post('/', data)
    }
    editTodo(id, data){
        return http.put(`/${id}`, data)
    }
    deleteTodo(id){
        return http.delete(`/${id}`)
    }
    deleteAll(){
        return http.delete('/')
    }
}

export default new service;