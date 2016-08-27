import React from 'react';

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Form,
    FormField,
    FormInput,
} from 'elemental';

export default class CreateTodoModal extends React.Component {
    state = {
        content: ''
    };

    render() {
        const {isOpen, closeModal} = this.props;
        const {content} = this.state;

        const onContentChange = e=>this.setState({content: e.target.value});

        return <Modal isOpen={isOpen}>
            <ModalHeader text="Create Todo" showCloseButton onClose={closeModal}/>
            <ModalBody>
                <Form>
                    <FormField label="Content">
                        <FormInput autoFocus value={content} onChange={onContentChange}/>
                    </FormField>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="primary" onClick={::this.createTodo}>Create</Button>
                <Button type="link-cancel" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    }

    createTodo() {
        this.props.createTodo(this.state.content);
        this.props.closeModal();
        this.setState({content: ''});
    }
}