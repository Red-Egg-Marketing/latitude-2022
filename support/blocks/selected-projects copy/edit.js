const { RichText, InnerBlocks, InspectorControls, BlockControls, URLInput, MediaUpload, useBlockProps } = wp.blockEditor;
const { Fragment, useState } = wp.element;
const { RangeControl, PanelBody, TextControl, SelectControl, Button, Toolbar, ToolbarButton, Modal, Popover, withFocusOutside, Dashicon } = wp.components;
const { useDispatch, useSelect, replaceInnerBlocks } = wp.data;
const { __ } = wp.i18n;
import SearchResources from '../../components/SearchResources.js';
import Header from '../../components/Header.js';
import ResourceCard from '../../components/ResourceCard.js';
import Swiper from 'swiper/bundle';
// import a component

const apiUrl  = '/wp-json/wp/v2/posts';
const catUrl  = '/wp-json/wp/v2/categories';

const template = [
	['core/buttons']
]

const SearchResourcesBar = withFocusOutside(
    class extends React.Component {


    	constructor() {
    		super(...arguments);
    		this.render = this.render.bind(this);
    		this.handleFocusOutside = this.handleFocusOutside.bind(this);
    	}

        handleFocusOutside() {
           	this.props.activateSearchButton();
        }
 
        render() {
        	const {
        		resources, SearchResourcesFilter, resourceIndex, activateSearchButton, selectResource, currentUrl, editCurrentResource, editCurrent
        	} = this.props;

        	const passSearchParent = (val, index) => {
        		SearchResourcesFilter(val, index);
        	}

        	const passEditParent = (index) => {
        		editCurrentResource(index);
        	}

        	let displayEditing = false;

        	if (editCurrent.active == false) {
        		displayEditing = false;
        		if (currentUrl == '') {
        			displayEditing = true;
        		}
        	} else {
        		displayEditing = true;
        	}

            return (
                <Modal
					position="bottom left"
				>
					<div 
						className="selector-notes"
						style={{"min-width" : "500px", "padding" : "0 1.2rem"}}
					>
						{ displayEditing == false && (
							<div className="display-current">
								<p className="current-note" style={{"float" : "left"}}>
									<a 
										href={ currentUrl } 
										target="_blank"
									>
										{ currentUrl }
										<Dashicon 
											icon="external"
											style={{"text-decoration" : "none"}}
										/>
									</a>
								</p>	
								<Button
									isSecondary
									onClick={ () => {
										passEditParent(resourceIndex);
									} }
									icon="admin-links"
									style={{"float" : "right"}}
								>
								</Button>
							</div>
						)}
						{ displayEditing == true  && (
							<div className="edit-current" style={{"clear" : "both"}}>
								<TextControl
									label={ __('Search Resources...') }
									autoFocus={ true }
									onChange={ (val) => { 
										passSearchParent(val, resourceIndex);
									}}
								/>
																	
								<SearchResources
									resources={ resources }
									selectResource={ selectResource }
									resourceIndex={ resourceIndex }
								/>
							</div>
						)}
					</div>
				</Modal>				
            );
        }
    }
);

const buttonStyle = {
	"margin-left" : "15px"
}

const styleControls = {
	"margin-bottom" : "15px",
	"padding-top"		: "10px",
	"padding-bottom"		: "10px"
}


const mainControl = {
	"padding-top" : "15px",
	"border-top"	: "1px solid grey",
	"width": "100%"
}

const EditSelectedResources = ( { setAttributes, attributes, isSelected } ) => {

		const { resources, anchor, resourcelist, totalNotes, mainTitle } = attributes;

		const blockProps = useBlockProps({
			className: 'selected-resources'
		});

		const [searchActive, activateSearch] = useState({index: false, active: false});
		const [searchList, activateList] = useState(false);
		const [editCurrent, activateCurrent] = useState({index: false, active: false});
		const [currentSelect, activateSelect] = useState(false);


		let slideShow = false;

		const updateAnchor = (value) => {
			let removeSpace = value.replace(/\s+/g, '-');
			setAttributes({ anchor: removeSpace });
		}

		const addResource = () => {
			let curResources = JSON.parse(JSON.stringify(resourcelist));
			let index = resourcelist.length;
			let len = resourcelist.length == 0 ? 1 : resourcelist.length;

			let newResource = {
				resource : []
			};
			let newTotal = parseInt(totalNotes) + 1;
			
			for (var x = 0; x < len; x++) {
				newResource = 0;
				newResource = {
					'id' : 0,
					'img' : '',
					'post_title' : '',
					'url' : ''
				}
			}

			curResources[index] = newResource;

			setAttributes({
				resourcelist: curResources,
				totalNotes: newTotal
			});


		}

		const activateSearchButton = (index) => {

			wp.apiFetch({
				url: apiUrl
			}).then(resourcelist => {
				setAttributes({resources: resourcelist[0].resources });
				activateSearch( {index: index, active: !searchActive.active} );
				activateCurrent({ index: index, active: false });
				activateList( resources );
			});
			
		}
	
		const deleteNote = (index) => {

			let curNotes = JSON.parse(JSON.stringify(resourcelist));
			let newTotal = parseInt(totalNotes) > 0 ? parseInt(totalNotes) - 1 : 0;

			curNotes.splice(index, 1);

			setAttributes({
				resourcelist: curNotes,
				totalNotes: newTotal
			});
		}

		const selectResource = (val, index) => {

			let find = resources.find(resource => {

				if (resource.ID == val) {
					return resource;
				}
			});

			let curResources = JSON.parse(JSON.stringify(resourcelist));
			let newTitle = find.post_title;
			let newMedia = find.media_url;
			let newLink = find.link;
			let newExcerpt = find.post_excerpt;
			let newLabel = find.label;
			let newID = find.ID;


			curResources[index].img = newMedia;
			curResources[index].url = newLink;
			curResources[index].id = newID;
			curResources[index].post_title = newTitle;

			setAttributes({
				resourcelist: curResources
			});

			activateSearch( {index: index, active: !searchActive.active} );	
		}

		const SearchResourcesFilter = (search, index) => {

			let curNotes = JSON.parse(JSON.stringify(resourcelist));

			var foundResources = resources.filter(resource => {
				let title = resource.post_title.toLowerCase();
				let link = resource.link;
				if ((title.indexOf(search, 0) != -1) || (link.indexOf(search, 0) != -1)) {
					return resource;
				}
			});
			activateList(foundResources);
			
		}

		const editCurrentResource = (index) => {
			activateCurrent({ index: index, active: !editCurrent.active });
		}

		if ( resources == undefined || resources.length == 0) {
			wp.apiFetch({
				url: apiUrl
			}).then(resourcelist => {
				setAttributes({resources: resourcelist[0].resources});
				activateList( resources );
			});

			return (
				<section { ...blockProps }>
					Loading Projects...
				</section>
			);
				
		}

		const initiateSlider = () => {

			let index = resourcelist.length;
			
			slideShow = new Swiper('.swiper', 
				{
					loop: false,
					slidesPerView: 1,
					autoplay: false,
					effect: 'slide',
					spaceBetween: 40,
					speed: 800,
					noSwiping: true,
					simulateTouch: false,
					initialSlide: (index - 1),
					init: true,
					navigation: {
    					nextEl: '.swiper-button-next',
    					prevEl: '.swiper-button-prev',
  					},
  					breakpoints: {
  						768 : {
  							slidesPerView: 2
  						},
  						1400 : {
  							slidesPerView: 3
  						}
  					}
				}
			);

		}


		return (
			<Fragment>
				<InspectorControls>
					<PanelBody
							title={ __( 'HTML Anchor' ) }
							initialOpen={ false }
						>
							<TextControl
								label={ __( 'HTML Anchor' ) }
								value={ anchor }
								onChange={ ( anchor ) => updateAnchor( anchor ) }
								help={__('Enter a word or two — without spaces — to make a unique web address just for this heading, called an “anchor.”')}
							/>
						
					</PanelBody>
				</InspectorControls>
				<section {...blockProps}>
					<div className="resources-block">
					<div className="block-wrapper" id={anchor}>
						<div className="resources-wrap">
							<header
								className="section-header"
							>
								<Header
									tag="h2"
									title={ mainTitle }
									setAttributes={ setAttributes }
									updateProp="mainTitle"
									placeholder={ "Selected Projects Heading..." }
								/>
							</header>
							<div className="resources-slides" data-total={ totalNotes }>
								<div className="swiper">
									<div className="swiper-wrapper">
									{ resourcelist.map( (resourceItem, resourceIndex) => {
											let editText = resourceItem.id == 0 ? 'Select a Project' : 'Change Project';
											return(
												<Fragment>
												
												<div className="swiper-slide">
													<img src={ resourceItem.img } />
													<div className="control-row" style={ styleControls }>
														<Button
															isLink
															isDestructive
															isSmall
															onClick={ () => { 
																deleteNote( resourceIndex );
															}}
														>
															Delete Project
														</Button>
														<Button
															isLink
															isSmall
															onClick={ () => {
																activateSearchButton(resourceIndex);
															}}
															style={ buttonStyle }
														>
															{ editText }
														</Button>
														{ (searchActive.index == resourceIndex && searchActive.active == true) && (
															<SearchResourcesBar 
																resources={ searchList }
																resourceIndex={ resourceIndex }
																SearchResourcesFilter={ SearchResourcesFilter }
																activateSearchButton={ activateSearchButton }
																selectResource={ selectResource }
																currentUrl={ resourceItem.id }
																editCurrentResource={ editCurrentResource }
																editCurrent={ editCurrent }
															/>
														)}
													</div>
												</div>
												</Fragment>
											);
										})
									}
									</div>
									<div class="swiper-button-prev"></div>
  									<div class="swiper-button-next"></div>
								</div>
							</div>
							<InnerBlocks 
								template={ template }
								allowedBlocks={['core-buttons']}
							/>
						{ (totalNotes <= 6) && (
							<div className="primary-controls" style={ mainControl }>
								<Button
									isPrimary
									onClick={ addResource }
								>Add Project</Button>
							</div>
						)}
						</div>
					</div>
					</div>
				</section>
			</Fragment>
		);
}

export default EditSelectedResources;