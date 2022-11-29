const { registerBlockType } = wp.blocks;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'yosi-health-blocks/testimonials', {
	apiVersion: 2,
	title: __( 'Testimonials', 'yosi-health-blocks' ),
	description: __( 'For testimonials with Slider functionality.', 'yosi-health-blocks' ),
	icon: 'welcome-write-blog',
	category: 'layout',
	attributes: {
		testimonials: {
			type: 'array',
			default: []
		},
		anchor: {
			type: 'string',
			default: ''
		},
		totalNotes: {
			type: 'string',
			default: '0',
			selector: '.testimonials',
			source: 'attribute',
			attribute: 'data-total'
		},
	},
	edit: edit,
	save: save
} );