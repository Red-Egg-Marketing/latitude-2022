const { registerBlockType } = wp.blocks;
const { Fragment, useState } = wp.element;
const { select, dispatch, useSelect } = wp.data;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, ColorPalette, ToggleControl, RangeControl, TextControl } = wp.components;
const { __ } = wp.i18n;

const template = [
	['core/image', {}],
	['latitude-blocks/tab-content', {}]
];

const EditTab = ( { attributes, setAttributes, clientId, isSelected } ) => {

		const { title, id } = attributes;

		const blockProps = useBlockProps({
			className: 'tab'
		});

		var isParentOfSelectedBlock = useSelect( ( select ) => select( 'core/block-editor' ).hasSelectedInnerBlock( clientId, true, true ) );

		const setTitle = (value) => {
			setAttributes({
				title: value
			});
		}

		React.useEffect(() => {

			return(
				setAttributes({
					id: clientId
				})
			);

		}, []);
		
		return (
			<Fragment>
				<div {...blockProps}>
					<input 
						type="radio" 
						name="tab-group-1" 
						id={ `tab-${ id }` }
					/>
					<TextControl
						label=""
						value={ title }
						className="header-title"
						for={ `tab-${ id }` } 
						onChange={ setTitle }
					/>
				</div>
				{(isSelected || isParentOfSelectedBlock) && (
					<div className="tab-content" data-toggled>
						<div className="content-cols">
							<InnerBlocks
								template={ template }
								allowedBlocks={ ['core/image', 'latitude-blocks/tab-content'] }
							/>
						</div>
					</div>
				)}
				
			</Fragment>
		);
}

export default EditTab;