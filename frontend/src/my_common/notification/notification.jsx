import React, { useState, useEffect } from 'react'
import { connect } from "react-redux";
import { bindActionCreators } from "redux"
import { getCountVencidos } from '../../my_pages/dashboard/dashboardActions'

const  Notification = (props) => {

    var [isRead, setRead] = useState(false);
    var [mensagens, setMensagens] = useState(null);

    useEffect(() => {
        if (!isRead) {
            props.getCountVencidos();
        } else {
            let mensagens = {}
            mensagens.id = 0
            mensagens.color = 'seconday'
            mensagens.message = 'Clientes a vencer em 3 dias'
            mensagens.qtd = props.getCountVencidos
            setMensagens(
                [mensagens]
            )
            setRead(true)
        }
    });

    return (
        <>
            {mensagens}
        </>
    )
}

const mapStateToProps = (state) => ({ totaisVencidos: state.dashboard.totaisVencidos })
const mapDispatchToProps = dispatch => bindActionCreators({ getCountVencidos }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);