'use strict';

const express = require('express');
const graphqlHTTP = require('express-graphql');
const {
	GraphQLBoolean,
	GraphQLID,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLSchema,
	GraphQLString,
} = require('graphql');

const { getVideoById, getVideos, createVideo } = require('./src/data');

const PORT = process.env.PORT || 3000;
const server = express();

const videoType = new GraphQLObjectType({
	name: 'Video',
	description: 'A video',
	fields: {
		id: {
			type: GraphQLID,
			description: 'The ID of the video.',
		},
		title: {
			type: GraphQLString,
			description: 'The title of the video.',
		},
		duration: {
			type: GraphQLInt,
			description: 'The duration of the video (in seconds).',
		},
		watched: {
			type: GraphQLBoolean,
			description: 'Whether or not the video has been watched.',
		},
	}
});

const queryType = new GraphQLObjectType({
	name: 'QueryType',
	description: 'The root querty type.',
	fields: {
		video: {
			type: videoType,
			args: {
				id: {
					type: new GraphQLNonNull(GraphQLID),
					description: 'The ID of the video',
				}
			},
			resolve: (_, args) => {
				return getVideoById(args.id);
			},
		},
		videos: {
			type: new GraphQLList(videoType),
			resolve: getVideos,
		}
	},
});

const videoInputType = new GraphQLInputObjectType({
	name: 'VideoInput',
	fields: {
		title: {
			type: new GraphQLNonNull(GraphQLString),
			description: 'The title of the video.',
		},
		duration: {
			type: new GraphQLNonNull(GraphQLInt),
			description: 'The duration of the video (in seconds).',
		},
		released: {
			type: new GraphQLNonNull(GraphQLBoolean),
			description: 'Whether or not the video has been released.',
		},
	}
})

const mutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'The root Mutation type.',
	fields: {
		createVideo: {
			type: videoType,
			args: {
				video: {
					type: new GraphQLNonNull(videoInputType),
				}
			},
			resolve: (_, args) => {
				return createVideo(args.video);
			}
		},
	},
});

const schema = new GraphQLSchema({
	query: queryType,
	mutation: mutationType,
});

server.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true,
}));

server.listen(PORT, () => {
	console.log(`Listening on http://localhost:${PORT}`);
});
