import React, { Fragment, ReactNode, useEffect, useState } from 'react'

import { fancyId } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@heimdall-logs/ui'
import { Button } from '@heimdall-logs/ui'
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { AnimatePresence, motion } from 'framer-motion'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
}

function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 40,
    })

  const [localData, setLocalData] = useState(data)

  useEffect(() => {
    if (data) {
      setLocalData(data)
    }
  }, [data])

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  )

  const table = useReactTable({
    data: localData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination: pagination,
    },
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: () => {
      //pagination is handled by the load more button
    },
  })

  return (
    <AnimatePresence>
      <p className=" my-2 text-sm">
        Showing <strong>{table.getRowModel().rows?.length}</strong> of
        <strong> {data.length} </strong>
        traces
      </p>
      <motion.div className="scrollbar-hide rounded-xl border bg-card dark:border-gray-800">
        <Table className="scrollbar-hide">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={fancyId()}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={fancyId()}>
                      {header.isPlaceholder
                        ? null
                        : (flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          ) as ReactNode)}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && 'selected'}
                    onClick={() => row.toggleExpanded()}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          ) as ReactNode
                        }
                      </TableCell>
                    ))}
                  </TableRow>
                </Fragment>
              ))
            ) : isLoading ? (
              <TableRow
                className={
                  'h-6 animate-pulse gap-2 rounded-md bg-gray-200 dark:bg-muted/50'
                }
              >
                <TableCell
                  colSpan={columns.length}
                  className=" h-6 animate-pulse gap-2 bg-gray-200 text-center dark:bg-muted/50"
                >
                  Loading Data
                </TableCell>
              </TableRow>
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-36 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
      <div className=" my-2 flex items-center justify-center gap-6">
        {pagination.pageSize < data.length && (
          <Button
            onClick={() => {
              setPagination({
                pageIndex: 0,
                pageSize: pagination.pageSize + 40,
              })
            }}
            type="outline"
          >
            Load More
          </Button>
        )}
      </div>
    </AnimatePresence>
  )
}

export { DataTable }
