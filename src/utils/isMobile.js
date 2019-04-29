export const isMobile = () =>{
	let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
	// localStorage.setItem('isiphone',flag)
	// localStorage.setItem('ismobile',flag?1:0)
	return flag?1:0
}