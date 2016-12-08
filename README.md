
# Node Auth Server

Very simple server that provides basic auth and proxying of connection to S3 hosted site.

## Configuration

Usernames and passwords are managed in `data/users.htpasswd`.

One way to create new users would be a [htpasswd generator tool](http://www.htaccesstools.com/htpasswd-generator/).

Proxy base URL is managed in `config.js`.


## Deployment

Auth Server can be deployed to Elastic Beanstalk (EB). This requires the [EB Command Line tool](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3.html), which can be installed via `pip`:

```
pip install awsebcli
```

An initial EB environment can be setup using:

```
eb init --platform node.js --region us-west-2 node-auth-server
```

**Note:** this only needs to be done **once** for a particular deployment of this tool.

Once this is setup, any changes to the tool can be deployed using:

```
npm run deploy
```

Which in turn just runs the `deploy` command for the `eb` tool:

```
eb deploy
```

This will deploy the latest version of the code that has been checked into git.
So to deploy new changes, ensure they have been checked in!

## Development

### Setup

Clone repo, then install dependencies via:

```
npm install
```

### Running Locally

Run locally via:

```
npm start
```

Should be accessible at: http://localhost:3000/
