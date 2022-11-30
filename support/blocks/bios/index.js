const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/bios', {
	title: __( 'Group of Bios', 'latitude-blocks' ),
	description: __( 'Group of Bios.', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'groups',
	category: 'layout',
	edit: edit,
	save: save,
} );