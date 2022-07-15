import mercadopago from "mercadopago";
import { Router } from "express";

class IndexClientes{
    public router: Router = Router()

    constructor(){
        this.config()
    }

    config() :void{
        this.router.get('/', (req, res) => res.send("Hola mundo!"))


        //https://www.mercadopago.com.ar/developers/es/reference API de mercado pago
        //https://github.com/mercadopago/sdk-nodejs Distro de git hub

        this.router.post('/crear-orden', (req, res) => {
            var mercadopago = require('mercadopago')
            mercadopago.configure({
                //Aca va el token del usuario vendedor
                access_token: 'APP_USR-5129821629373622-071413-db1cb99002bc6bd42a5fdf67d83bf4f2-1160731623'
            })
            var preference = {
                items: [ //Items en venta
                    {
                        title: 'Pelota',
                        quantity: 1,
                        currency_id: 'ARS',
                        unit_price: 10.5
                    }
                ],
                notificarion_url: "https://c1ec-190-93-209-128.ngrok.io" //URL de la venta
            }
            mercadopago.preferences.create(preference)
            //.then((r) => {
            //    res.json(r)
            //})
            //.catch((e) => {
            //    console.log(e);
            //})
        })

        this.router.post('/notificacion', (req, res) => {
            const datos = req.query

            console.log(datos);

            res.status(200)

        })
    }
}

const clientesRoutes = new IndexClientes()
export default clientesRoutes.router