const { NodeSDK } = require('@opentelemetry/sdk-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { JaegerExporter } = require('@opentelemetry/exporter-jaeger');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');
const { Resource } = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const serviceName = 'service-b';
module.exports = (serviceName) => {
const sdk = new NodeSDK({
    resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName, // Nom du service
    }),
  traceExporter: new JaegerExporter({
    serviceName: 'service-b', // Remplacez par le nom de votre service
    endpoint: 'http://jaeger:14268/api/traces', // Assurez-vous que le service Jaeger est accessible
  }),
  instrumentations: [
    new HttpInstrumentation(),
    new ExpressInstrumentation(),
  ],
});

// Utilisation de sdk.start() de manière synchrone
(async () => {
  try {
    await sdk.start(); // Utilisation correcte d'await
    console.log('OpenTelemetry initialized');
  } catch (error) {
    console.error('Error initializing OpenTelemetry', error);
  }
})();
};
