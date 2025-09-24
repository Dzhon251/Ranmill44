const apiGatewayUri = 'https://dev-micro.ejercito.mil.ec';

export const environment = {
  production: false,
  DEV_HOST_BACKEND: apiGatewayUri,
  apiUrlFichaMedica: apiGatewayUri + '/dgth/aspermil/ficha_medica/api',
  apiUrlRequisitosAscenso:
    apiGatewayUri + '/dev/dgth/aspermil/requisitos_ascenso/api',
  apiUrlInhabilidades: apiGatewayUri + '/dev/dgth/aspermil/inhabilidades/api',
  apiUrlCandidatosPromocion:
    apiGatewayUri + '/dev/dgth/aspermil/candidatos_promocion/api',
  apiUrlEvaluacion: apiGatewayUri + '/dev/dgth/aspermil/evaluacion/api',
  apiSiperComun: apiGatewayUri + '/dgth/sipercomun/aspermil',
  apiSiperComunFoto: apiGatewayUri + '/dgth/sipercomun/api/',
  keycloakUri: 'https://qa-sso.ejercito.mil.ec:8443/',
  keycloakClientId: 'dhp_client_front_id',
};
