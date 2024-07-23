import type { BytemdPlugin } from 'bytemd'

import themes, { highlights, icons, mdThemes } from './theme'

import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight-ssr'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import frontmatter from '@bytemd/plugin-frontmatter'

import 'bytemd/dist/index.min.css'

function parseTheme(content: string, type: 'theme' | 'highlight', theme: string): string {
  const mdRegex = /---\n([\s\S]*?)\n---/
  const match = content.match(mdRegex)
  if (!match) {
    // 不存在 添加
    return '---\n' + type + ': ' + theme + '\n---\n\n' + content
  } else {
    content = content.replace(mdRegex, '')
    // 存在 判断其中存在几个 或都存在
    const themeMatch = match[1].split('\n').filter(Boolean)
    const obj = {}
    themeMatch.forEach(item => {
      const [key, value] = item.split(':')
      obj[key] = value?.trim() || ''
    })
    obj[type] = theme
    return (
      '---\n' +
      Object.keys(obj)
        .map(key => {
          return key + ': ' + obj[key]
        })
        .join('\n') +
      '\n---' +
      content
    )
  }
}

function MdStyle(): BytemdPlugin {
  return {
    actions: [
      {
        title: '主题',
        icon: icons.theme, // 16x16 SVG icon
        handler: {
          type: 'dropdown',
          actions: mdThemes.map(theme => ({
            title: theme,
            icon: '',
            cheatsheet: undefined,
            handler: {
              type: 'action',
              click(e) {
                const editor = e.editor
                const currentValue = editor.getValue()
                const content = parseTheme(currentValue, 'theme', theme)
                editor.setValue(content)
              }
            }
          }))
        }
      },
      {
        title: '代码高亮样式',
        icon: icons.code_theme, // 16x16 SVG icon
        handler: {
          type: 'dropdown',
          actions: highlights.map(h => ({
            title: h,
            icon: '',
            cheatsheet: undefined,
            handler: {
              type: 'action',
              click(e) {
                const editor = e.editor
                const currentValue = editor.getValue()
                const content = parseTheme(currentValue, 'highlight', h)
                editor.setValue(content)
              }
            }
          }))
        }
      }
    ],
    viewerEffect: ({ file, markdownBody }: any) => {
      if (typeof file !== 'object') return
      const { frontmatter } = file || {}
      const { theme, highlight } = frontmatter || {}
      if (highlight) {
        const $style = document.createElement('style')
        $style.innerHTML = require(`#/highLightStyles/${highlight}.css`)
        markdownBody.appendChild($style)
      }
      if (theme) {
        const $style = document.createElement('style')
        $style.innerHTML = require(`#/mdStyles/${themes[theme]?.path}`)
        markdownBody.appendChild($style)
      }
    }
  }
}

export const plugins = [gfm(), frontmatter(), MdStyle(), gemoji(), highlight(), mediumZoom()]

// @ts-ignore
