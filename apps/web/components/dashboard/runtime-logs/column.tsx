'use client'
import dayjsTime from '@/lib/dayjsTime'
import { ResponseCodeFormatter } from '@/lib/log-formatters'
import { ColumnDef } from '@tanstack/react-table'
import { ChevronsUpDown } from 'lucide-react'

const removeQueryParams = (url: string) => {
  return url.split('?')[0]
}

export const columns: ColumnDef<any>[] = [
  {
    id: 'timestamp',
    accessorKey: 'timestamp',
    header: ({ column }) => {
      return (
        <div className="flex w-[60px] flex-row">
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
      const dateObj = dayjsTime(row.original.timestamp).local()
      return (
        <div className="uppercase text-xs font-light">
          {dateObj.format('MMM DD HH:mm:ss.SSS')}
        </div>
      )
    },
  },
  {
    accessorKey: 'method',
    header: ({ column }) => {
      return (
        <div className="flex w-[100px] flex-row">
          <span
            className="group flex items-center gap-2"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Status
            <ChevronsUpDown
              className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
              size={15}
            />
          </span>
        </div>
      )
    },
    cell: ({ row }) => {
      const statusCode = row.original.status_code
      return (
        <div className="w-fit flex gap-4 items-center text-muted-foreground">
          <span>{row.getValue('method')}</span>
          <ResponseCodeFormatter value={statusCode} />
        </div>
      )
    },
  },
  // {
  //   id: 'host',
  //   accessorKey: 'host',
  //   header: ({ column }) => {
  //     return (
  //       <span
  //         className="group flex items-center gap-2"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
  //       >
  //         Host
  //         <ChevronsUpDown
  //           className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
  //           size={15}
  //         />
  //       </span>
  //     )
  //   },
  // },
  {
    id: 'route',
    accessorKey: 'route',
    header: ({ column }) => {
      return (
        <span
          className="group flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Route
          <ChevronsUpDown
            className="mr-2 opacity-0 transition-all ease-in-out group-hover:opacity-100"
            size={15}
          />
        </span>
      )
    },
    cell: ({ row }) => {
      const route = row.original.route
      return <span>{removeQueryParams(route)}</span>
    },
  },
  {
    id: 'event_message',
    accessorKey: 'event_message',
    header: ({ column }) => {
      return (
        <span
          className="group flex items-center gap-2"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Message
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
