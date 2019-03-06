const videos = [
	{
		id: 'a',
		title: 'Drinking from the magic well',
		duration: 120,
		watched: false,
	},
	{
		id: 'b',
		title: 'The moose and the machine',
		duration: 240,
		watched: true,
	}
];

const getVideoById = (id) => new Promise((resolve) => {
	const [video] = videos.filter((video) => video.id === id);
	resolve(video);
});

const getVideos = () => new Promise((resolve) => resolve(videos));

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
