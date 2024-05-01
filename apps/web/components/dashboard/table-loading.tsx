import { TableBody, TableCell, TableRow } from '@/components/ui/table'
import { cn } from '@/lib/utils'

const TableLoading = ({
  cellCount,
  className,
  rowOnly,
}: {
  cellCount: number
  className?: string
  rowOnly?: boolean
}) => {
  if (!rowOnly) {
    return (
      <TableBody className=" animate-pulse">
        <TableRow
          className={cn(
            'h-6 gap-2 rounded-md bg-gray-200 dark:bg-muted/50',
            className,
          )}
        >
          <TableCell colSpan={cellCount}></TableCell>
        </TableRow>
      </TableBody>
    )
  } else {
    return (
      <TableRow
        className={cn(
          'h-6 animate-pulse gap-2 rounded-md bg-gray-200 dark:bg-muted/50',
          className,
        )}
      >
        <TableCell
          colSpan={cellCount}
          className=" h-6 animate-pulse gap-2 bg-gray-200 text-center dark:bg-muted/50"
        >
          Loading Data ...
        </TableCell>
      </TableRow>
    )
  }
}
export { TableLoading }
