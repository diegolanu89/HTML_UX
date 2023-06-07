

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



class Comunicator {
  
    constructor() {
      this.fdks=[]
      this.fdkFunction=[]
      this.message=""
      this.ptrFunction={
        PTR_BEGIN:undefined,
        PTR_END:undefined,
        PTR_ALERT:undefined,
        PTR_TAKEN:undefined,
        PTR_OK:undefined,
      }
    }
  
    startComunicate=()=> {
        if (window.addEventListener) window.addEventListener('message', this.displayMessage, false)
        else window.attachEvent('onmessage', this.displayMessage)
    }

    #sendMessages=(obj)=>{
        console.log('MESSAGE OUT: ',JSON.stringify(obj))
        window.parent.postMessage({ type: obj.type, message: obj.message }, '*')
    }

    displayMessage=(evt)=>{
        console.log("MESSAGE IN",JSON.stringify(evt.data))
        this.message = evt.data
        this.#update()
    }

    #update=()=>{
        if (this.message.type == 'fdk' && this.fdks.includes(this.message.message))
            return this.#getfdkFunction(this.message.message)
        if (this.message.type == 'ptr')
            return this.getPtrfunction(this.message.message)
        if (this.message.type == 'bio') return 
    }

    #getfdkFunction=(fdkNumber)=>{
        this.fdkFunction.map((e)=>{
            if (e.n==fdkNumber) e.f()
        })
    }

    setfdkEnabled=(f)=>{
        f.map(e=>this.fdks.push(e))
    }

    getfdkEnabled=()=>{
        return this.fdks
    }

    setDisabledFdk=()=>{
        this.fdks = []
    }

    setFunction=(f,n)=>{
        this.fdkFunction.push({n:n,f:f})
    }

    startPrint=(ticket)=>{
        this.#sendMessages({type:'ptr',message:ticket})
    }

    cancelPrint=(ticket)=>{
        this.#sendMessages({type:'ptr',message:'cancel'})
    }

    exitMicrositio=()=>{
        this.#sendMessages({type:'esc',message:'esc'})
    }

    salirATM=()=>{
        this.#sendMessages({type:'esc',message:'salir'})
    }

    setPtrfunction=(e,v)=>{
        if(['PTR_BEGIN','PTR_END','PTR_ALERT','PTR_TAKEN','PTR_OK'].includes(v))
            this.ptrFunction[v]=e
    }

    getPtrfunction=(v)=>{
        if(['PTR_BEGIN','PTR_END','PTR_ALERT','PTR_TAKEN','PTR_OK'].includes(v))
        if(this.ptrFunction[v]!==undefined)
            return this.ptrFunction[v]()
    }
  
  }






