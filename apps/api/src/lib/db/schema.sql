CREATE TABLE heimdall_logs.event (
    id String,
    event String,
    sessionId String,
    visitorId String,
    properties String DEFAULT '{}',
    timestamp DateTime DEFAULT now(),
    websiteId String,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (id)

CREATE TABLE heimdall_logs.visitor (
    id String,
    identfiedId String,
    properties String DEFAULT '{}',
    timestamp DateTime DEFAULT now(),
    websiteId String,
    sign Int8
) ENGINE = CollapsingMergeTree(sign)
ORDER BY (id)
