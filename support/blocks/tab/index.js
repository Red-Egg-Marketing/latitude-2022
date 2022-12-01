const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/tab', {
	title: __( 'Tab', 'latitude-blocks' ),
	description: __( 'Tab', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['latitude-blocks/tab-group'],
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		id : {
			type: 'string',
			default: ''
		},
	},
	edit: edit,
	save: save,
} );