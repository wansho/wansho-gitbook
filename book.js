{
  "title": "wanshuo gitbook",
  "description": "记录学习，记录生活",
  "structure": {
    "readme": "README.md"
  },
  "links": {
    "gitbook": false,
    "sharing": {
      "google": false,
      "facebook": false,
      "twitter": false,
      "all": false
    }
  },

  "plugins": ["advanced-emoji", "simple-page-toc", "-lunr", "-search", "search-plus", "prism", "-highlight", "github", "github-buttons", "katex", "ace", "include-codeblock", "splitter", "tbfed-pagefooter", "anchors", "sitemap-general", "copy-code-button"],
  "pluginsConfig": {
    "simple-page-toc": {
		"maxDepth": 3,
		"skipFirstH1": true
	},
	"prism": {
		"css": [
			"prism-themes/themes/prism-base16-ateliersulphurpool.light.css"
		]
	},
	"github": {
        "url": "https://github.com/wansho"
    },
	"github-buttons": {
		"repo": "wansho/wansho-gitbook",
		"types": [
			"star",
			"watch",
			"fork"
		],
		"size": "small"
	},
	"include-codeblock": {
		"template": "ace",
		"unindent": "true",
		"theme": "monokai"
	},
	"tbfed-pagefooter": {
        "copyright":"Copyright © wanshuo",
        "modify_label": "该文件修订时间：",
        "modify_format": "YYYY-MM-DD HH:mm:ss"
    },
	"sitemap-general": {
		"prefix": "http://book.wansho.top"
	}
  }
}