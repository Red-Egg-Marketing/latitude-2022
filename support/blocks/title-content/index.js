const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/title-content', {
	title: __( 'Title & Content', 'latitude-blocks' ),
	description: __( 'Title & content blurb. Centered text.', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	category: 'layout',
	attributes: {
		title: {
			type: 'string',
			source: 'text',
			selector: '.header-title',
			default: ''
		},
		content: {
			type: 'string',
			source: 'html',
			selector: '.content',
			default: ''
		}
	},
	edit: edit,
	save: save,
} );