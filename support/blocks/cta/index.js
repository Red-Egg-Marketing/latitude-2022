const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/cta', {
	title: __( 'Call to Action', 'latitude-blocks' ),
	description: __( 'Button with short blurb.', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: '.header-title',
			default: ''
		},
		footer: {
			type: 'string',
			source: 'html',
			selector: '.content-footer',
			default: ''
		}
	},
	edit: edit,
	save: save,
} );