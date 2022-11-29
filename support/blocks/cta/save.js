const { useBlockProps } = wp.blockEditor;
const { registerBlockType } = wp.blocks;
const { RichText, MediaUpload, InnerBlocks } = wp.blockEditor;
const { Button } = wp.components;
const { __ } = wp.i18n;
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';
import ImageComp from '../../components/ImageComp.js';

const SaveCTA = ( { attributes } ) => {
		const {
			content, footer
		} = attributes;

		const blockProps = useBlockProps.save({
			className: 'cta'
		});
	
		return (
			<div {...blockProps}>
				<div className="block-wrapper">
					<div className="block-content">
						<Header.View
							tag="h3"
							title={ content }
						/>
						<Content.View
							tag="div"
							content={ footer }
							multiline="p"
							classProp="content-footer"
						/>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
}

export default SaveCTA;