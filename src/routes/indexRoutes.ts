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
        //https://www.mercadopago.com.ar/developers/es/docs/checkout-pro/additional-content/test-cards Tarjetas de prueba
        //https://github.com/mercadopago/sdk-nodejs Distro de git hub
        
        this.router.post('/crear-orden', (req, res) => {
            var mercadopago = require('mercadopago')
            mercadopago.configure({
                //Aca va el token del usuario vendedor
                access_token: 'TEST-8966988389876831-071512-2602778a987cd58f778fa08f56e1ae20-1161315572'
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
                notification_url: "https://6adb-190-93-209-128.ngrok.io/notificacion" //URL de la venta
                //Este link se crea con ngrok, npm install ngrok -g, en consola: ngrok http http://localhost:"PORT"
                //Al link, colocarle /notificacion -> Es la ruta que crea la notificacion, y devuelve el json con los datos de la compra.
                //En el json, el atributo data.id es el id de la compra
            }
            mercadopago.preferences.create(preference)
            .then((r: any) => {
                res.json(r)
            })
            .catch((e: any) => {
                console.log(e);
            })
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