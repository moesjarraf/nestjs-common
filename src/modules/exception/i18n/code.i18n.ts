import { HttpStatus } from '@nestjs/common';
import { Locale } from 'locale-enum';
import { ExceptionCodeEnum } from './../enums/code.enum';

// @todo: see if we can make a provider for this that can be globally injected
// so that it can be modified based on the applications needs (extend this as base + add custom errors through injection)
export const ExceptionCodeI18n = {
  // @note: custom error messages
  [ExceptionCodeEnum.InvalidCaptchaResponseGiven]: {
    [Locale.en_GB]: 'Invalid captcha response',
    [Locale.nl_NL]: 'Ongeldige captcha response',
  },

  // @note: default http error messages
  [HttpStatus.CONTINUE]: {
    [Locale.en_GB]: 'Continue',
    [Locale.nl_NL]: 'Doorgaan',
  },
  [HttpStatus.SWITCHING_PROTOCOLS]: {
    [Locale.en_GB]: 'Switching protocols',
    [Locale.nl_NL]: 'Protocolwissel',
  },
  [HttpStatus.PROCESSING]: {
    [Locale.en_GB]: 'Processing',
    [Locale.nl_NL]: 'Processing',
  },
  [HttpStatus.OK]: {
    [Locale.en_GB]: 'Ok',
    [Locale.nl_NL]: 'Ok',
  },
  [HttpStatus.CREATED]: {
    [Locale.en_GB]: 'Created',
    [Locale.nl_NL]: 'Aangemaakt',
  },
  [HttpStatus.ACCEPTED]: {
    [Locale.en_GB]: 'Accepted',
    [Locale.nl_NL]: 'Aanvaard',
  },
  [HttpStatus.NON_AUTHORITATIVE_INFORMATION]: {
    [Locale.en_GB]: 'Non authorative information',
    [Locale.nl_NL]: 'Niet-gemachtigde informatie',
  },
  [HttpStatus.NO_CONTENT]: {
    [Locale.en_GB]: 'No content',
    [Locale.nl_NL]: 'Geen inhoud',
  },
  [HttpStatus.RESET_CONTENT]: {
    [Locale.en_GB]: 'Reset content',
    [Locale.nl_NL]: 'Inhoud opnieuw instellen',
  },
  [HttpStatus.PARTIAL_CONTENT]: {
    [Locale.en_GB]: 'Partial content',
    [Locale.nl_NL]: 'Gedeeltelijke inhoud',
  },
  [HttpStatus.AMBIGUOUS]: {
    [Locale.en_GB]: 'Ambiguous',
    [Locale.nl_NL]: 'Meerkeuze',
  },
  [HttpStatus.MOVED_PERMANENTLY]: {
    [Locale.en_GB]: 'Moved permanently',
    [Locale.nl_NL]: 'Definitief verplaatst',
  },
  [HttpStatus.FOUND]: {
    [Locale.en_GB]: 'Found',
    [Locale.nl_NL]: 'Gevonden',
  },
  [HttpStatus.SEE_OTHER]: {
    [Locale.en_GB]: 'See other',
    [Locale.nl_NL]: 'Zie andere',
  },
  [HttpStatus.NOT_MODIFIED]: {
    [Locale.en_GB]: 'Not modified',
    [Locale.nl_NL]: 'Niet gewijzigd',
  },
  [HttpStatus.TEMPORARY_REDIRECT]: {
    [Locale.en_GB]: 'Temporary redirect',
    [Locale.nl_NL]: 'Tijdelijke omleiding',
  },
  [HttpStatus.PERMANENT_REDIRECT]: {
    [Locale.en_GB]: 'Permanent redirect',
    [Locale.nl_NL]: 'Definitieve omleiding',
  },
  [HttpStatus.BAD_REQUEST]: {
    [Locale.en_GB]: 'Bad request',
    [Locale.nl_NL]: 'Foute aanvraag',
  },
  [HttpStatus.UNAUTHORIZED]: {
    [Locale.en_GB]: 'Unauthorized',
    [Locale.nl_NL]: 'Niet geautoriseerd',
  },
  [HttpStatus.PAYMENT_REQUIRED]: {
    [Locale.en_GB]: 'Payment required',
    [Locale.nl_NL]: 'Betaalde toegang',
  },
  [HttpStatus.FORBIDDEN]: {
    [Locale.en_GB]: 'Forbidden',
    [Locale.nl_NL]: 'Verboden toegang',
  },
  [HttpStatus.NOT_FOUND]: {
    [Locale.en_GB]: 'Not found',
    [Locale.nl_NL]: 'Niet gevonden',
  },
  [HttpStatus.METHOD_NOT_ALLOWED]: {
    [Locale.en_GB]: 'Method not allowed',
    [Locale.nl_NL]: 'Methode niet toegestaan',
  },
  [HttpStatus.NOT_ACCEPTABLE]: {
    [Locale.en_GB]: 'Not acceptable',
    [Locale.nl_NL]: 'Niet aanvaardbaar',
  },
  [HttpStatus.PROXY_AUTHENTICATION_REQUIRED]: {
    [Locale.en_GB]: 'Proxy authentication required',
    [Locale.nl_NL]: 'Authenticatie op de proxyserver verplicht',
  },
  [HttpStatus.REQUEST_TIMEOUT]: {
    [Locale.en_GB]: 'Request timeout',
    [Locale.nl_NL]: 'Aanvraagtijd verstreken',
  },
  [HttpStatus.CONFLICT]: {
    [Locale.en_GB]: 'Conflict',
    [Locale.nl_NL]: 'Conflict',
  },
  [HttpStatus.GONE]: {
    [Locale.en_GB]: 'Gone',
    [Locale.nl_NL]: 'Verdwenen',
  },
  [HttpStatus.LENGTH_REQUIRED]: {
    [Locale.en_GB]: 'Length required',
    [Locale.nl_NL]: 'Lengte benodigd',
  },
  [HttpStatus.PRECONDITION_FAILED]: {
    [Locale.en_GB]: 'Precondition failed',
    [Locale.nl_NL]: 'Niet voldaan aan vooraf gestelde voorwaarde',
  },
  [HttpStatus.PAYLOAD_TOO_LARGE]: {
    [Locale.en_GB]: 'Payload too large',
    [Locale.nl_NL]: 'Aanvraag te groot',
  },
  [HttpStatus.URI_TOO_LONG]: {
    [Locale.en_GB]: 'URI too long',
    [Locale.nl_NL]: 'Aanvraag-URL te lang',
  },
  [HttpStatus.UNSUPPORTED_MEDIA_TYPE]: {
    [Locale.en_GB]: 'Unsupported media type',
    [Locale.nl_NL]: 'Media-type niet ondersteund',
  },
  [HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE]: {
    [Locale.en_GB]: 'Requested range not satisfiable',
    [Locale.nl_NL]: 'Aangevraagd gedeelte niet opvraagbaar',
  },
  [HttpStatus.EXPECTATION_FAILED]: {
    [Locale.en_GB]: 'Expectation failed',
    [Locale.nl_NL]: 'Niet voldaan aan verwachting',
  },
  [HttpStatus.I_AM_A_TEAPOT]: {
    [Locale.en_GB]: 'I am a teapot',
    [Locale.nl_NL]: 'I am a teapot',
  },
  [HttpStatus.UNPROCESSABLE_ENTITY]: {
    [Locale.en_GB]: 'Unprocessable entity',
    [Locale.nl_NL]: 'Aanvraag kan niet verwerkt worden',
  },
  [HttpStatus.FAILED_DEPENDENCY]: {
    [Locale.en_GB]: 'Failed dependency',
    [Locale.nl_NL]: 'Gefaalde afhankelijkheid',
  },
  [HttpStatus.TOO_MANY_REQUESTS]: {
    [Locale.en_GB]: 'Too many requests',
    [Locale.nl_NL]: 'Te veel requests',
  },
  [HttpStatus.INTERNAL_SERVER_ERROR]: {
    [Locale.en_GB]: 'Internal server error',
    [Locale.nl_NL]: 'Interne serverfout',
  },
  [HttpStatus.NOT_IMPLEMENTED]: {
    [Locale.en_GB]: 'Not implemented',
    [Locale.nl_NL]: 'Niet geïmplementeerd',
  },
  [HttpStatus.BAD_GATEWAY]: {
    [Locale.en_GB]: 'Bad gateway',
    [Locale.nl_NL]: 'Bad gateway',
  },
  [HttpStatus.SERVICE_UNAVAILABLE]: {
    [Locale.en_GB]: 'Service unavailable',
    [Locale.nl_NL]: 'Dienst niet beschikbaar',
  },
  [HttpStatus.GATEWAY_TIMEOUT]: {
    [Locale.en_GB]: 'Gateway timeout',
    [Locale.nl_NL]: 'Gateway timeout',
  },
  [HttpStatus.HTTP_VERSION_NOT_SUPPORTED]: {
    [Locale.en_GB]: 'HTTP version not supported',
    [Locale.nl_NL]: 'HTTP-versie wordt niet ondersteund',
  },
};
