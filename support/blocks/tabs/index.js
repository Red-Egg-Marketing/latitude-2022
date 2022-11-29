const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'yosi-health-blocks/tabs', {
	apiVersion: 2,
	title: __( 'Tabs', 'yosi-health-blocks' ),
	description: __( 'Block for a tabs', 'yosi-health-blocks' ),
	icon: 'table-col-after',
	category: 'layout',
	attributes: {
		anchor: {
			type: 'string',
			default: ''
		}
	},
	edit: edit,
	save: save
} );