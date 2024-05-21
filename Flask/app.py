from flask import Flask
from flask_cors import CORS
 
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
    
 
    with app.app_context():
        from routes.api import api
        app.register_blueprint(api)
    return app