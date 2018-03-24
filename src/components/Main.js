import 'styles/app.styl';
import React from 'react';

const yeomanImage = require('../images/yeoman.png');
var images = require('../data/images.json');
images = (function getImageUrl(arr) {
	for(let i=0;i<arr.length;i++) {
		let singleImageData = arr[i];
		singleImageData.imageUrl = require('../images/'+singleImageData.fileName);
		arr[i] = singleImageData;
	}
	return arr
})(images);


class Gallery extends React.Component {
  render() {
    return (
     	<section className='stage'>
     		<section className='img-sec'>
     			<nav className='controller-nav'></nav>
     		</section>
     	</section>
    );
  }
}

Gallery.defaultProps = {
};

export default Gallery;
