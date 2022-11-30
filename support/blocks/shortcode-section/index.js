const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/shortcode-section', {
	title: __( 'Shortcode Section', 'latitude-blocks' ),
	description: __( 'Title Block with area for shortcode embedding', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
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