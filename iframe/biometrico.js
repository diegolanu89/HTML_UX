var c = new Comunicator()

document.addEventListener("DOMContentLoaded", function () {
    console.log("[IFRAME]:BIOMETRICO")
    c.startComunicate()
    c.setfdkEnabled([4,8])
    c.setFunction(()=>c.readBiometric(),8)
    c.setFunction(()=>window.location.href = 'iframe.html',4)
    c.setBiofunction(()=>bio_begin(),'START')
    c.setBiofunction(()=>bio_result(),'RESULT')
    c.setBiofunction(()=>bio_ok(),'OK')
})

function start(){
    c.readBiometric()
}

function bio_begin(){
    console.log("BIO_begin")
    document.getElementById('block_element').style.display = 'none'
    document.getElementById('modal_bio_begin').style.display = 'flex'
}

function bio_result(r){
    console.log("BIO_result:",r)
    document.getElementById('modal_bio_begin').style.display = 'none'
    document.getElementById('modal_bio_result').style.display = 'flex'
}

function bio_ok(){
    console.log("BIO_ok")
    document.getElementById('block_element').style.display = 'block'
    document.getElementById('modal_bio_result').style.display = 'none'
}