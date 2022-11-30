const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/savings-form', {
	title: __( 'Savings Form', 'latitude-blocks' ),
	description: __( 'Savings Form block.', 'latitude-blocks' ),
	apiVersion: 2,
	parent: ['latitude-blocks/savings-calculator'],
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );