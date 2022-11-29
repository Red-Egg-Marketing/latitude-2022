const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'yosi-health-blocks/tab-group', {
	title: __( 'Tab Group', 'yosi-health-blocks' ),
	description: __( 'Group of tabs.', 'yosi-health-blocks' ),
	apiVersion: 2,
	icon: 'button',
	parent: ['yosi-health-blocks/tabs'],
	attributes: {
		height : {
			type: 'string',
		}
	},
	category: 'layout',
	edit: edit,
	save: save,
} );