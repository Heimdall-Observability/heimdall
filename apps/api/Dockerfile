FROM oven/bun
WORKDIR /app
COPY . .
RUN bun install
EXPOSE 8000
WORKDIR /app/apps/server
CMD ["bun", "start"]
