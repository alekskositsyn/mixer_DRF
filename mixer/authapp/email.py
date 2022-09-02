from djoser import email
from djoser import utils
from djoser.conf import settings
from mixer.settings import DOMAIN_FRONT
from django.contrib.auth.tokens import default_token_generator


class ActivationEmail(email.ActivationEmail):
    template_name = 'authapp/ActivationEmail.html'

    def get_context_data(self):
        # ActivationEmail can be deleted
        context = super().get_context_data()

        user = context.get("user")
        context["site_name"] = "MIXER"
        context["uid"] = utils.encode_uid(user.pk)
        context["token"] = default_token_generator.make_token(user)
        context["url"] = settings.ACTIVATION_URL.format(**context)
        context["domain_front"] = DOMAIN_FRONT

        return context


class ConfirmationEmail(email.ConfirmationEmail):
    template_name = 'authapp/ConfirmationEmail.html'