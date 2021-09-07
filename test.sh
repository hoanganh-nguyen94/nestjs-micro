#!/bin/bash
kind delete cluster --name istio
kind create cluster --name istio --config k8s/kind/kind-config.yaml

export NAMESPACE=tutorial
kubectl create namespace $NAMESPACE

istioctl install --set profile=demo -y
kubectl label namespace default istio-injection=enabled

#kubectl apply -f k8s/ingress-nginx/namespace.yaml
#kubectl label namespace/ingress-nginx istio-injection=enabled
#kubectl apply -f k8s/ingress-nginx/

kubectl apply -f k8s/istio-1.10.2/samples/addons

kubectl apply -f - <<EOF

EOF


kubectl apply -f - <<EOF
kind: Role
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: istio-system-access
  namespace: istio-system
rules:
- apiGroups: ["", "extensions", "apps"]
  resources: ["*"]
  verbs: ["get", "list"]
EOF


kubectl apply -f - <<EOF
apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${NAMESPACE}-user
  namespace: $NAMESPACE
EOF

kubectl apply -f - <<EOF
kind: Role
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: ${NAMESPACE}-access
  namespace: $NAMESPACE
rules:
- apiGroups: ["", "extensions", "apps", "networking.k8s.io", "networking.istio.io", "authentication.istio.io",
              "rbac.istio.io", "config.istio.io", "security.istio.io"]
  resources: ["*"]
  verbs: ["*"]
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: ${NAMESPACE}-access
  namespace: $NAMESPACE
subjects:
- kind: ServiceAccount
  name: ${NAMESPACE}-user
  namespace: $NAMESPACE
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ${NAMESPACE}-access
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1beta1
metadata:
  name: ${NAMESPACE}-istio-system-access
  namespace: istio-system
subjects:
- kind: ServiceAccount
  name: ${NAMESPACE}-user
  namespace: $NAMESPACE
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: istio-system-access
EOF

cat <<EOF > ./${NAMESPACE}-user-config.yaml
apiVersion: v1
kind: Config
preferences: {}

clusters:
- cluster:
    certificate-authority-data: $(kubectl get secret $(kubectl get sa ${NAMESPACE}-user -n $NAMESPACE -o jsonpath={.secrets..name}) -n $NAMESPACE -o jsonpath='{.data.ca\.crt}')
    server: $(kubectl config view -o jsonpath="{.clusters[?(.name==\"$(kubectl config view -o jsonpath="{.contexts[?(.name==\"$(kubectl config current-context)\")].context.cluster}")\")].cluster.server}")
  name: ${NAMESPACE}-cluster

users:
- name: ${NAMESPACE}-user
  user:
    as-user-extra: {}
    client-key-data: $(kubectl get secret $(kubectl get sa ${NAMESPACE}-user -n $NAMESPACE -o jsonpath={.secrets..name}) -n $NAMESPACE -o jsonpath='{.data.ca\.crt}')
    token: $(kubectl get secret $(kubectl get sa ${NAMESPACE}-user -n $NAMESPACE -o jsonpath={.secrets..name}) -n $NAMESPACE -o jsonpath={.data.token} | base64 --decode)

contexts:
- context:
    cluster: ${NAMESPACE}-cluster
    namespace: ${NAMESPACE}
    user: ${NAMESPACE}-user
  name: ${NAMESPACE}

current-context: ${NAMESPACE}
EOF


export KUBECONFIG=$PWD/${NAMESPACE}-user-config.yaml
