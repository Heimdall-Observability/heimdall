import { Dashboard } from '@/components/dashboard';
import { generateToken } from '@/lib/generate-token';

const DemoPage = () => {
	const token = generateToken({
		website: 'localhost',
		name: 'localhost',
		id: 'localhost',
	});
	return (
		<Dashboard
			website={{
				id: 'localhost',
				url: 'http://localhost:3000',
				title: 'localhost',
			}}
			showSetup={false}
			token={token}
			isPublic={false}
		/>
	);
};

export default DemoPage;
