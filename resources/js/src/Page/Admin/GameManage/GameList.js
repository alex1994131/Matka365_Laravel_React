
import React, { useEffect, useState } from 'react';
import Config from '../../../../config' ;

import BlockUi from 'react-block-ui';
import { Loader} from 'react-loaders';
import ATable from '../../../Component/ATable';
import api from '../../../../api/admin/game_manage' ;
import CModal from '../../../Component/CModal' ;
import Common from '../../../Utils/Common' ;
import { Form, Button } from 'react-bootstrap';
import TimePicker from 'react-time-picker';

function GameList(props) {
    const [game_list, setGameList] = useState([]) ;
    const [blocking, setBlocking] = useState(false) ;
    const [edit_model, setEditModal] = useState(false) ;
    const [edit_form, setEditForm] = useState({game_name:'', open_time:'00:00', close_time:'00:00', status:'N'}) ;
    const [edit_id, setEditId] = useState(-1) ;

    useEffect(() => {
        getGameList() ;
        return ;
    }, 1);

    const getGameList = () => {
        setBlocking(true) ;
        try {
            api.getGameList().then(result => {
                setGameList(result) ;
            }) ;
            setBlocking(false) ;
        }catch(e) {
            setBlocking(false) ;
        }
    }
    const saveEditGame = () => {    
        setBlocking(true) ;
        try {
            api.saveEditGame({edit_id: edit_id, edit_form: edit_form}).then(result => {
                if(result.status == "200") {
                    getGameList();
                    Common.toast("success", "Add Successfully") ;
                } else {
                }
            }) ;
            setBlocking(false) ;
        }catch(e) {
            setBlocking(false) ;
        }
    }

    const validateAddUserForm = (e) => {
      
        if(e == null) {
            return ;
        }

        try{
            const nextFormState = {
                ...edit_form,
                [e.target.name]: e.target.value,
            };
            
            setEditForm(nextFormState) ;
        }catch(e) {
            console.log(e) ;
        }
    }

    const validateTime = (value, name) => {
        
        const nextFormState = {
            ...edit_form,
            [name]: value,
        };
        setEditForm(nextFormState) ;
        
    }
    const openEditModal = (id) => {
        setEditId(id) ;
        if(id == -1){
            setEditForm({game_name:'', open_time:'00:00', close_time:'00:00', status:'N'}) ;
        } else {
            for(var k = 0 ; k < game_list.length ; k++) {
                let item = game_list[k] ;
                if(game_list[k].id == id) {
                    setEditForm({
                        game_name: item.name,
                        open_time: item.open_time,
                        close_time: item.close_time,
                        status: item.status
                    }) ;
                    
                    break ;
                }
            }
        }

        let _edit_model = edit_model ;
        setEditModal(!_edit_model) ;
    }
    const deleteGame = ( id ) => {
        setBlocking(true) ;
        try {
            api.deleteGame({id: id}).then(result => {
                if(result.status == "200") {
                    getGameList();
                    Common.toast("success", "Delete Successfully") ;
                } else {
                    Common.toast("error", "Delete Failed") ;
                }
            }) ;
            setBlocking(false) ;
        }catch(e) {
            setBlocking(false) ;
            console.log(e) ;
            Common.toast("error", "Delete Failed") ;
        }
    }
    const makeDataTableColums = () => {
        let columns = [] ;
        columns = [
            {
                name: 'No',
                selector: 'no',
                sortable: true,
            },
            {
                name: 'Game Name',
                selector: 'game_name',
                sortable: true,
            },
            {
                name: 'Open Time',
                selector: 'open_time',
                sortable: true,
            },
            {
                name: 'Close Time',
                selector: 'close_time',
                sortable: true,
            },
            {
                name: 'Days',
                selector: 'days',
                sortable: true,
            },
            {
                name: 'Status',
                selector: 'status',
                sortable: true,
            },
            {
                name: 'Action',
                selector: 'action1',
                sortable: false,
            },
            {
                name: 'Action2',
                selector: 'action2',
                sortable: false,
            },
        ]
        return columns ;
    }
    const makeDataTableForm = (data) => {
        let ret = [] ; 
        for(var k = 0 ; k < data.length; k++) {
            let item = data[k] ;
            ret.push({
                no: (k+1),
                open_time: item.open_time,
                close_time: item.close_time,
                game_name: item.name,
                status: item.status,
                days:'',
                action1: <div 
                    style={{padding: '5px'}}>
                        <button 
                        className='btn btn-primary' onClick={() => openEditModal(item.id)}>Edit</button>
                    </div>,
                action2: <div style={{padding: '5px'}}
                >
                    <button className='btn btn-danger'  onClick={() => deleteGame(item.id)}>Delete</button>
                </div>
            })
        }
        return ret ;
    }

    
    const columns = makeDataTableColums() ;
    const get_data_table = makeDataTableForm(game_list) ;

    console.log(edit_form) ;
    return (
        <div>
            <div>
                <button 
                    type='button' 
                    className='btn btn-primary'
                    onClick={() => openEditModal(-1)}
                >
                    <i className='fa fa-plus'></i>Add New Game
                </button>
            </div>

            <BlockUi tag="div" blocking={blocking}  loader={<Loader active type={Config.blockingType} color={Config.blockingColor} />}>
                <ATable columns={columns} data={get_data_table} />
            </BlockUi>
            <CModal 
                open_modal = {edit_model} 
                close_modal = {openEditModal}
                title = "Add New Game"
            >
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Enter Game Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            placeholder="" 
                            name='game_name'
                            onChange={(event)=>validateAddUserForm(event)}
                            value={edit_form.game_name}
                        />
                    </Form.Group>
                    <Form.Group controlId="formBasictime">
                        <Form.Label>OepnTime</Form.Label>
                        <div style={{marginTop: '10px'}}>
                            <TimePicker 
                                value={edit_form.open_time}
                                type="number" 
                                name='open_time'
                                onChange={(value)=>validateTime(value, 'open_time')} 
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formBasictime">
                        <Form.Label>CloseTime</Form.Label>
                        <div style={{marginTop: '10px'}}>
                            <TimePicker 
                                type="number" 
                                name='close_time'
                                onChange={(value)=>validateTime(value, 'close_time')} 
                                value={edit_form.close_time}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formBasictime">
                        <Form.Label>Does market have special timings ?</Form.Label>
                        <select className='form-control' value={edit_form.status} onChange={(event)=>validateAddUserForm(event)} name='status'>
                            <option>
                                Y
                            </option>
                            <option >
                                N
                            </option>
                        </select>
                    </Form.Group>
                    <div align='right'>
                        <button className='btn-primary' type='button' onClick={saveEditGame}>Submit</button>
                        <button className='btn-danger' type='button' onClick={openEditModal}>Close</button>
                    </div>
                </Form>
            </CModal>
        </div>
    )
} 

export default GameList ; 