const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'yosi-health-blocks/savings-form', {
	title: __( 'Savings Form', 'yosi-health-blocks' ),
	description: __( 'Savings Form block.', 'yosi-health-blocks' ),
	apiVersion: 2,
	parent: ['yosi-health-blocks/savings-calculator'],
	icon: 'button',
	category: 'layout',
	edit: edit,
	save: save,
} );