import React from 'react'
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import { formatarFromJsonDiaMesAno } from '../../my_common/DateUtil'

export default props => {
    const {cliente} =  {...props}
    const telefone = cliente.telefone ? cliente.telefone : ''
    const nomePlano = cliente.plano ? cliente.plano.nome : ''
    const valorPlano = cliente.plano ? cliente.plano.valor : ''

    let msg = `https://api.whatsapp.com/send?phone=55${telefone}` +
        `&text=Olá, %0D%0A*Segue seu vencimento IPTV* %0D%0A*Vencimento:* _` +
        `${formatarFromJsonDiaMesAno(cliente.vencimento)}` +
        `_ %0D%0A %0D%0A*PLANO CONTRATADO* %0D%0A⭕ _Plano:_ *${nomePlano}` +
        `* %0D%0A⭕ _Valor:_ *R$ ${valorPlano}` +
        `* %0D%0A %0D%0A*FORMAS DE PAGAMENTOS* %0D%0A✅ Pic Pay : @canutobr%0D%0A✅ Banco do Brasil: ag 3020-1 cc 45746-9%0D%0A✅ _Caixa Econômica: ag 1282 cc 20050-1 op001 - Antonio Denilson CanutoCPF 02609978979_%0D%0A✅  _Mercado Pago: http://mpago.la/AGl5_ %0D%0A %0D%0A- Duração da lista 30 dias, acesso de um ponto, não permite conexões simultâneas. %0D%0A %0D%0A- Assim que efetuar a compra, enviar o comprovante e vou liberar sua lista o mais rápido que for possível.%0D%0A %0D%0A- Se eu estiver online gero a conta na hora %0D%0A %0D%0A*Aguardamos seu contato para renovação!*`
    return (
        <a href={`${msg}`}  target='blank'>
            <WhatsAppIcon />
        </a >
    )
}