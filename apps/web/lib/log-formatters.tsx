export const ResponseCodeFormatter = ({ value }: any) => {
  if (!value) {
    return (
      <div>
        <label className="text-xs text-border">No data</label>
      </div>
    )
  }

  const split = value.toString().split('')[0]

  switch (split) {
    // 2XX || 1XX responses
    case '1':
    case '2':
      return (
        <div className="flex h-full items-center">
          <div className="relative flex h-6 items-center justify-center rounded border border-primary/20 bg-muted/10 px-2 py-1 text-center">
            <label className="block font-mono text-sm text-green-500">
              {value}
            </label>
          </div>
        </div>
      )
      break
    // 3XX responses
    case '3':
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded border border-primary/20 bg-primary/5 px-2 py-1
            text-center

            "
          >
            <label className="block font-mono text-sm text-primary">
              {value}
            </label>
          </div>
        </div>
      )
      break
    // 5XX responses
    case '5':
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded border border-destructive/20 bg-destructive/5 px-2 py-1
            text-center

            "
          >
            <label className="block font-mono text-sm text-destructive">
              {value}
            </label>
          </div>
        </div>
      )
      break
    // 4XX
    case '4':
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center border border-warn justify-center rounded bg-warn/10 text-warn px-2 py-1
            text-center"
          >
            <label className="block font-mono text-sm text-warn">{value}</label>
          </div>
        </div>
      )
      break
    // All other responses
    default:
      return (
        <div className="flex h-full items-center">
          <div
            className="relative flex h-6 items-center justify-center rounded bg-muted/20 px-2 py-1
            text-center

            "
          >
            <label className="block font-mono text-sm text-muted-foreground">
              {value}
            </label>
          </div>
        </div>
      )
      break
  }
}
