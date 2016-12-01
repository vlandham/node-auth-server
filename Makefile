
init:
	eb init --platform node.js --region us-west-2

create:
	eb create node-express-env

open:
	eb open

deploy:
	eb deploy
