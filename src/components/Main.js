import 'lib/stylesheets/app.styl';
import React from 'react';
import ReactDOM from 'react-dom'
import ImageFigure from 'components/ImageFigure';
import Controller from 'components/Controller';
import { getRangeRandom,get30DegRandom } from 'lib/js/utils';

var images = require('lib/data/images.json');
images = (function getImageUrl(arr) {
	for(var i=0;i<arr.length;i++) {
		var singleImageData = arr[i];
		singleImageData.imageUrl = require('lib/images/'+singleImageData.fileName);
		arr[i] = singleImageData;
	}
	return arr
})(images);

class Gallery extends React.Component {
	constructor(props) {
		super(props);
		this.Constant = {
			center: {
				left: 0,
				top: 0
			},
			range: {
				leftX: [0,1],
				rightX: [0,1],
				y: [0,1]
			}
		};
		this.state = {
			imgsArrangeArr: []
		}
	}

	reArrange(centerIndex) {
		var imgsArrangeArr = this.state.imgsArrangeArr,
				Constant = this.Constant,
				center = Constant.center,
				range = Constant.range,
				leftX = range.leftX,
				rightX = range.rightX,
				y = range.y,
				//上方图片信息
				topArr = [],
				topImgNum = Math.floor(Math.random() * 2),
				topImgSpliceIndex = 0,
				topImgSpliceIndex = Math.ceil( Math.random() * (imgsArrangeArr.length - topImgNum ) );
				topArr = imgsArrangeArr.splice(topImgSpliceIndex,topImgNum);

		topArr.forEach((item,i) => {
			topArr[i] = {
				pos: {
					left: 0,
					top: 0
				},
				rotate: get30DegRandom(),
				isCenter: false
			}
		})
		//居中图片信息
		var imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);
		imgsArrangeCenterArr[0] = {
			pos: center,
			rotate: 0,
			isCenter: true
		}

		//其他图片信息
		for(var i=0,j=imgsArrangeArr.length,k=j/2;i<j;i++) {
			var hRangeObj = null;
			if(i<k)
				hRangeObj=leftX;
			else
				hRangeObj=rightX;
			imgsArrangeArr[i] = {
				pos: {
					left: getRangeRandom(hRangeObj[0],hRangeObj[1]),
					top: getRangeRandom(y[0],y[1])
				},
				rotate: get30DegRandom(),
				isCenter: false
			};
		}

		if(topArr && topArr[0]) imgsArrangeArr.splice(topImgSpliceIndex,0,topArr[0]);
		imgsArrangeArr.splice(centerIndex,0,imgsArrangeCenterArr[0]);
		this.setState({
			imgsArrangeArr
		})
	}
 
	center(i) {
		return _ => this.reArrange(i)
	}

	inverse(i) {
		return _ => {
			var imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[i].isInverse = !imgsArrangeArr[i].isInverse;
			this.setState({
				imgsArrangeArr
			});
		}
	}

	componentDidMount() {
		var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
				stageW = stageDOM.scrollWidth,
				stageH = stageDOM.scrollHeight,
				halfStageW = Math.ceil(stageW / 2),
				halfStageH = Math.ceil(stageH / 2);

		var imgFigureDOM = ReactDOM.findDOMNode(this.refs.lzx0);
		var imgW = imgFigureDOM.scrollWidth,
				imgH = imgFigureDOM.scrollHeight,
				halfImgW = Math.ceil(imgW / 2),
				halfImgH = Math.ceil(imgW / 2);

		this.Constant.center = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		};
		this.Constant.range.leftX[0] = -halfImgW;
		this.Constant.range.leftX[1] = halfStageW - halfImgW * 3;
		this.Constant.range.rightX[0] = halfStageW + halfImgW;
		this.Constant.range.rightX[1] = stageW - halfImgW;
		this.Constant.range.y[0] = -halfImgH;
		this.Constant.range.y[1] = stageH - halfImgH;
		this.reArrange(0);
	}

 render() {
		var ImageFigures = [],controllers=[];
  	images.forEach((item,i) => {
			if(!this.state.imgsArrangeArr[i]) {
				this.state.imgsArrangeArr[i] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}
  		ImageFigures.push(
				<ImageFigure key={i} ref={'lzx'+i}
					data={item}
					arrange={this.state.imgsArrangeArr[i]}
					inverse={this.inverse(i)}
					center={this.center(i)}
				/>
			);
			controllers.push(
				<Controller
					key={i}
					arrange={this.state.imgsArrangeArr[i]}
					inverse={this.inverse(i)}
					center={this.center(i)}
				/>
			);
  	});
    return (
     	<section className='stage' ref="stage">
     		<section className='img-sec'>
					{
						ImageFigures
					}
     		</section>
   		  <nav className='controller-nav'>
					{
						controllers
					}
   			</nav>
     	</section>
    );
	}
}
Gallery.defaultProps = {
};

export default Gallery;
