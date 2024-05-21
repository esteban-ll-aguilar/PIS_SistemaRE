from os import environ, path
from dotenv import load_dotenv

base_dir = path.abspath(path.dirname('__file__'))
load_dotenv(path.join(base_dir, 'config/.env'))

class Config:
    FLASK_APP = environ.get('FLASK_APP')
    FLASK_ENV = environ.get('FLASK_ENV')
    #SECRET_KEY = environ.get('SECRET_KEY')