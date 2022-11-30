const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/contact', {
	title: __( 'Contact Section', 'latitude-blocks' ),
	description: __( 'Section for displaying contact info, and contact form (Gravity Form)', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'forms',
	category: 'layout',
	supports: {
		anchor: true
	},
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
	},
	edit: edit,
	save: save,
} );