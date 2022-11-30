const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/selected-case-studies', {
	apiVersion: 2,
	title: __( 'Selected Case Studies', 'latitude-blocks' ),
	description: __( 'Block for a selecting Case Studies. Displays latest 3 from selected category.', 'latitude-blocks' ),
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
		}
	},
	edit: edit,
	save: save
} );