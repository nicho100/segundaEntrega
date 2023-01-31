export class ContenedorMemoria{
    constructor(){
        this.elements=[]
        this.id=1
        this.timestamp=new Date().toLocaleString()
    }
    save(object){
        //traer el contenido del archivo y preguntar si tiene algo,si no se pone objet id en 1
        //si hay contenido se recorre y se guarda el id del ultimo y se le suma uno y al objeto.id se le asigna lo guardad
        let idReturn= this.id
        object.timestamp=this.timestamp    
        object.id=this.id
        this.elements.push(object)
        this.id++
        return idReturn
        
    }
    getbyid(number){
        let resultado=null
              let bandera=0
              for(let i = 0;i <this.elements.length;i++){
              if (info[i].id==number){
                resultado = this.elements[i]
                bandera=1
                }} 
              if (bandera===0){
                resultado=null      
              }
              
           return resultado
    }//funciona
    getAll(){
      return this.elements
    }//funciona
    deleteById(number){
         let bandera=-1
        for(let i = 0;i <this.elements.length;i++){
             if (this.elements[i].id===number){
                this.elements.splice(i,1)
                bandera=1
                }
         }if (bandera===-1){
            console.log("el elemento no se encuentra en el array")
            }
    }//funciona
    deleteAll(){
    this.elements=[]
    }//funciona
    update(id,key,newValue){
      
      let elementArray=this.elements
      let upd_obj = elementArray.findIndex((obj => obj.id == id));
      elementArray[upd_obj].key = newValue;
    }
}
