
document.addEventListener("DOMContentLoaded", function () {
    console.log("[IFRAME]:BIOMETRICO")
    var c = new Comunicator()
    c.startComunicate()
    c.setfdkEnabled([4,8])
    c.setFunction(()=>console.log('INICIAR LECTURA'),8)
    c.setFunction(()=>window.location.href = 'iframe.html',4)
})
