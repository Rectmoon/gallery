import React from 'react';
import { handleClick } from 'lib/js/utils';

class ImageFigure extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var styleObj = {};
		if(this.props.arrange.pos) styleObj = this.props.arrange.pos;
		if(this.props.arrange.rotate) {
			['MozTransFormTransForm','msTransform','WebkitTransForm','transform'].forEach(item => {
				styleObj[item] = 'rotate('+this.props.arrange.rotate+'deg)';
			})
		}
		if(this.props.arrange.isCenter) styleObj.zIndex = 11;
		var imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
		return (
				<figure style={styleObj} className={imgFigureClassName} onClick={handleClick.bind(this)}>
					<img src={this.props.data.imageUrl}
					  width='240' height='240'
						alt={this.props.data.title+' like zly'}
					/>
					<figcaption>
						<h2 className='img-title'>{this.props.data.title}</h2>
						<div className="img-back" onClick={handleClick.bind(this)}>
							<p>{this.props.data.desc}</p>
						</div>
					</figcaption>
				</figure>
			);
	}
}

export default ImageFigure;