import { Button } from '@/components/ui/button'

export default function BottomNav() {
  return (
    <div className="flex items-center justify-between rounded-full bg-card p-2 max-w-max">
      <div className="flex space-x-2 border-r border-muted pr-1">
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <svg
            className=" h-6 w-6 stroke-1"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
          </svg>
          <span className="sr-only">Create a comment</span>
        </Button>
        <div className="relative">
          <Button
            className="text-zinc-100 relative rounded-full hover:bg-gray-600 hover:text-zinc-100"
            size="icon"
            variant="ghost"
          >
            <svg
              className=" h-6 w-6 stroke-1"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
              <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
            </svg>
            <span className="sr-only">Open inbox</span>
            <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-blue-500" />
          </Button>
        </div>
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <svg
            className=" h-6 w-6 stroke-1"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span className="sr-only">Edit</span>
        </Button>
      </div>
      <div className="flex items-center justify-center space-x-2 pl-1">
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <svg
            className=" h-6 w-6 stroke-1"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
            <polyline points="16 6 12 2 8 6" />
            <line x1="12" x2="12" y1="2" y2="15" />
          </svg>
          <span className="sr-only">Open share UI</span>
        </Button>
        <Button
          className="text-zinc-100 rounded-full hover:bg-gray-600 hover:text-zinc-100"
          size="icon"
          variant="ghost"
        >
          <svg
            className=" h-6 w-6 stroke-1"
            fill="none"
            height="24"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
          <span className="sr-only">Open menu</span>
        </Button>
      </div>
    </div>
  )
}
