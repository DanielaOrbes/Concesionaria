const autos = require('./autos');
const personas = require('./personas');


const concesionaria = {
    autos,
    buscarAuto : (patente) => {
        let resultado = autos.find(auto => auto.patente === patente)
         if (!resultado){
            return console.log('No hay resultados');
         }
        return console.log(resultado);
    },
    venderAuto : (patente) => {
        let autosModificado = autos.map(auto =>{
            if(auto.patente === patente){
                auto.vendido = true
                return auto
            }else{
                return auto
            }
        })
        return autosModificado;
    },
    autosParaLaVenta : () =>{
        let resultado = autos.filter(auto => auto.vendido === false)
        return resultado
    },
    autosNuevos : function () {
        let autosParaLaVenta = this.autosParaLaVenta();
        let autos0KM = autosParaLaVenta.filter(auto => auto.km <= 100);
        return autos0KM;        
    },
    listaDeVentas : () => {
        let autosvendidos = autos.filter(auto => auto.vendido === true)
        let precios = autosvendidos.map(auto => {
            if (auto.vendido ===true){
                return auto.precio
            }
        })
        return precios;
    },
    totalDeVentas : function () {
        if (this.listaDeVentas().length === 0){
            return 0
        }
        let total = this.listaDeVentas().reduce((acum,num) => acum + num)
        return total
    },
    puedeComprar : (auto,persona) => {
        let valorCuota = auto.precio / auto.cuotas;
        if(persona.capacidadDePagoEnCuotas >= valorCuota && auto.precio <= persona.capacidadDePagoTotal){
            return true
        }
        return false
    },
    autosQuePuedeComprar : function (persona){
        let autosParaLaVenta = this.autosParaLaVenta();
        let autosQuePuedeComprar = autosParaLaVenta.filter(auto => {
            return this.puedeComprar(auto,persona)
        })
        return autosQuePuedeComprar
    }

};

concesionaria.venderAuto('JJK116');