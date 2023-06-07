var c = new Comunicator()

const ticketExample = `    
BIND Banco Industrial


FECHA           HORA        CAJERO       COMP.No
16/05/2022    11:14:17       444        167-10-10
OPERACIÓN DE PRESTAMO INMEDIATO
DE CUENTA NRO.: 3334441

PRESTAMO                 $5000000
PRESTAMO DISPONIBLE      $95000.00


¡GRACIAS POR UTILIZAR EL COBRO EXPRESS!

¿Todavia no probaste la app de BIND  24?
Bajala a tu celular
Conocé más en
b24.bind.com.ar | bind.com.ar`

document.addEventListener("DOMContentLoaded", function () {
    console.log("[IFRAME]:IMPRIMIR")
    c.startComunicate()
    c.setfdkEnabled([4,8])
    c.setFunction(()=>c.startPrint(ticketExample),8)
    c.setFunction(()=>window.location.href = 'iframe.html',4)
    c.setPtrfunction(()=>ptr_begin(),'PTR_BEGIN')
    c.setPtrfunction(()=>ptr_ok(),'PTR_OK')
    c.setPtrfunction(()=>ptr_alert(),'PTR_ALERT')
    c.setPtrfunction(()=>ptr_taken(),'PTR_TAKEN')
})

function ptr_begin(){
    console.log("PTR_begin")
    document.getElementById('block_element').style.display = 'none'
    document.getElementById('modal_print_begin').style.display = 'flex'
}

function ptr_alert(){
    console.log("PTR_alert")
    document.getElementById('modal_print_begin').style.display = 'none'
    document.getElementById('modal_print_alert').style.display = 'flex'
}

function ptr_taken(){
    console.log("PTR_taken")
    document.getElementById('modal_print_alert').style.display = 'none'
    document.getElementById('modal_print_taken').style.display = 'flex'
}

function ptr_ok(){
    console.log("PTR_ok")
    document.getElementById('block_element').style.display = 'block'
    document.getElementById('modal_print_taken').style.display = 'none'
}
