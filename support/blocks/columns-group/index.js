const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/cards-grid', {
	title: __( 'Columns Group', 'latitude-blocks' ),
	description: __( 'Group of columns with optional header intro', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'grid-view',
	category: 'layout',
	edit: edit,
	save: save,
} );