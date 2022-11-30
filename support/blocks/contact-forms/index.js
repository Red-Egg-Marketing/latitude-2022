const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/contact-forms', {
	title: __( 'Header Intro in Columns', 'latitude-blocks' ),
	description: __( ' Can contain blocks for header and description in column format. Useful for introduction to section.', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'align-center',
	parent: ['latitude-blocks/contact'],
	category: 'layout',
	edit: edit,
	save: save,
} );