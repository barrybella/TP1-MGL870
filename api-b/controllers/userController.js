//var User = require('../models/User');
var User = require('../models/Utilisateur');
require('dotenv').config();
var stripe = require('stripe')
const logger = require('../logger');
//const tracer = trace.getTracer('service-a');
//const { trace } = require('@opentelemetry/api');
const { diag,trace, context,DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api');
const { NodeTracerProvider } = require('@opentelemetry/node');

//stripe.setApiKey(apiKey, secretKey)
const LokiTransport = require('winston-loki');
//diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.INFO);

/*const provider = new NodeTracerProvider();
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
provider.register();*/

//const tracer = provider.getTracer('service-a');


  module.exports.payement = async function(req, res){
    console.log("barry");
    try{


        const paymentIntent = stripe.createPaymentIntent({
            amount: 1000,
            currency: 'USD',
            customer: customerId,
          })
          
          paymentIntent.then(function(response) {
            // The payment has been created successfully.
          })
          
          .catch(function(error) {
            // There was an error processing the payment.
          })

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}

module.exports.allUsers = async function(req, res){

    try{
        let users = await User.find({}).sort({"createdAt": -1});
       
        if(!users){
            return res.status(404).send(new Error('Érror 404 data note found...'));
        }else{
           /* const currentSpan = trace.getSpan(trace.context.active());
            if (currentSpan) {
              const requestId = req.headers['x-request-id'] || 'generated-request-id';
              currentSpan.setAttribute('http.request_id', requestId);
            }*/
            /*const span = tracer.startSpan('incoming_request', {
                attributes: {
                  'http.method': req.method,
                  'http.url': req.url,
                  'service.name': 'service-a',
                  'request.id': req.rid,
                }
              });*/
              const currentSpan = trace.getSpan(context.active());
              if (currentSpan) {
                const traceId = currentSpan.spanContext().traceId;
                console.log(`Trace ID: ${traceId}`); // Add traceId to your logging system
              }
            
            logger.info('Request received', {
                service: 'services-b',
                timestamp: new Date().toISOString(),
                level: 'infos',
                requestId: req.rid,
                method: req.method,
                url: req.url,
                statusCode: res.statusCode
               
              });
              
           
            return res.status(200).json(users);
        }

    }catch(err){
        return res.status(500).send(new Error('Erreur 500...'));
    }
}
