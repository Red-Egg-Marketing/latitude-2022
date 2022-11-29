const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/heading', {'level' : 3, 'placeholder' : 'Section header...'}],
];

const EditSectionHeader = ( { } ) => {

		const blockProps = useBlockProps({
			className: 'section-header'
		});	
		
		return (
			<Fragment>
				<div {...blockProps}>
					<InnerBlocks
						template={ template }
						allowedBlocks={ ['core/heading'] }
					/>
				</div>
			</Fragment>
		);
}

export default EditSectionHeader;