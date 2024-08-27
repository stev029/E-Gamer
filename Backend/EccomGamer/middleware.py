from uuid import uuid4


class AutoSetCookieMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        cookie_name = 'pidx_session_id'

        response = self.get_response(request)

        if cookie_name not in request.COOKIES:
            session_id = self.generate_session_id()
            print(f"Setting cookie to {session_id}")
            response.set_cookie(cookie_name, session_id, max_age=3600, httponly=True)

        return response

    def generate_session_id(self):
        # Implementasi untuk membuat session ID unik
        return uuid4()
