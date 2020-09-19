<template>
    <div class="container">
        <h1>Todo app</h1>
        <div class="add" @submit.prevent>
            <input v-if="update" type="text" class="input-todo" v-model="todoUpdate" >
            <button v-if="update" class="update-btn" @click="editTodo()" type="submit">Update</button>
            <input v-if="!update" type="text" class="input-todo" v-model="data.todo">
            <button v-if="!update" class="add-btn" @click="createTodo()" type="submit">Add</button>
        </div>
        <div class="action">
            <button class="delete-btn" @click="deleteAllTodo()">Delete All</button>
        </div>
        <div class="card" v-for="(p, index) in todos" :key="index">
            <p>{{ p.todo }}</p>
            <button class="edit-card" @click="getOneTodo(p._id)"><img src="../assets/edit.svg" alt="edit"></button>
            <button class="delete-card" @click="deleteTodo(p._id)"><img src="../assets/delete.svg" alt="delete"></button>
        </div>
    </div>
</template>
<script>
import Service from '../service/service'

export default {
    name: 'list',
    data () {
        return {
            todos: [],
            data: {
                todo: '',
                done: false
            },
            todoUpdate: '',
            id: '',
            update: false
        }
    },
    methods: {
        getTodo(){
            Service.getTodo()
                .then(result => {
                    this.todos = result.data
                })
                .catch(err => {
                    console.log(err)
                })
        },
        createTodo(){
            if(this.data.todo == ''){
                alert('please insert a text')
            } else {
                Service.createTodo(this.data)
                    .then(() => {
                        this.getTodo()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        getOneTodo(id){
            this.update = true
            Service.getOne(id)
                .then(result => {
                    this.todoUpdate = result.data.todo
                    this.id = result.data._id
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editTodo(){
            const data = {
                todo: this.todoUpdate
            }
            Service.editTodo(this.id, data)
                .then(() => {
                    alert('update complete')
                    this.getTodo()
                    this.update = false
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteTodo(id){
            Service.deleteTodo(id)
                .then(() => {
                    alert('delete complete')
                    this.getTodo()
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteAllTodo(){
            Service.deleteAll()
                .then(() => {
                    alert('delete complete')
                    this.getTodo()
                })
                .catch(err => {
                    console.log(err)
                })
        }
    },
    mounted() {
        this.getTodo()
    },
}
</script>
<style scope>
    .container {
        width: 600px;
        margin: 50px auto;
    }
    h1 {
        text-align: center;
        color: #5c5c5c;
    }
    button {
        border: none;
        border-radius: 5px;
        outline: none;
    }
    .action {
        display: flex;
        justify-content: center;
        margin: 0 auto 30px auto;   
    }
    select {
        font-size: 18px;
        padding: 0 5px;
    }
    .add {
        display: flex;
        justify-content: center;
        margin: auto;
        margin: 50px 0 30px 0
    }
    .input-todo {
        width: 400px;
        height: 35px;
        padding: 0 10px;
        font-size: 16px;
    }
    .delete-btn, .add-btn, .update-btn {
        margin: 0 0 0 20px;
        width: 100px;
        height: 35px;
        background-color: #0066FF;
        color: #ffffff;
        font-size: 18px;
    }
    .delete-btn {
        margin: 0;
        background-color: #FF0101;
    }
    .update-btn {
        margin: 0 0 0 20px;
        background-color: #15fa00e8;
    }

    .card {
        width: 600px;
        height: 80px;
        border: 1px solid #656565;
        border-radius: 5px;
        box-shadow: 5px 5px 5px rgba(170, 170, 170, 25%);
        display: flex;
        align-items: center;
        margin: 20px 0;
    }
    
    p {
        width: 400px;
        margin: auto;
        font-size: 18px;
    }
    .edit-card, .delete-card{
        width: 40px;
        height: 40px;
    }
    .edit-card {
        background-color: #15fa00e8;
        margin: 0 20px 0 0;
    }
    .delete-card {
        background-color: #FF0101;
        margin: 0 30px 0 0;
    }
    
</style>