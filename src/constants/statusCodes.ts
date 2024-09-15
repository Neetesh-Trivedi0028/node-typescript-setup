//All StatusCodes Will be Imported from here
export const statusCodes = {
    //100
    Continue:100 ,
    SwitchingProtocols:101,
    EarlyHints:103,
 
    //200
    Ok:200,
    Created:201,
    Accepted:202,
    NonAuthoritativeInformation:203,
    NoContent:204,
    ResetContent:205,
    PartialContent:206,
 
    //300
    MultipleChoices:300,
    MovedPermanently:301,
    Found:302,
    SeeOther:303,
    NotModified:304,
    TemporaryRedirect:307,
    PermanentRedirect:308,
 
    //400
    BadRequest:400,
    Unauthorized:401,
    PaymentRequired:402,
    Forbidden:403,
    NotFound:404,
    MethodNotAllowed:405,
    NotAcceptable:406,
    ProxyAuthenticationRequired:407,
    RequestTimeout:408,
    Conflict:409,
    Gone:410,
    LengthRequired:411,
    PreconditionFailed:412,
    RequestTooLarge:413,
    RequestURITooLong:414,
    UnsupportedMediaType:415,
    RangeNotSatisfiable:416,
    ExpectationFailed:417,
 
    //500
    InternalServerError:500,
    NotImplemented:501,
    BadGateway:502,
    ServiceUnavailable:503,
    GatewayTimeout:504,
    HttpVersionNotSupported:505,
    NetworkAuthenticationRequired:511,
 
}