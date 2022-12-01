const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/selected-projects', {
	apiVersion: 2,
	title: __( 'Selected Posts', 'latitude-blocks' ),
	description: __( 'Block for a selecting posts. Displays latest 3 from selected category.', 'latitude-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		anchor: {
			type: 'string',
			default: ''
		},
		category : {
			type: 'string',
		},
		mainTitle : {
			type: 'string'
		},
		content : {
			type: 'string'
		},
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		}
	},
	edit: edit,
	save: save
} );