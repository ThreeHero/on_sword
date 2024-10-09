// @ts-check

/**
 * @type {Record<string, {owner:string,repo:string,path:string,ref:string,highlight?:string}>}
 */
const themes = {
  'three-hero': {
    owner: 'ThreeHero',
    path: 'three-hero.less'
  },
  github: {
    owner: 'sindresorhus',
    repo: 'github-markdown-css',
    path: 'github-markdown.css',
    ref: '888d5a0',
    highlight: 'github'
  },
  smartblue: {
    owner: 'cumt-robin',
    repo: 'juejin-markdown-theme-smart-blue',
    path: 'smart-blue.css',
    ref: 'f266ca5'
  },
  cyanosis: {
    owner: 'linxsbox',
    repo: 'juejin-markdown-theme-cyanosis',
    path: 'cyanosis.scss',
    ref: '044b052',
    highlight: 'atom-one-dark'
  },
  'channing-cyan': {
    owner: 'ChanningHan',
    repo: 'juejin-markdown-theme-channing-cyan',
    path: 'channing-cyan.scss',
    ref: 'c843c2f'
  },
  fancy: {
    owner: 'xrr2016',
    repo: 'juejin-markdown-theme-fancy',
    path: 'fancy.scss',
    ref: '65aefc5'
  },
  hydrogen: {
    owner: 'DawnLck',
    repo: 'juejin-markdown-theme-hydrogen',
    path: 'hydrogen.scss',
    ref: 'b3f86fb'
  },
  'condensed-night-purple': {
    owner: 'Geekhyt',
    repo: 'condensed-night-purple',
    path: 'condensed-night-purple.scss',
    ref: 'a232641',
    highlight: 'github-gist'
  },
  greenwillow: {
    owner: 'wangly19',
    repo: 'juejin-markdown-theme-greenwillow',
    path: 'greenwillow.scss',
    ref: 'aca95ed'
  },
  'v-green': {
    owner: 'DawnLck',
    repo: 'juejin-markdown-theme-v-green',
    path: 'v-green.scss',
    ref: '015f88b'
  },
  'vue-pro': {
    owner: 'dunizb',
    repo: 'juejin-markdown-theme-vue-pro',
    path: 'vue-pro.scss',
    ref: '720e7a9',
    highlight: 'monokai'
  },
  'mk-cute': {
    owner: 'Jacky-Summer',
    repo: 'juejin-markdown-theme-mk-cute',
    path: 'mk-cute.scss',
    ref: '50d6414'
  },
  jzman: {
    owner: 'jzmanu',
    repo: 'juejin-markdown-theme-jzman',
    path: 'jzman.scss',
    ref: 'b8cf058',
    highlight: 'monokai'
  },
  'awesome-green': {
    owner: 'luffyZh',
    repo: 'juejin-markdown-theme-awesome-green',
    path: 'awesome-green.scss',
    ref: 'f8ec354'
  },
  orange: {
    owner: 'RudeCrab',
    repo: 'juejin-markdown-theme-rude-crab',
    path: 'rude-crab.scss',
    ref: '2a4524b',
    highlight: 'atom-one-light'
  },
  'scrolls-light': {
    owner: 'daodaolee',
    repo: 'juejin-markdown-theme-scrolls',
    path: 'scrolls.scss',
    ref: 'cebc694'
  },
  'simplicity-green': {
    owner: 'GuoJikun',
    repo: 'juejin-markdown-theme-simplicity-green',
    path: 'simplicity-green.scss',
    ref: '47cb3fe'
  },
  arknights: {
    owner: 'viewweiwu',
    repo: 'juejin-markdown-theme-arknights',
    highlight: 'atom-one-light',
    path: 'arknights.scss',
    ref: 'c7285a1'
  },
  vuepress: {
    owner: 'promise96319',
    repo: 'juejin-markdown-theme-vuepress',
    path: 'vuepress.scss',
    ref: 'af6f62a',
    highlight: 'base16/tomorrow-night'
  },
  'Chinese-red': {
    owner: 'Mancuoj',
    repo: 'juejin-markdown-theme-Chinese-red',
    path: 'Chinese-red.scss',
    ref: '6da886e',
    highlight: 'xcode'
  }
}

export const icons = {
  theme:
    '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z" stroke="currentColor" stroke-width="1.33" stroke-linejoin="round"></path><path d="M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z" stroke="currentColor" stroke-width="1.33" stroke-linejoin="round"></path><path d="M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z" stroke="currentColor" stroke-width="1.33" stroke-linejoin="round"></path><path d="M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z" stroke="currentColor" stroke-width="1.33" stroke-linejoin="round"></path></svg>',
  code_theme:
    '<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="none" fill-opacity="1"></rect><path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="currentColor" stroke-width="4" stroke-linejoin="round"></path><path d="M17 17V8L31 4V17" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path></svg>'
}

export const mdThemes = Object.keys(themes)
export const highlights = [
  'default',
  'a11y-dark',
  'a11y-light',
  'agate',
  'an-old-hope',
  'androidstudio',
  'arduino-light',
  'arta',
  'ascetic',
  'atom-one-dark-reasonable',
  'atom-one-dark',
  'atom-one-light',
  'brown-paper',
  'brown-papersq',
  'codepen-embed',
  'color-brewer',
  'dark',
  'devibeans',
  'docco',
  'far',
  'felipec',
  'foundation',
  'github-dark-dimmed',
  'github-dark',
  'github',
  'gml',
  'googlecode',
  'gradient-dark',
  'gradient-light',
  'grayscale',
  'hybrid',
  'idea',
  'intellij-light',
  'ir-black',
  'isbl-editor-dark',
  'isbl-editor-light',
  'kimbie-dark',
  'kimbie-light',
  'lightfair',
  'lioshi',
  'magula',
  'mono-blue',
  'monokai-sublime',
  'monokai',
  'night-owl',
  'nnfx-dark',
  'nnfx-light',
  'nord',
  'obsidian',
  'panda-syntax-dark',
  'panda-syntax-light',
  'paraiso-dark',
  'paraiso-light',
  'pojoaque',
  'purebasic',
  'qtcreator-dark',
  'qtcreator-light',
  'rainbow',
  'routeros',
  'school-book',
  'shades-of-purple',
  'srcery',
  'stackoverflow-dark',
  'stackoverflow-light',
  'sunburst',
  'tokyo-night-dark',
  'tokyo-night-light',
  'tomorrow-night-blue',
  'tomorrow-night-bright',
  'vs',
  'vs2015',
  'xcode',
  'xt256'
]

export default themes
