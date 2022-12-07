const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/columns-group', {
	title: __( 'Columns Group', 'latitude-blocks' ),
	description: __( 'Group of columns with optional header intro', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'grid-view',
	category: 'layout',
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );