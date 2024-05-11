'use client'

import dayjs from '@/lib/dayjsTime'
import { durationToReadableUnits } from '@/lib/utils'
import { HeimdallTraces } from '@heimdall-logs/types'
import { ColumnDef } from '@tanstack/react-table'
import {
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
  UnfoldVertical,
} from 'lucide-react'

export const columns: ColumnDef<HeimdallTraces>[] = [
  {
    id: 'expander',
    header: () => <UnfoldVertical />,
    cell: ({ row }) => (
      <span onClick={() => row.toggleExpanded}>
        {!row.getIsExpanded() ? <ChevronRight /> : <ChevronDown />}
      </span>
    ),
  },
  {
    id: 'timestamp',
    accessorKey: 'Timestamp',
    header: ({ column }) => {
      return (
        <div className="flex w-[100px] flex-row">
          <span
            className="group flex items-center gap-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Timestamp
            <ChevronsUpDown
              className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
              size={15}
            />
          </span>
        </div>
      )
    },
    cell: ({ row }) => {
      const relativeTime = dayjs(row.original.Timestamp as unknown as string)
        .local()
        .tz('Africa/Nairobi')
        .format('MMM DD HH:mm:ss.SSS')
      return relativeTime
    },
  },
  {
    id: 'span_name',
    accessorKey: 'SpanName',
    header: ({ column }) => {
      return (
        <div className="flex w-[350px] flex-row">
          <span
            className="group flex items-center gap-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Entry
            <ChevronsUpDown
              className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
              size={15}
            />
          </span>
        </div>
      )
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <div className="text-sm">{row.original.SpanName}</div>
          <div className="text-xs text-muted-foreground">
            {/*{removeQueryString(row.original.SpanAttributes?.['http.url'])}*/}
            {row.original.SpanAttributes?.['http.url']}
          </div>
        </div>
      )
    },
  },
  {
    id: 'duration',
    accessorKey: 'Duration',
    header: ({ column }) => {
      return (
        <span
          className="group flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Response time
          <ChevronsUpDown
            className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
            size={15}
          />
        </span>
      )
    },
    cell: ({ row }) => {
      const duration = durationToReadableUnits(+row.original.Duration)
      return <span className="text-sm">{duration}</span>
    },
  },
  {
    id: 'service_name',
    accessorKey: 'ServiceName',
    header: ({ column }) => {
      return (
        <span
          className="group flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Service
          <ChevronsUpDown
            className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
            size={15}
          />
        </span>
      )
    },
  },
  // {
  // 	id: 'city',
  // 	accessorKey: 'city',
  // 	header: ({ column }) => {
  // 		return (
  // 			<span
  // 				className='group flex items-center gap-2'
  // 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  // 			>
  // 				City
  // 				<ChevronsUpDown
  // 					className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
  // 					size={15}
  // 				/>
  // 			</span>
  // 		);
  // 	},
  // },
  // {
  // 	id: 'country',
  // 	accessorKey: 'country',
  // 	header: ({ column }) => {
  // 		return (
  // 			<span
  // 				className='group flex items-center gap-2'
  // 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  // 			>
  // 				Country
  // 				<ChevronsUpDown
  // 					className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
  // 					size={15}
  // 				/>
  // 			</span>
  // 		);
  // 	},
  // 	cell: ({ row }) => {
  // 		return COUNTRIES[row.original.country ?? ''] ?? row.original.country;
  // 	},
  // },
  // {
  // 	id: 'os',
  // 	accessorKey: 'os',
  // 	header: ({ column }) => {
  // 		return (
  // 			<span
  // 				className='group flex items-center gap-2'
  // 				onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  // 			>
  // 				OS
  // 				<ChevronsUpDown
  // 					className='mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100'
  // 					size={15}
  // 				/>
  // 			</span>
  // 		);
  // 	},
  // },
]
