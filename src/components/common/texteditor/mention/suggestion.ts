import { computePosition, flip, shift } from '@floating-ui/dom'
import { posToDOMRect, VueRenderer } from '@tiptap/vue-3'
import { nextTick } from 'vue'
import MentionList from '@/components/common/texteditor/mention/MentionList.vue'
import { developTeams } from '@/components/publisher/gameDetails/formComponents/developerTeam/DevelopTeams'

const updatePosition = (editor: any, element: any) => {
  const virtualElement = {
    getBoundingClientRect: () =>
      posToDOMRect(editor.view, editor.state.selection.from, editor.state.selection.to),
  }

  computePosition(virtualElement, element, {
    placement: 'top-start',
    strategy: 'absolute',
    middleware: [shift(), flip()],
  }).then(({ x, y, strategy }) => {
    element.style.width = 'max-content'
    element.style.position = strategy
    element.style.left = `${x}px`
    element.style.top = `${y}px`
  })
}

export default {
  items: ({ query }: any) => {
    return developTeams.value
      .filter((item) => item.toLowerCase().startsWith(query.toLowerCase()))
      .slice(0, 5)
  },

  render: () => {
    let component

    return {
      onStart: async (props) => {
        await nextTick()
        component = new VueRenderer(MentionList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        component.element.style.position = 'absolute'

        document.body.appendChild(component.element)

        setTimeout(() => {
          updatePosition(props.editor, component.element)
        })
        setTimeout(() => {
          console.log('component.ref:', component)
        }, 100)
      },

      onUpdate(props) {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        updatePosition(props.editor, component.element)
      },

      onKeyDown(props) {
        if (props.event.key === 'Escape') {
          component.destroy()

          return true
        }

        return component.ref?.onKeyDown?.(props.event)
      },

      onExit() {
        component.destroy()
      },
    }
  },
}
