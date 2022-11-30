const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/image-swiper', {
	title: __( 'Image Swiper', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	parent: ['latitude-blocks/image-links'],
	edit: edit,
	save: save,
} );