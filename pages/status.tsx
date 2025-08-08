import { Layout } from '~/layouts';
import { Status } from '~/components';

export default function StatusPage() {
	return (
		<Layout.Default seo={{ title: 'DebugBoard ─ Status' }}>
			<div className="flex flex-grow min-h-screen pt-8 pb-12">
				<div className="flex-grow flex flex-col justify-start max-w-sm sm:max-w-lg w-full mx-auto px-0 sm:px-16 mt-8">
					<Status.Widget />
				</div>
			</div>
		</Layout.Default>
	);
}
