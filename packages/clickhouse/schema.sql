CREATE TABLE IF NOT EXISTS heimdall_logs.event
(
    id         String,
    event      String,
    sessionId  String,
    visitorId  String,
    properties String   DEFAULT '{}',
    timestamp  DateTime DEFAULT now(),
    websiteId  String,
    sign       Int8
) ENGINE = CollapsingMergeTree(sign)
      ORDER BY (id, websiteId, timestamp, event);

CREATE TABLE IF NOT EXISTS heimdall_logs.event_queue
(
    id         String,
    event      String,
    sessionId  String,
    visitorId  String,
    properties String,
    timestamp  DateTime,
    websiteId  String,
    sign       Int8
) ENGINE = Kafka('localhost:9092', 'events', 'event_consumer_group')
      SETTINGS
          kafka_format = 'JSONEachRow',
          kafka_max_block_size = 1048576,
          kafka_handle_error_mode = 'stream';

CREATE MATERIALIZED VIEW heimdall_logs.event_queue_mv TO heimdall_logs.event AS
SELECT id,
       event,
       sessionId,
       visitorId,
       properties,
       timestamp,
       websiteId,
       sign
FROM heimdall_logs.event_queue;

CREATE MATERIALIZED VIEW heimdall_logs.event_errors_mv
            (
             error String,
             raw String
                )
            ENGINE = MergeTree
                ORDER BY (error, raw)
                SETTINGS index_granularity = 8192
AS
SELECT _error       AS error,
       _raw_message AS raw
FROM heimdall_logs.event_queue
WHERE length(_error) > 0;
