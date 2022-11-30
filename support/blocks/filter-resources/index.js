const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/resources', {
	apiVersion: 2,
	title: __( 'Filterable Resources', 'latitude-blocks' ),
	description: __( 'Block with filterable list of Resourcess', 'latitude-blocks' ),
	icon: 'megaphone',
	category: 'layout',
	attributes: {
		resources: {
			type: 'array',
			default: []
		},
		taxonomies : {
			type: 'object'
		},
		anchor: {
			type: 'string',
			default: ''
		},
		mainTitle : {
			type: 'string',
		}
	},
	edit: edit,
	save: save
} );