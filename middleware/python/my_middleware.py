from tyk.decorators import *
from gateway import TykGateway as tyk

@Pre
def MyPreMiddleware(request, session, spec):
    print("my_middleware: MyPreMiddleware")
    return request, session

@Pre
def AnotherPreMiddleware(request, session, spec):
    print("my_middleware: AnotherPreMiddleware")
    return request, session

@Post
def MyPostMiddleware(request, session, spec):
    print("my_middleware: MyPostMiddleware")
    return request, session

@CustomKeyCheck
def MyAuthCheck(request, session, metadata, spec):
    print("my_middleware.py: MyAuthCheck")
    
    print("test_auth_middleware - Request:", request)
    print("test_auth_middleware - Session:", session)
    print("test_auth_middleware - Spec:", spec)

    valid_token = 'aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d'
    request_token = request.get_header('Authorization')

    print("test_auth_middleware - Request Token:", request_token)

    if request_token == valid_token:
        print("test_auth_middleware: Valid token")
        session.__object__.rate = 1000.0
        session.__object__.per = 1.0
        metadata['token'] = 'mytoken'
    else:
        print("test_auth_middleware: Invalid token")
        request.__object__.return_overrides.response_code = 401
        request.__object__.return_overrides.response_error = 'Not authorized (Python middleware)'

    return request, session, metadata