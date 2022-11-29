const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import Icons from '../../components/Icons.js';
import BackgroundColor from '../../components/BackgroundColor.js';

const template = [
	['yosi-health-blocks/contact-content'],
	['yosi-health-blocks/contact-forms']
];

const EditContact = ( { attributes, setAttributes } ) => {

		console.log(wp.data.select('core/editor').getCurrentPostAttribute('acf'));
	
		const {
			bgColor, bgSlug
		} = attributes;  		

		const blockProps = useBlockProps({
			className: 'contact-section' + ' ' + bgSlug
		});	

		
		return (
			<Fragment>
				<InspectorControls>
					<BackgroundColor
						bgColor={ bgColor }
						bgSlug={ bgSlug }
						setAttributes={ setAttributes }
						title="Contact Background Color"
					/>
				</InspectorControls>
				<div {...blockProps}>
					<div className="block-wrapper">
						<div className="block-content">
							<InnerBlocks 
								allowedBlocks={ ['yosi-health-blocks/contact-content', 'yosi-health-blocks/contact-forms'] }
								template={ template }
							/>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditContact;