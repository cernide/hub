export const VALUES = `
namespace: "polyaxon"

rbac:
  enabled: true
ingress:
  enabled: true
  tls:
    enabled: false
    hosts:
    - chart-example.local
    secretName: ""
  annotations:
    kubernetes.io/ingress.class: polyaxon-ingress
    ingress.kubernetes.io/ssl-redirect: "false"
    ingress.kubernetes.io/rewrite-target: /
    ingress.kubernetes.io/add-base-url: "true"
    ingress.kubernetes.io/proxy-connect-timeout: "600"
    ingress.kubernetes.io/proxy-read-timeout: "600"
    ingress.kubernetes.io/proxy-send-timeout: "600"
    ingress.kubernetes.io/send-timeout: "600"
    ingress.kubernetes.io/proxy-body-size: 4G
  resources:
    limits:
      cpu: 10m
      memory: 20Mi
    requests:
      cpu: 10m
      memory: 20Mi
# If you enable ingress, please set this value to ClusterIP or NodePort
# Otherwise you should set it to LoadBalancer
serviceType: ClusterIP
limitResources: false

# Initial admin user to create
user:
  username: "root"
  email: "root@polyaxon.local"
  password: "rootpassword"

# Time zone
timeZone: 'UTC'

dirs:
  nvidia:
    lib: ""  # e.g. "/usr/lib/nvidia-384"
    bin: ""  # e.g. "/usr/lib/nvidia-384/bin"
    libcuda: ""  # e.g. "/usr/lib/x86_64-linux-gnu/libcuda.so.1"
  docker: "/var/run/docker.sock"

secretRefs:  # e.g. ['secret1', 'secret2', ...]
configmapRefs:  # e.g. ['cm1', 'cm2', ...]

# This is where we mount nvidia on hosts
mountPaths:
  nvidia:
    lib: ""
    bin: ""
    libcuda: ""
  docker: "/var/run/docker.sock"

persistence:
  logs:
    existingClaim:
    mountPath: "/logs"
    hostPath: "/logs"
  repos:
    existingClaim:
    mountPath: "/repos"
    hostPath: "/repos"
  upload:
    existingClaim:
    mountPath: "/upload"
    hostPath: "/tmp/upload"
  outputs: {}
  data: {}

# e.g.
  # data:
  #   data1:
  #     mountPath: "/data/1"
  #     hostPath: "/path/to/data"
  #     readOnly: true
  #   data2:
  #     mountPath: "/data/2"
  #     existingClaim: "data-2-pvc"
  #   data3:
  #     store: gcs
  #     bucket: gs://data-bucket
  #     secret: secret-name
  #     secretKey: secret-key
  #   data4:
  #     store: s3
  #     bucket: s3://data-bucket
  #     secret: secret-name
  #     secretKey: secret-key
  # outputs:
  #   outputs1:
  #     mountPath: "/outputs/1"
  #     hostPath: "/path/to/outputs"
  #     readOnly: true
  #   outputs2:
  #     mountPath: "/outputs/2"
  #     existingClaim: "outputs-2-pvc"
  #   outputs3:
  #     store: gcs
  #     bucket: gs://outputs-bucket
  #     secret: secret-name
  #     secretKey: secret-key
  #   outputs4:
  #     store: s3
  #     bucket: s3://outputs-bucket
  #     secret: secret-name
  #     secretKey: secret-key
  #
  # Possible values for S3 secret:
  #   {AWS_ACCESS_KEY_ID: , AWS_SECRET_ACCESS_KEY: , AWS_SECURITY_TOKEN: , AWS_REGION_NAME: }

defaultPersistence:
  data:
    data:
      mountPath: "/data"
      hostPath: "/data"
  outputs:
    outputs:
      mountPath: "/outputs"
      hostPath: "/outputs"

auth:
  ldap:
    enabled: false
    serverUri:
    globalOptions: {}
    connectionOptions: {}
    bindDN:
    bindPassword:
    userSearchBaseDN:
    userSearchFilterStr:
    userDNTemplate:
    startTLS: false
    userAttrMap: {}
    groupSearchBaseDN:
    groupSearchGroupType:
    requireGroup:
    denyGroup:
  github:
    enabled: false
    clientId:
    clientSecret:
  gitlab:
    enabled: false
    clientId:
    clientSecret:
    url:
  bitbucket:
    enabled: false
    clientId:
    clientSecret:
  azure:
    enabled: false
    tenantId:
    clientId:
    clientSecret:


nodeSelectors:
  core:
  experiments:
  jobs:
  builds:

tolerations:
  resourcesDaemon:
  core:
  experiments:
  jobs:
  builds:

affinity:
  experiments:
  jobs:
  builds:
  core:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: type
                operator: In
                values:
                - "polyaxon-core"
            topologyKey: "kubernetes.io/hostname"

passwordLength: 8

api:
  image: polyaxon/polyaxon-api
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  resources:
    limits:
      cpu: 1000m
      memory: 2000Mi
    requests:
      cpu: 128m
      memory: 300Mi

  service:
    name: api
    externalPort: 80
    internalPort: 80
    nodePort: 31811
    annotations: {}

streams:
  image: polyaxon/polyaxon-streams
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 700m
      memory: 1000Mi
    requests:
      cpu: 100m
      memory: 128Mi

  service:  # service type is the same as api
    name: streams
    externalPort: 1337
    internalPort: 1337
    nodePort: 31812

scheduler:
  image: polyaxon/polyaxon-scheduler
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  concurrency: 2
  resources:
    limits:
      cpu: 350m
      memory: 350Mi
    requests:
      cpu: 150m
      memory: 200Mi

hpsearch:
  image: polyaxon/polyaxon-hpsearch
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  concurrency: 2
  resources:
    requests:
      cpu: 150m
      memory: 200Mi

k8sEventsHandlers:
  image: polyaxon/polyaxon-k8s-events-handlers
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  concurrency: 2
  resources:
    limits:
      cpu: 200m
      memory: 300Mi
    requests:
      cpu: 130m
      memory: 200Mi

logsHandlers:
  image: polyaxon/polyaxon-logs-handlers
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  concurrency: 1
  resources:
    limits:
      cpu: 200m
      memory: 300Mi
    requests:
      cpu: 130m
      memory: 200Mi

beat:
  image: polyaxon/polyaxon-beat
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  resources:
    limits:
      cpu: 50m
      memory: 128Mi
    requests:
      cpu: 50m
      memory: 128Mi

crons:
  image: polyaxon/polyaxon-crons
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  replicas: 1
  concurrency: 2
  resources:
    limits:
      cpu: 100m
      memory: 256Mi
    requests:
      cpu: 100m
      memory: 100Mi

eventMonitors:
  replicas: 1

  namespace:
    enabled: true
    image: polyaxon/polyaxon-monitor-namespace
    imageTag: 0.6.0
    imagePullPolicy: IfNotPresent
    resources:
      limits:
        cpu: 120m
        memory: 200Mi
      requests:
        cpu: 80m
        memory: 128Mi
    persists: false
    logSleepInterval: 1

  statuses:
    enabled: true
    image: polyaxon/polyaxon-monitor-statuses
    imageTag: 0.6.0
    imagePullPolicy: IfNotPresent
    resources:
      limits:
        cpu: 120m
        memory: 200Mi
      requests:
        cpu: 80m
        memory: 128Mi
    persists: false
    logSleepInterval: 1

resourcesDaemon:
  enabled: true
  image: polyaxon/polyaxon-monitor-resources
  imageTag: 0.6.0
  imagePullPolicy: IfNotPresent
  resources:
    limits:
      cpu: 150m
      memory: 200Mi
    requests:
      cpu: 150m
      memory: 200Mi
  persists: false
  logSleepInterval: 1

sidecar:
  image: polyaxon/polyaxon-sidecar
  imageTag: 0.6.0

dockerizer:
  image: polyaxon/polyaxon-dockerizer
  imageTag: 0.6.0

hooks:
  image: polyaxon/polyaxon-manage
  imageTag: 0.5.0
  imagePullPolicy: IfNotPresent

postgresql:
  # Whether to deploy a postgres server in-cluster.
  # To use an external postgres instance:
  #  * set enabled to False, to disable the in-cluster deployment
  #  * configure external postgresql required attributes:
  #     externalPostgresHost:
  #     postgresUser:
  #     postgresPassword:
  #     postgresDatabase:
  enabled: true
  postgresUser: polyaxon
  postgresPassword: polyaxon
  postgresDatabase: polyaxon
  externalPostgresHost:
  imageTag: 9.6.1
  persistence:
    enabled: false
    size: 2Gi
  affinity:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: type
                operator: In
                values:
                - "polyaxon-core"
            topologyKey: "kubernetes.io/hostname"

redis:
  image: redis:4.0.9
  usePassword: false
  persistence:
    enabled: false
    accessMode: ReadWriteOnce
    size: 8Gi
  affinity:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: type
                operator: In
                values:
                - "polyaxon-core"
            topologyKey: "kubernetes.io/hostname"

rabbitmq:
  image: rabbitmq:3.7.4-management
  imagePullPolicy: IfNotPresent
  rabbitmqUsername: polyaxon
  persistence:
    enabled: false
  resources:
    requests:
      memory: 256Mi
      cpu: 300m
  affinity:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: type
                operator: In
                values:
                - "polyaxon-core"
            topologyKey: "kubernetes.io/hostname"

docker-registry:
  service:
    type: NodePort
    nodePort: 31813
  resources:
    requests:
      cpu: 300m
      memory: 312Mi
  persistence:
    enabled: false
  affinity:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: type
                operator: In
                values:
                - "polyaxon-core"
            topologyKey: "kubernetes.io/hostname"

nfsProvisioner:
  enabled: false
  persistence:
    enabled: false
    size: 50Gi
    accessMode: ReadWriteOnce
  pvc:
    logs:
      name: "polyaxon-pvc-logs"
      accessMode: ReadWriteMany
      mountPath: "/logs"
      size: 5Gi
    repos:
      name: "polyaxon-pvc-repos"
      accessMode: ReadWriteMany
      mountPath: "/repos"
      size: 10Gi
    upload:
      name: "polyaxon-pvc-upload"
      accessMode: ReadWriteMany
      mountPath: "/upload"
      size: 10Gi
    data:
      name: "polyaxon-pvc-data"
      accessMode: ReadWriteMany
      mountPath: "/data"
      size: 10Gi
    outputs:
      name: "polyaxon-pvc-outputs"
      mountPath: "/outputs"
      accessMode: ReadWriteMany
      size: 10Gi

  resources: {}
  image:
    repository: quay.io/kubernetes_incubator/nfs-provisioner
    tag: v1.0.9
    pullPolicy: IfNotPresent
  service:
    type: ClusterIP

    nfsPort: 2049
    mountdPort: 20048
    rpcbindPort: 51413

  affinity:
    podAffinity:
      preferredDuringSchedulingIgnoredDuringExecution:
        - weight: 100
          podAffinityTerm:
            labelSelector:
              matchExpressions:
              - key: type
                operator: In
                values:
                - "polyaxon-core"
            topologyKey: "kubernetes.io/hostname"

types:
  hooks: "polyaxon-hooks"
  core: "polyaxon-core"
  runner: "polyaxon-runner"

roles:
  api: "polyaxon-api"
  log: "polyaxon-logs"
  worker: "polyaxon-workers"
  dashboard: "polyaxon-dashboard"

k8s: {}

email:
  host: smtp
  port: 25
  useTls: false
  hostUser: ""
  hostPassword: ""

integrations:
  slack:
  hipchat:
  mattermost:
  discord:
  pagerduty:
  webhooks:
# e.g.
  # slack:
  #   - url: https://hooks.slack.com/services/T6QR3FYN7/BC34VRP/7KRWJAtQWOxjxYgee
  #   - url: https://hooks.slack.com/services/FGDR3FD34/BC34VRP/7KRWDSFSD3xjxYgee
  #     channel: channel12

privateRegistries:
# e.g.
  # - user:pass@host:port
  # - user:pass@host.com

intervals:  # in seconds
  experiments_scheduler: 15
  experiments_sync: 60
  clusters_update_system_info: 150
  clusters_update_system_nodes: 150
  pipelines_scheduler: 60
  operations_default_retry_delay: 60
  operations_max_retry_delay: 3600

queues:
  repos: 'queues.repos'

  schedulerHealth: 'queues.scheduler.health'
  schedulerExperiments: 'queues.scheduler.experiments'
  schedulerExperimentGroups: 'queues.scheduler.experimentGroups'
  schedulerProjects: 'queues.scheduler.projects'
  schedulerBuildJobs: 'queues.scheduler.build_jobs'
  schedulerJobs: 'queues.scheduler.jobs'

  pipelinesHealth: 'queues.pipelines.health'
  pipelines: 'queues.pipelines'

  cronsHealth: 'queues.crons.health'
  cronsExperiments: 'queues.crons.experiments'
  cronsPipelines: 'queues.crons.pipelines'
  cronsClusters: 'queues.crons.clusters'
  cronsClean: 'queues.crons.clean'

  hpHealth: 'queues.hp.health'
  hp: 'queues.hp'

  k8sEventsHealth: 'queues.k8s_events.health'
  k8sEventsNamespace: 'queues.k8s_events.namespace'
  k8sEventsResources: 'queues.k8s_events.resources'
  k8sEventsJobStatuses: 'queues.k8s_events.jobStatuses'

  logsHealth: 'queues.logs.health'
  logsSidecars: 'queues.logs.sidecars'
  streamLogsSidecars: 'queues.stream.logs.sidecars'
`;
