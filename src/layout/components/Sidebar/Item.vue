<script>

export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
// 		plat: {
// 			type: String,
// 			default: ''
// 		}
  },
	
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = [];
// 		const platform  = localStorage.ismobile;
// 		console.log(platform,"platform")
// 		if(platform != plat){
// 			return ''
// 		}
    if (icon) {
      vnodes.push(<svg-icon icon-class={icon}/>)
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    return vnodes
  }
}
</script>
