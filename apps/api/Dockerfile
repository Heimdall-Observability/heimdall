FROM oven/bun

WORKDIR /app

# Copy project
COPY . .

# To keep the image small ;)
RUN rm -rf /app/apps/web
RUN rm -rf /app/packages/api

#  Temp solution for bun
RUN bun install --ignore-scripts

EXPOSE 8000

WORKDIR /app/apps/server

CMD ["bun", "start"]
