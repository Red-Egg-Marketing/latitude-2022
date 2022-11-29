const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SaveCTAGrid = ( { attributes } ) => {

		const {
			columns, bgColor, bgSlug, color
		} = attributes;
		
		const blockProps = useBlockProps.save({
			className: 'text-cards-grid' + ' columns-' + columns + (bgSlug != '' ? ' ' + bgSlug + ' with-bg' : '')
		});
		
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveCTAGrid;