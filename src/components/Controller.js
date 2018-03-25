import React from 'react';
import { handleClick } from 'lib/js/utils';

class Controller extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var controlelrUnitClassName='controller-unit';
		if(this.props.arrange.isCenter){
			controlelrUnitClassName+=' is-center';
			// 如果同时对应的是翻转图片， 显示控制按钮的翻转态
			if(this.props.arrange.isInverse){
				controlelrUnitClassName += ' is-inverse';
			}
		}
		return (
				<span className={controlelrUnitClassName} onClick={handleClick.bind(this)}></span>
			);
	}
}

export default Controller;