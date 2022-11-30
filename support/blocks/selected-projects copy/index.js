const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/selected-projects', {
	apiVersion: 2,
	title: __( 'Selected Projects', 'latitude-blocks' ),
	description: __( 'Block for a selecting Projects', 'latitude-blocks' ),
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
		totalNotes: {
			type: 'string',
			default: '0',
			selector: '.resources-slides',
			source: 'attribute',
			attribute: 'data-total'
		},
		mainTitle : {
			type: 'string'
		},
		resourcelist: {
			type: 'array',
			default: [],
		}
	},
	edit: edit,
	save: save
} );