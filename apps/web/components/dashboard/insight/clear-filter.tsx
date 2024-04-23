import { XCircle } from 'lucide-react';

export function ClearFilter({ onClick }: { onClick: () => void }) {
	return (
		<div
			className=' mb-2 mt-4 flex cursor-pointer items-center justify-end gap-1 text-sm font-bold'
			onClick={onClick}
		>
			<XCircle size={14} className=' ' />
			<p>Clear Filter</p>
		</div>
	);
}
