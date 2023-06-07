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
      this.bioFunction={
        CANCEL:undefined,
        ERROR:undefined,
        OK:undefined,
        RESULT:undefined,
        START:undefined,
      }
    }

    /**
	 *startComunicate init the comunication betwen parent web and this one if it's used like iframe component.
	 */
    startComunicate=()=> {
        try{
            if (window.addEventListener) window.addEventListener('message', this.displayMessage, false)
            else window.attachEvent('onmessage', this.displayMessage)
        }catch{
            console.error("[ERROR] Problem to stablish iframe conection.")
        }
        
    }

    #sendMessages=(obj)=>{
        try{
            console.log('MESSAGE OUT: ',JSON.stringify(obj))
            window.parent.postMessage({ type: obj.type, message: obj.message }, '*')
        }catch{
            console.error("[ERROR] Problem to send message to parent.")
        }
    }

    /**
	 *
	 */
    displayMessage=(evt)=>{
        try{
            console.log("MESSAGE IN",JSON.stringify(evt.data))
            this.message = evt.data
            this.#update()
        }catch(e){
            console.log("[ERROR] Problem with process of message incoming.")
            if(e!==undefined)console.error(e)
        }
        
    }

    /**
	 *
	 */
    #update=()=>{
        if (this.message.type == 'fdk' && this.fdks.includes(this.message.message))
            return this.getfdkFunction(this.message.message)
        if (this.message.type == 'ptr')
            return this.#getPtrfunction(this.message.message)
        if (this.message.type == 'bio') 
            return this.#getBiofunction(this.message.message,undefined)
        if (this.message.type == 'bio_result') 
            return this.#getBiofunction('RESULT',this.message.message)
        throw 'Error update the info of iframe.'
            
    }
    /**
	 *
	 */
    getfdkFunction=(fdkNumber)=>{
        try{
            if(!this.getfdkEnabled().includes(fdkNumber))throw '[ERROR]:FDK is not enabled.'
            this.fdkFunction.map((e)=>{
                if (e.n==fdkNumber) return e.f()
            })
        }catch(e){
            console.error(e)
        }
        
    }
    /**
	 *setfdkEnabled set as available the fdk buttons events. 
     *Received Input array with values 1 to 8 to set the specific fdk as availables.
	 */
    setfdkEnabled=(f)=>{
        try{
            if(!Array.isArray(f)) throw "[ERROR] The argument has to be an Array."
            if(f.length>8)throw "[ERROR]:fdk button limit exceeded.";
            var newfdks = []
            f.map(e=>{
                if(![1,2,3,4,5,6,7,8].includes(e))throw "[ERROR]:Available button has to be 1 to 8 interger in the array."; 
                if(this.getfdkEnabled().includes(e)) throw "[ERROR]:One or more fdk were seted available before."
                newfdks.push(e)
            })
            newfdks.map(e=>this.fdks.push(e))
            this.fdks = this.fdks.sort((a,b)=>a-b)
        }catch(e){
            console.error(e)
        }
    }

    /**
	 *getfdkEnabled get the fdks who have been set availables.
	 */
    getfdkEnabled=()=>{
        return this.fdks
    }
    /**
	 *setDisabledFdk set as unavailable the fdk buttons events. 
     *Received Input array with values 1 to 8 to set the specific fdk as unavailable.
	 */
    setDisabledFdk=(v)=>{
        try{
            if(!Array.isArray(v)) throw "[ERROR] The argument has to be an Array."
            if(v.length>8) throw "[ERROR]:fdk button limit exceeded.";
            v.map(e=>{
                if(![1,2,3,4,5,6,7,8].includes(e))throw "[ERROR]:Disabled button has to be 1 to 8 in the array."; 
                if(!this.getfdkEnabled().includes(e)) throw "[ERROR]:One or more fdk were seted disabled before."
            })
            var newSet = []
            this.fdks.map(e=>{if(!v.includes(e))newSet.push(e)})
            this.fdks = newSet
        }catch(e){
            console.error(e)
        }
       
    }
    /**
	 *setFunction Asign a Function to an specific fdk button if this one was enabled. 
     *It Receives 2 arguments (function, integer)
	 */
    setFunction=(f,n)=>{
        try{
            if (typeof f !== 'function')throw '[ERROR]:The first argument has to be a function.'
            if(!Number.isInteger(n))throw '[ERROR]:The second argument have to be an Integer'
            if(![1,2,3,4,5,6,7,8].includes(n))throw "[ERROR]:The second argument has to be and integer 1 to 8";
            if(!this.getfdkEnabled().includes(n)) throw '[ERROR]:The second argument for fdk is not Enabled.'
            this.fdkFunction.map((e)=>{if (e.n==n) throw '[ERROR]:A function was asignated already to this fdk who is enable.'})
            this.fdkFunction.push({n:n,f:f})
            this.fdkFunction = this.fdkFunction.sort((a,b)=>a.n-b.n)
        }catch(e){
            console.error(e)
        }
    }
    /**
	 *updateFunction reasign a Function to an specific fdk button if this one was enabled. 
     *It Receives 2 arguments (function, integer)
	 */
    updateFunction=(f,n)=>{
        try{
            if (typeof f !== 'function')throw '[ERROR]:The first argument has to be a function.'
            if(!Number.isInteger(n))throw '[ERROR]:The second argument have to be an Integer'
            if(![1,2,3,4,5,6,7,8].includes(n))throw "[ERROR]:The second argument has to be and integer 1 to 8";
            if(!this.getfdkEnabled().includes(n)) throw '[ERROR]:The second argument for fdk is not Enabled.'
            var newFunctions = []
            if(!this.fdkFunction.find((e)=>e.n == n))throw "[ERROR]:The function for fdk doesn't exist."
            this.fdkFunction.map((e)=>{
                if (!e.n==n) newFunctions.push(e)
                if (e.n == n) newFunctions.push({n:n,f:f})
            })
            this.fdkFunction = newFunctions.sort((a,b)=>a.n-b.n)
        }catch(e){
            console.error(e)
        }
    }
    /**
	 *startPrint Start a print of argument using the printer controller of parent web. 
     *It Receives 1 arguments (string literal)
	 */
    startPrint=(ticket)=>{
        try{
            this.#sendMessages({type:'ptr',message:ticket})
        }catch(e){
            console.error(e)
        }
    }
    /**
	 *cancelPrint Cancel the print of argument using the printer controller of parent web. 
     *It Receives 2 arguments (function, integer)
	 */
    cancelPrint=()=>{
        try{
            this.#sendMessages({type:'ptr',message:'cancel'})
        }catch(e){
            console.error(e)
        }
    }
    /**
	 *setPtrfunction set a specific function for every event after init a print. 
     *It Receives 2 arguments (function, string event)
     *Posible String Events: 'PTR_BEGIN','PTR_END','PTR_ALERT','PTR_TAKEN' or 'PTR_OK'
	 */
    setPtrfunction=(e,v)=>{
        try{

        }catch(e){
            console.error(e)
        }
        if(['PTR_BEGIN','PTR_END','PTR_ALERT','PTR_TAKEN','PTR_OK'].includes(v))
            this.ptrFunction[v]=e
    }
    #getPtrfunction=(v)=>{
        if(['PTR_BEGIN','PTR_END','PTR_ALERT','PTR_TAKEN','PTR_OK'].includes(v))
        if(this.ptrFunction[v]!==undefined)
            return this.ptrFunction[v]()
    }

    readBiometric=()=>{
        this.#sendMessages({type:'bio',message:'readBiometric'})
        return this.bioFunction['START']()
    }
    stopBiometric=()=>{
        return this.#sendMessages({type:'bio',message:'stopBiometric'})
    }
    setBiofunction=(e,v)=>{
        if(['CANCEL','ERROR','OK','RESULT','START'].includes(v))
            this.bioFunction[v]=e
    }
    #getBiofunction=(v,r)=>{
        if(['CANCEL','ERROR','OK','RESULT','START'].includes(v))
        if(this.bioFunction[v]!==undefined){
            if(r!==undefined){
                return this.bioFunction[v](r)
            }
            return this.bioFunction[v]()
        }  
    }

    exitMicrositio=()=>{
        this.#sendMessages({type:'esc',message:'esc'})
    }

    salirATM=()=>{
        this.#sendMessages({type:'esc',message:'salir'})
    }
  
  }






