const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'yosi-health-blocks/section-header', {
	title: __( 'Section Header', 'yosi-health-blocks' ),
	apiVersion: 2,
	icon: 'button',
	category: 'layout',
	parent: ['yosi-health-blocks/cards-grid'],
	edit: edit,
	save: save,
} );