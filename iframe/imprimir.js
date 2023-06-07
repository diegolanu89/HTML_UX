document.addEventListener("DOMContentLoaded", function () {
    console.log("[IFRAME]:IMPRIMIR")
    var c = new Comunicator()
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
