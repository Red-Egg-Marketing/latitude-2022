const { registerBlockType } = wp.blocks;
const { Fragment } = wp.element;
const { RichText, MediaUpload, InnerBlocks, InspectorControls, useBlockProps } = wp.blockEditor;
const { Button, PanelBody, SelectControl, RangeControl, ToggleControl } = wp.components;
const { __ } = wp.i18n;
import BackgroundSelector from '../../components/BackgroundSelector.js';
import Anchor from '../../components/Anchor.js';
import Header from '../../components/Header.js';
import Content from '../../components/Content.js';


const template = [
	['gravityforms/form']
];

const VidImg = [
    {
        label: __( 'Image' ),
        value: 'image',
    },
    {
        label: __( 'Video' ),
        value: 'video',
    } 
];

const EditHero = ( { attributes, setAttributes } ) => {

		const { image, title, anchor, description, withform, vidOrImg, videoID, videoURL } = attributes;


        const blockProps = useBlockProps({
        	className: 'hero'
        });

        const imageSize = image.size != '' ? image.size + '%' : image.sizekey;

        let imagePos = '';

        if (image.bgkeyword == 'keyword') {
        	imagePos = image.position != '' ? image.position : '';
        } else if(image.bgkeyword == 'values') {
        	let unit = image.bgunit;
        	imagePos = image.positionX + unit + ' ' + image.positionY + unit;
        }

    	const backgroundSettings = {
    		"background-image" : image.url != '' ? 'url(' + image.url + ')' : '',
    		"background-repeat" : image.repeat != '' ? image.repeat : '',
    		"background-attachment" : image.attachment != '' ? image.attachment : '',
    		"background-position" : imagePos,
    		"background-size" : imageSize,
    	}

    	const updateVideoAttr = (media) => {
            setAttributes({
                videoURL : media.url + '#t=0.5',
                videoID : media.id
            });
        }

		return (
			<Fragment>
				<InspectorControls>
					<BackgroundSelector
						setAttributes={ setAttributes }
						image={ image }
					/>
					<PanelBody>
						<ToggleControl 
							label={__('With Form?')}
							checked={ !!withform }
							onChange={ () => {
									setAttributes({
										withform: !withform
									});
								}
							}
						/>
					</PanelBody>
					{ vidOrImg == 'image' && (
						<PanelBody
							title={ __( 'With Video or Image' ) }
							initialOpen={ false }
						>
							<SelectControl
								label={ __( 'Video or Image' ) }
								value={ vidOrImg }
								options={ VidImg }
								onChange={ ( selectedVidImg ) => {
									setAttributes( {
										vidOrImg: selectedVidImg,
									} );
								} }
							/>
						</PanelBody>
					)}
					<Anchor
						setAttributes={ setAttributes }
						anchor={ anchor }
					/>
				</InspectorControls>
				<div {...blockProps} id={anchor}>
					<div className="block-wrapper">
						<div className="hero__inner">
							<div className="content-wrap">
								<div className="hero-block-content">
									<div className="hero-block-wrap">
										<Header
											tag="h1"
											placeholder="Header Title..."
											setAttributes={ setAttributes }
											title={ title }
										/>
										<Content
											tag="div"
											multiline={ true }
											setAttributes={ setAttributes }
											content={ description }
											updateProp="description"
											placeholder="Content..."
										/>
									</div>
								</div>
								{ withform && (
									<div className="hero-block-form">
										<InnerBlocks 
											allowedBlocks={ ['gravityforms/form'] }
											template={ template }
										/>
									</div>
								)}
							</div>
							<div className="hero-block-image">
								{ vidOrImg == 'image' && (
									<Fragment>
										<div className="hero-block-image-wrap" style={ backgroundSettings }></div>
									</Fragment>
								)}
								{ vidOrImg == 'video' && (
									<Fragment>
										<MediaUpload
											onSelect={ updateVideoAttr }
											allowedTypes="video/mp4"
											value={ videoID }
											render={ ( { open } ) => (
												<Button
													className="button"
													onClick={ open }
												>
													Upload/Change Video
												</Button>
											) }
										/>
		
										{ videoID && (
											<video className="hero-asset" autoplay playsinline muted loop>
												<source src={videoURL} className="hero-source" type="video/mp4" />
											</video>
										)}
									</Fragment>
								)}
							</div>
						</div>
					</div>
				</div>
			</Fragment>
		);
}

export default EditHero;