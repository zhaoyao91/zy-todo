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

export default class UpdateTodoModal extends React.Component {
    static propTypes = {
        content: React.PropTypes.string,
        isOpen: React.PropTypes.bool,
        closeModal: React.PropTypes.func,

        // func(content)
        updateTodo: React.PropTypes.func,
    };

    state = {
        content: this.props.content
    };

    componentWillReceiveProps(nextProps) {
        if (!this.props.isOpen && nextProps.isOpen) {
            this.setState({content: nextProps.content})
        }
    }

    render() {
        const {isOpen, closeModal} = this.props;
        const {content} = this.state;

        const onContentChange = e=>this.setState({content: e.target.value});

        return <Modal isOpen={isOpen}>
            <ModalHeader text="Update Todo" showCloseButton onClose={closeModal}/>
            <ModalBody>
                <Form>
                    <FormField label="Content">
                        <FormInput autoFocus value={content} onChange={onContentChange}/>
                    </FormField>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button type="primary" onClick={::this.updateTodo}>Update</Button>
                <Button type="link-cancel" onClick={closeModal}>Cancel</Button>
            </ModalFooter>
        </Modal>
    }

    updateTodo() {
        this.props.updateTodo(this.state.content);
        this.props.closeModal();
        this.setState({content: ''});
    }
}