import { defineConfig } from 'vitepress'
import mathjax3 from 'markdown-it-mathjax3';
const customElements = [
  'math',
  'maction',
  'maligngroup',
  'malignmark',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mi',
  'mlongdiv',
  'mmultiscripts',
  'mn',
  'mo',
  'mover',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'ms',
  'mscarries',
  'mscarry',
  'mscarries',
  'msgroup',
  'mstack',
  'mlongdiv',
  'msline',
  'mstack',
  'mspace',
  'msqrt',
  'msrow',
  'mstack',
  'mstack',
  'mstyle',
  'msub',
  'msup',
  'msubsup',
  'mtable',
  'mtd',
  'mtext',
  'mtr',
  'munder',
  'munderover',
  'semantics',
  'math',
  'mi',
  'mn',
  'mo',
  'ms',
  'mspace',
  'mtext',
  'menclose',
  'merror',
  'mfenced',
  'mfrac',
  'mpadded',
  'mphantom',
  'mroot',
  'mrow',
  'msqrt',
  'mstyle',
  'mmultiscripts',
  'mover',
  'mprescripts',
  'msub',
  'msubsup',
  'msup',
  'munder',
  'munderover',
  'none',
  'maligngroup',
  'malignmark',
  'mtable',
  'mtd',
  'mtr',
  'mlongdiv',
  'mscarries',
  'mscarry',
  'msgroup',
  'msline',
  'msrow',
  'mstack',
  'maction',
  'semantics',
  'annotation',
  'annotation-xml',
  'mjx-container',
  'mjx-assistive-mml',
];
const base = '/image/'
export default defineConfig({
  markdown: {
    config: md => {
      md.use(mathjax3)
    }
  },
  vue:{
    templateCompilerOptions: {
      isCustomElement: tag => customElements.includes(tag),
    }
  },
  base: '/tech/',
  title: "技术站点",
  description: "分享记录一些...",
  head: [
    ['link', { rel: 'icon', href: "/tech/image/logo.png" }],],
  themeConfig: {
    siteTitle: ' JaeHua技术站点',   
    logo: '/image/logo.png',			    

    nav: [
      { text: '首页', link: '/' },
      { text: '技术栈', 
        items:[
          {text:'Docker',link: '/guide/docker.md' },
          {text:'Linux',link: '/guide/linux.md' },
          {text:'Redis',link: '/guide/redis.md' },
          {text:'Git',link: '/guide/git.md' },

        ]
      },
      { text: 'Golang', 
        items:[
          {text:'入门与基础',link: '/guide/golang_part1.md' },
          {text:'核心技能',link: '/guide/golang_part2.md' },
          {text:'常见数据结构和算法',link: '/guide/golang_part3.md' },
          {text:'设计模式',link: '/guide/golang_part4.md' },
          {text:'web框架和rpc框架',link: '/guide/golang_part5.md' },
          {text:'关系型数据库和分布式缓存',link: '/guide/golang_part6.md' },


        ]
       },
      { text: '算法', 
        items:[
              {text:'动态规划',link:'/guide/dp.md'},
              {text:'分治算法',link:'/guide/divide.md'},
              {text:'贪心算法',link:'/guide/tanxing'},
        ]
      },
      { text: '关于', link: '/' },
    ],

    sidebar: 
      {
        "/guide/": [{
        text: '技术栈',
        items: [
          { text: 'Dokcer', link: '../guide/docker' },
          {text:'Linux',link:'../guide/linux'},
          {text:'Redis',link:'../guide/redis'},
          {text:'Git',link: '/guide/git' },
        ]
      },
      {text:'Golang',items:[
        {text:'入门与基础',link:'../guide/golang_part1'} ,
        {text:'核心技能',link:'../guide/golang_part2'},
        {text:'常见数据结构和算法',link:'../guide/golang_part3'} ,
        {text:'设计模式',link:'../guide/golang_part4'} ,
        {text:'web框架和rpc框架',link: '/guide/golang_part5' },
        {text:'关系型数据库和分布式缓存',link: '/guide/golang_part6' },




      ]} ,
      {text:'算法',items:[
        {text:'动态规划',link:'../guide/dp'},
        {text:'分治算法',link:'../guide/divide'},
        {text:'贪心算法',link:'../guide/tanxing'},

      ]}
      ],
      }
    ,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/JaeHua' }
    ],
      // 站点页脚配置
      footer: {
        message: "Released under the MIT License",
        copyright: "Copyright © 2024-present JieHua Jiang",
      },
  }
  
})
