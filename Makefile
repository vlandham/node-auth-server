
init:
	eb init -p python2.7 flask-auth-server

create:
	eb create flask-env

open:
	eb open

deploy:
	eb deploy
