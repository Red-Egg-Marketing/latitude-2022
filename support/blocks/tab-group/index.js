const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/tab-group', {
	title: __( 'Tab Group', 'latitude-blocks' ),
	description: __( 'Group of tabs.', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['latitude-blocks/tabs'],
	attributes: {
		height : {
			type: 'string',
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );