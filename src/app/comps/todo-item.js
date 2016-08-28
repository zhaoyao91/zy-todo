import React from 'react';
import {Card, Button} from 'elemental';

export default ({todo, onCheckedChange, onRemove, onClickContent})=><Card>
    <div style={{display: 'flex'}}>
        <input style={{flexShrink: 0, marginTop: '0.3em'}} type="checkbox" checked={todo.checked} onChange={e=>onCheckedChange(e.target.checked)}/>
        <p style={{flexGrow: 1, margin: '0 0.5em'}} onClick={onClickContent}>{todo.content}</p>
        <Button style={{flexShrink: 0}} type="danger" onClick={onRemove}>Remove</Button>
    </div>
</Card>