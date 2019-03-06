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

const getObjectById = (type, id) => {
	const types = {
		video: getVideoById,
	}

	return types[type](id);
};

const getVideoById = (id) => new Promise((resolve) => {
	const [video] = videos.filter((video) => video.id === id);
	resolve(video);
});

const getVideos = () => new Promise((resolve) => resolve(videos));

const createVideo = ({ title, duration, released }) => {
	const video = {
		id: (new Buffer(title, 'utf8')).toString('base64'),
		title,
		duration,
		released,
	};

	videos.push(video);

	return video;
}

exports.getObjectById = getObjectById;
exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;
