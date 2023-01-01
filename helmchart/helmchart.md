You can use the files in this directory to easily setup an installation of fails on a kubernetes cluster using the HELM. (Consider it as pre alpha stage, since it is currently only deployed on the development machine)
You need to have prepared a redis and mongo database (database name "fails"), a openshift based object storage for assets (such as user uploaded pictures, pdf etc., make sure to set CORS headers correclty) beforehand.

First step is to create a values.yaml file based on the values.yaml of the helm chart.
There you set the configuration of your LMS, settings for pod orchestration and configure the ingress.

Second step is to create a file for your secret `secrets.yaml` based on `secret.yaml.example` for setting the password for the database, keys for securing JWT tokens and secured URLS.

After this apply the `secrets.yaml` with
```
kubectl apply -f secrets.yaml
```
and install the Helm chart with
```
 helm install fails-components -f values.yaml .\fails-components
```
and you can later upgrade it via:
```
 helm upgrade fails-components -f values.yaml .\fails-components
```
after some setup time handled by the kubernetes cluster, fails should be up and running.
