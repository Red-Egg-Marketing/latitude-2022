const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/faq-section', {
	title: __( 'FAQ Section', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	edit: edit,
	save: save,
} );