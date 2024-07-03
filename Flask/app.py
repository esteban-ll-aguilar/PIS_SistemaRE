from flask import Flask
from flask_cors import CORS
from flask_mail import Mail, Message

class MAIL:
    
    def __init__(self):
        self.__app = create_app()
    def send_email(self,subject, recipient, body):
        app = self.__app
        try:
            mail = Mail(app)
            msg = Message(subject, sender=app.config['MAIL_USERNAME'], recipients=[recipient])
            msg.body = body
            with app.app_context():
                mail.send(msg)
            print(f'Email sent to {recipient}')
            return True
        except:
            return False
        
    
def create_app():
        app = Flask(__name__, instance_relative_config=False)
        #application/json
        CORS(app)
        cors = CORS(app, resources={
            r"/*": {
                "origins": "*"
                }
            })
        app.config.from_object('config.config.Config')
        app.config['MAIL_SERVER'] = 'smtp.gmail.com'
        app.config['MAIL_PORT'] = 587
        app.config['MAIL_USERNAME'] = "foranix2023@gmail.com"
        app.config['MAIL_PASSWORD'] = "juao tqdz ykpj kqat"
        app.config['MAIL_USE_TLS'] = True
        #app.config['MAIL_USE_SSL'] = False
        
        with app.app_context():
            from routes.api import api
            app.register_blueprint(api)
        return app