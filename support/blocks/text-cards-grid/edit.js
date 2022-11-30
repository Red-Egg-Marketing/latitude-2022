const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;
import Content from '../../components/Content.js';
import BackgroundColor from '../../components/BackgroundColor.js';
import Columns from '../../components/Columns.js';

const template = [
	['latitude-blocks/header-intro', {}],
	['latitude-blocks/section-header'],
	['latitude-blocks/text-card', {}],
	['latitude-blocks/text-card', {}],
	['latitude-blocks/text-card', {}],
];

const EditCTAGrid = ( { attributes, setAttributes } ) => {

		const {
			columns, bgColor, bgSlug, color
		} = attributes;

		const onChangeContent = (value) => {
			setAttributes({
				content: value
			});
		}

		const blockProps = useBlockProps({
			className: 'text-cards-grid' + ' columns-' + columns + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});	
		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
					/>
					<Columns
						setAttributes={ setAttributes }
						columns={ columns }
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">							
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['latitude-blocks/text-card', 'latitude-blocks/section-header', 'latitude-blocks/header-intro'] }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditCTAGrid;