# Heimdall

An open source application built using the new router, server components and
everything new in Next.js 13.

## Features

- New `/app` dir,
- Routing, Layouts, Nested Layouts and Layout Groups
- Data Fetching, Caching and Mutation
- Loading UI
- Server and Client Components
- API Routes and Middlewares
- Authentication using **NextAuth.js**
- ORM using **Prisma**
- Database on **PlanetScale**
- UI Components built using **Radix UI**
- Documentation and blog using **MDX** and **Contentlayer**
- Subscriptions using **Stripe**
- Styled using **Tailwind CSS**
- Validations using **Zod**
- Written in **TypeScript**
- Clickhouse

## Setting up Clickhouse using docker

    ```bash
    docker run -d --name clickhouse-server --ulimit nofile=262144:262144 yandex/clickhouse-server
    docker run -d --name clickhouse-client --link clickhouse-server:clickhouse-server yandex/clickhouse-client --host clickhouse-server
    docker exec -it clickhouse-client clickhouse-client --host clickhouse-server
    ```
    
    ```sql
    CREATE DATABASE IF NOT EXISTS heimdall;
    USE heimdall;
    CREATE TABLE IF NOT EXISTS events (
        id UUID,
        type String,
        data String,
        created_at DateTime
    ) ENGINE = MergeTree()
    PARTITION BY toYYYYMM(created_at)
    ORDER BY (created_at, id)
    SETTINGS index_granularity = 8192;
    ```
