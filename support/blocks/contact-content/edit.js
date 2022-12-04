const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, TextControl, ColorPalette, ToggleControl, RangeControl, Popover, withFocusOutside } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/heading', {'placeholder': 'Location Name...', 'level' : 4}],
	['core/paragraph', {'placeholder': 'Phone Number...'}]
];

const EditContactContent = ( { attributes, setAttributes } ) => {

	
		const {
			title, content, icons, subtitle
		} = attributes;

		const blockProps = useBlockProps({
			className: 'content-column column'
		});	

		
		return (
			<Fragment>
				<div {...blockProps}>							
					<InnerBlocks 
						allowedBlocks={ ['core/paragraph', 'core/heading'] }
						template={ template }
					/>
				</div>
			</Fragment>
		);
}

export default EditContactContent;