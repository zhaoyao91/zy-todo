import $ from 'jquery';
import ServerConfig from 'config/server';
import _ from 'lodash';

const BaseUrl = ServerConfig.BaseUrl;

export default {
    createTodo(todo, callback) {
        $.ajax({
            url: BaseUrl + '/todos/create',
            method: 'post',
            data: JSON.stringify(todo),
            contentType: "application/json; charset=UTF-8",
            dataType: 'json'
        }).fail((xhr, status, err)=> {
            callback(err);
        }).done((data, status, xhr)=> {
            callback(null, data);
        })
    },

    removeTodo(id, callback) {
        $.ajax({
            url: BaseUrl + '/todos/remove',
            method: 'post',
            data: JSON.stringify({id}),
            contentType: "application/json; charset=UTF-8",
            dataType: 'json'
        }).fail((xhr, status, err)=> {
            callback(err);
        }).done((data, status, xhr)=> {
            callback(null, data);
        })
    },

    updateTodo(id, update, callback) {
        $.ajax({
            url: BaseUrl + '/todos/update',
            method: 'post',
            data: JSON.stringify(_.assign(update, {id})),
            contentType: "application/json; charset=UTF-8",
            dataType: 'json'
        }).fail((xhr, status, err)=> {
            callback(err);
        }).done((data, status, xhr)=> {
            callback(null, data);
        })
    },

    getAllTodos(callback) {
        $.ajax(BaseUrl + '/todos')
            .fail((xhr, status, err)=>callback(err))
            .done((data, status, xhr)=> {
                callback(null, data);
            })
    }
}