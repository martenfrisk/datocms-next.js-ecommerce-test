export default function ProductBody({ content }: { content: any }) {
	const regex = /(<([^>]+)>)/ig;
	const result = content.replace(regex, '');

	return (
		<div>
			{result}
		</div>
	)
}
