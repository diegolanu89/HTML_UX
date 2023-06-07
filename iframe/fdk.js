
document.addEventListener("DOMContentLoaded", function () {

                    var c = new Comunicator()

                    c.startComunicate()
                    c.setfdkEnabled([3,4,7,8])
                    c.setFunction(()=>window.location.href = 'imprimir.html',3)
                    c.setFunction(()=>window.location.href = 'biometrico.html',7)

                    c.setFunction(()=>c.exitMicrositio(),4)
                    c.setFunction(()=>c.salirATM(),8)
                    
})