export default {
  install (Vue) {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        const vm = new Vue()
        vm.$notify({
          title: '️⚠️️️️️ 重要提醒',
          type: 'error',
          duration: 0,
          dangerouslySetInnerHTML: true,
          message: `
            <div>
              <div>
                1. 请使用 <em>vue@2.5.x</em> 或者 <em>vue@2.6.7+</em>。
              </div>
              <div>
                2. 千万<b>不要</b>使用 <em>vue@2.6.0 - 2.6.6</em>。
              </div>

              相关链接：<a href="https://github.com/vuejs/vue/issues/9553">vue/issues/9553</a>
            </div>
          `
        })
      })
    }
  }
}
