import React from 'react';
import {Row, Col, Button} from 'elemental';
import connect from 'lib/connect-simple-observable';
import AppState from 'states/app';
import PageContainer from 'comps/page-container';
import TodoItem from '../../comps/todo-item';
import R from 'ramda';
import CreateTodoModal from './create-todo-modal';
import UpdateTodoModal from './update-todo-modal';
import TodosService from 'services/todos';
import _ from 'lodash';

let Page = class extends React.Component {
    state = {
        openCreateTodoModal: false,
        openUpdateTodoModal: false,
        updatingTodoId: undefined
    };

    componentWillMount() {
        // fetch data
        TodosService.getAllTodos((err, todos)=> {
            if (err) console.error(err);
            else AppState.todos.update(todos);
        })
    }

    render() {
        const {todos} = this.props;
        const {openCreateTodoModal, openUpdateTodoModal, updatingTodoId} = this.state;

        const updatingTodo = R.find(R.propEq('_id', updatingTodoId), todos);

        return <PageContainer>
            <h1>Todos</h1>
            <Button style={{marginBottom: '1em'}} type="primary" onClick={::this.openCreateTodoModal}>Add</Button>
            <Row>
                {
                    todos.map((todo, index)=><Col key={index}>
                        <TodoItem todo={todo} onCheckedChange={this.updateTodoChecked(todo._id)}
                                  onRemove={this.removeTodo(todo._id)}
                                  onClickContent={this.openUpdateTodoModal(todo._id)}/>
                    </Col>)
                }
            </Row>
            <CreateTodoModal isOpen={openCreateTodoModal} createTodo={::this.createTodo}
                             closeModal={::this.closeCreateTodoModal}/>
            <UpdateTodoModal isOpen={openUpdateTodoModal} updateTodo={this.updateTodo(updatingTodoId)}
                             closeModal={::this.closeUpdateTodoModal}
                             content={_.get(updatingTodo, `content`, '')}/>
        </PageContainer>
    }

    updateTodoChecked(id) {
        return (checked)=> {
            TodosService.updateTodo(id, {checked}, (err, updatedCount)=> {
                if (err) console.error(err);
                else AppState.todos.update(R.map(todo=>todo._id === id ? R.assoc('checked', checked, todo) : todo, AppState.todos.get()))
            })
        }
    }

    removeTodo(id) {
        return ()=> {
            TodosService.removeTodo(id, (err, removedCount)=> {
                if (err) console.error(err);
                else AppState.todos.update(R.reject(todo=>todo._id === id, AppState.todos.get()))
            });
        }
    };

    createTodo(content) {
        TodosService.createTodo({content: content}, (err, newTodo)=> {
            if (err) console.error(err);
            else AppState.todos.update(R.prepend(newTodo, AppState.todos.get()));
        });

    }

    openCreateTodoModal() {
        this.setState({openCreateTodoModal: true})
    }

    closeCreateTodoModal() {
        this.setState({openCreateTodoModal: false})
    }

    openUpdateTodoModal(id) {
        return ()=> {
            this.setState({
                openUpdateTodoModal: true,
                updatingTodoId: id
            })
        }
    }

    closeUpdateTodoModal() {
        this.setState({openUpdateTodoModal: false});
    }

    updateTodo(id) {
        return (content)=> {
            TodosService.updateTodo(id, {content}, (err, updatedCount)=> {
                if (err) console.error(err);
                else AppState.todos.update(R.map(todo=>todo._id === id ? R.assoc('content', content, todo) : todo, AppState.todos.get()))
            })
        }
    }
};

Page = connect({
    todos: AppState.todos
})(Page);

export default Page