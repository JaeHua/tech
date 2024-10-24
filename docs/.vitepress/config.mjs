import { defineConfig } from 'vitepress'

const base = '/image/'
export default defineConfig({
  base: /tech/,
  title: "技术站点",
  description: "分享记录一些...",
  head: [
    ['link', { rel: 'icon', href: `${base}logo.png` }],],
  themeConfig: {
    siteTitle: ' JaeHua技术站点',   
    logo: '/image/logo.png',			    

    nav: [
      { text: '首页', link: '/' },
      { text: '技术栈', 
        items:[
          {text:'Docker',link: '/guide/docker.md' },
          {text:'Linux',link: '/guide/linux.md' },
        ]
      }
    ],

    sidebar: 
      {
        "/guide/": [{
        text: '技术栈',
        items: [
          { text: 'Dokcer', link: '../guide/docker' },
          {text:'Linux',link:'../guide/linux'}
        ]
      }]
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
