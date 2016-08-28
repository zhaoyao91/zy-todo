import React from 'react';
import {Row, Col, Button} from 'elemental';
import connect from 'lib/connect-simple-observable';
import AppState from 'states/app';
import PageContainer from 'comps/page-container';
import TodoItem from '../../comps/todo-item';
import R from 'ramda';
import CreateTodoModal from './create-todo-modal';
import UpdateTodoModal from './update-todo-modal';

let Page = class extends React.Component {
    state = {
        openCreateTodoModal: false,
        openUpdateTodoModal: false,
        updatingModalIndex: 0
    };

    render() {
        const {todos} = this.props;
        const {openCreateTodoModal, openUpdateTodoModal, updatingModalIndex} = this.state;

        return <PageContainer>
            <h1>Todos</h1>
            <Button style={{marginBottom: '1em'}} type="primary" onClick={::this.openCreateTodoModal}>Add</Button>
            <Row>
                {
                    todos.map((todo, index)=><Col key={index}>
                        <TodoItem todo={todo} onCheckedChange={this.updateTodoChecked(index)}
                                  onRemove={this.removeTodo(index)} onClickContent={this.openUpdateTodoModal(index)}/>
                    </Col>)
                }
            </Row>
            <CreateTodoModal isOpen={openCreateTodoModal} createTodo={::this.createTodo}
                             closeModal={::this.closeCreateTodoModal}/>
            <UpdateTodoModal isOpen={openUpdateTodoModal} updateTodo={this.updateTodo(updatingModalIndex)}
                             closeModal={::this.closeUpdateTodoModal}
                             content={todos[updatingModalIndex].content}/>
        </PageContainer>
    }

    updateTodoChecked(index) {
        return (checked)=> {
            AppState.todos.update(R.adjust(R.assoc('checked', checked), index, AppState.todos.get()))
        }
    }

    removeTodo(index) {
        return ()=> {
            AppState.todos.update(R.remove(index, 1, AppState.todos.get()));
        }
    };

    createTodo(content) {
        AppState.todos.update(R.prepend({content, checked: false}, AppState.todos.get()));
    }

    openCreateTodoModal() {
        this.setState({openCreateTodoModal: true})
    }

    closeCreateTodoModal() {
        this.setState({openCreateTodoModal: false})
    }

    openUpdateTodoModal(index) {
        return ()=> {
            this.setState({
                openUpdateTodoModal: true,
                updatingModalIndex: index
            })
        }
    }

    closeUpdateTodoModal() {
        this.setState({openUpdateTodoModal: false});
    }

    updateTodo(index) {
        return (content)=> {
            AppState.todos.update(R.adjust(R.assoc('content', content), index, AppState.todos.get()))
        }
    }
};

Page = connect({
    todos: AppState.todos
})(Page);

export default Page