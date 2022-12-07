const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/cards-grid', {
	title: __( 'Text Cards Grid', 'latitude-blocks' ),
	description: __( 'Grid of Text Cards', 'latitude-blocks' ),
	apiVersion: 2,
	attributes: {
		columns: {
			type: 'string',
			default: '3'
		},
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		color: {
			type: 'string',
			default: ''
		},
	},
	supports: {
		anchor: true
	},
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );