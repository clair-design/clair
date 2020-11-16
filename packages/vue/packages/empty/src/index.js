export default {
  name: 'CEmpty',

  props: {
    size: String,
    description: {
      type: [String, Object],
      default: '暂无数据'
    },
    imgStyle: Object,
    imgUrl: {
      type: String,
      default:
        // eslint-disable-next-line max-len
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEiIGhlaWdodD0iNDgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMgLTQpIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIG9wYWNpdHk9Ii4yIiBkPSJNMCAwaDU2djU2SDB6Ii8+PHBhdGggZmlsbD0iI0MxQzdENiIgZD0iTTEwIDIzaDlsLTYuNzIgMTJoLTl6TTQ2LjAwOSAyM2gtOWw2LjcyIDEyaDl6Ii8+PHBhdGggZmlsbD0iI0RDRTBFRCIgZD0iTTEwIDIzaDM2djEzSDEweiIvPjxwYXRoIGQ9Ik0yMS41IDM3YTguNSA4LjUgMCAxIDAgMC0xNyA4LjUgOC41IDAgMCAwIDAgMTd6IiBzdHJva2U9IiNDMUM3RDYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWRhc2hhcnJheT0iMCwzIi8+PHBhdGggZD0iTTIyIDM3YzEwLjY3MyAwIDE5LjAwNi03LjU1MyAyNS0yMi42NTgiIHN0cm9rZT0iI0MxQzdENiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtZGFzaGFycmF5PSIwLDMiLz48cmVjdCBmaWxsPSIjRUZGMUY5IiB4PSIzIiB5PSIzNCIgd2lkdGg9IjUwIiBoZWlnaHQ9IjE4IiByeD0iMiIvPjxyZWN0IGZpbGw9IiNDMUM3RDgiIHg9IjE4IiB5PSI0MSIgd2lkdGg9IjIwIiBoZWlnaHQ9IjQiIHJ4PSIyIi8+PHBhdGggZD0iTTUzLjk3NyA0LjM5bC0xLjM3MyA3Ljk2N2EuMzI4LjMyOCAwIDAgMS0uMzIzLjI3NC4zNi4zNiAwIDAgMS0uMTI0LS4wMjdsLTIuMzI1LS45NS0xLjI0MiAxLjUxNmEuMy4zIDAgMCAxLS4yNTIuMTE3LjI4Ni4yODYgMCAwIDEtLjExNC0uMDIuMzI3LjMyNyAwIDAgMS0uMjE2LS4zMDh2LTEuNzkybDQuNDk0LTUuNTE5LTUuNTQ2IDQuODMxLTIuMDI3LS44M2MtLjEyNy0uMDQ4LS4xOTYtLjE0Mi0uMjA1LS4yODRhLjMwNy4zMDcgMCAwIDEgLjE2NC0uMzA0bDguNi01LjAxMWEuMzE3LjMxNyAwIDAgMSAuMTY1LS4wNDVjLjA3IDAgLjEzLjAxOC4xODYuMDU3LjExNC4wODIuMTYuMTkxLjEzOC4zMjd6IiBmaWxsPSIjQzFDN0Q2Ii8+PC9nPjwvc3ZnPg=='
    }
  },

  render(h) {
    const { size, description, imgStyle, imgUrl } = this

    const className = size ? `c-empty--${size}` : ''
    const imgAlt = typeof description === 'string' ? description : '暂无数据'

    return (
      <div class={`c-empty ${className}`}>
        <img
          class="c-empty__img"
          src={imgUrl}
          alt={imgAlt}
          style={{ ...imgStyle }}
        />
        <div class="c-empty__description">
          {this.$slots.description || description}
        </div>
      </div>
    )
  }
}
