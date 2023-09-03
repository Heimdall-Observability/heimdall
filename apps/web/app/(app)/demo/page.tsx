import { Dashboard } from '@/components/dashboard';
import { generateToken } from '@/lib/generate-token';

const DemoPage = () => {
	const token = generateToken({
		website: 'heimdall',
		name: '',
		id: 'heimdall',
	});
	return (
		<Dashboard
			website={{
				id: 'heimdall',
				url: 'https://heimdall.francismasha.com',
				title: 'Heimdall',
			}}
			showSetup={false}
			token={token}
			isPublic={false}
		/>
	);
};

export default DemoPage;
