export function getRangeRandom(n,m) {
  return Math.ceil(n + Math.random() * (m-n))
}

export function get30DegRandom() {
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil( Math.random() * 30 )
}

export function handleClick(e) {
  if(this.props.arrange.isCenter){
    this.props.inverse();
  }else{
    this.props.center();
  }
  e.preventDefault();
  e.stopPropagation();
}