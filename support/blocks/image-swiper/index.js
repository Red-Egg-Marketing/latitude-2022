const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'yosi-health-blocks/image-swiper', {
	title: __( 'Image Swiper', 'yosi-health-blocks' ),
	apiVersion: 2,
	icon: 'schedule',
	category: 'layout',
	parent: ['yosi-health-blocks/image-links'],
	edit: edit,
	save: save,
} );