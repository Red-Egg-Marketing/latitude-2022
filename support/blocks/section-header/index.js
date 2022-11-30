const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/section-header', {
	title: __( 'Section Header', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['latitude-blocks/cards-grid'],
	edit: edit,
	save: save,
} );