const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import edit from './edit';
import save from './save';

registerBlockType( 'latitude-blocks/image-text', {
	title: __( 'Image & Text Columns', 'latitude-blocks' ),
	description: __( 'Contains Image, Title, Description and Buttons. Has offset display.', 'latitude-blocks' ),
	apiVersion: 2,
	icon: 'columns',
	category: 'layout',
	attributes: {
		bgColor: {
			type: 'string',
			default: ''
		},
		bgSlug: {
			type: 'string',
			default: ''
		},
		color: {
			type: 'string',
			default: ''
		},
		contentAlign: {
			type: 'string',
			default: 'img-right',
			selector: '.block-content'
		},
		withDrop: {
			type: 'boolean',
			default: true
		},
		media: {
			type: 'object',
			default: {
				id: '',
				alt: '',
				srcSet: {
					large: '',
					medium: '',
					small: '',
				}
			}
		},
		image : {
			type: 'object',
			default : {
				url : '',
				width : '',
				height : '',
				repeat: 'no-repeat',
				position: 'top left',
				size: '100',
				sizekey: '',
				attachment: 'scroll',
				bgkeyword: 'keyword'
			}
		},
		videothumb : {
			type: 'object',
			default : {
				url: '',
				width: '',
				height: '',
			}
		},
		videoID: {
			type: 'number',
		},
		vidOrImg: {
			type: 'string',
			default: 'image'
		},
		videoURL: {
			type: 'string',
			source: 'attribute',
			selector: '.source',
			attribute: 'src',
		},
		animateScroll: {
			type: 'boolean',
			default: false
		}
	},
	supports: {
		anchor: true
	},
	edit: edit,
	save: save,
} );