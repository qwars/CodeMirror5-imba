
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/addon/lint/lint.css'

import './index.styl'

const CodeMirror = Promise.new do|resolve|
	require([
		'codemirror',
		'./javascripts/mode/imba-mode.js',
		'codemirror/mode/css/css.js',
		'codemirror/addon/edit/matchbrackets.js',
		'codemirror/addon/edit/closebrackets.js',
		'codemirror/addon/edit/trailingspace.js',
		'codemirror/addon/fold/foldcode.js',
		'codemirror/addon/comment/continuecomment.js',
		'codemirror/addon/comment/comment.js',
		'codemirror/keymap/emacs.js',
		'codemirror/keymap/vim.js',
		'codemirror/keymap/sublime.js'
		], do |response| resolve response )

if const isLint = !!process:env:CODEMIRROR_LINT
	require 'codemirror/addon/lint/lint'
	require './javascripts/addon/lint/css-lint' if process:env:CODEMIRROR_LINT.includes 'css'
	require './javascripts/addon/lint/html-lint' if process:env:CODEMIRROR_LINT.includes 'html'
	require './javascripts//addon/lint/json-lint' if process:env:CODEMIRROR_LINT.includes 'json'
	require './javascripts//addon/lint/coffescript-lint' if process:env:CODEMIRROR_LINT.includes 'coffescript'
	require './javascripts//addon/lint/javascript-lint' if process:env:CODEMIRROR_LINT.includes 'javascript'
	require './javascripts//addon/lint/yaml-lint' if process:env:CODEMIRROR_LINT.includes 'yaml'
	require './javascripts/addon/lint/imba-lint' if process:env:CODEMIRROR_LINT.includes 'imba'

export tag Widget
	prop compiler
	prop options default:
		mode: 'imba'
		theme: 'idea'
		viewportMargin: Infinity
		keyMap: 'emacs'
		extraKeys:
			Tab: "insertTab"
		indentUnit: 4
		indentWithTabs: true
		showTrailingSpace: true
		matchBrackets: true
		autoCloseBrackets: true
		foldCode: true
		autocorrect: true
		autofocus: true
		dragDrop: false
		lineNumbers: true
		lint: isLint
		gutters: ["CodeMirror-lint-markers"]

	@classes = ['imba-codemirror']

	def mount
		CodeMirror
			.then( do @codemirror = $1 dom, Object.assign @_options:default, @options unless dom:children:length )
			.then( do if data then setTimeout(&, 167) do @codemirror.setValue data )
			.then( do setTimeout(&, 167) do @codemirror:display:initinputstate = not @codemirror:display:wrapper.addEventListener(
				'keyup',
				do trigger( 'input', @codemirror.getValue ) if $1:key:length === 1 or ['Backspace', 'Enter'].includes $1:key
			) unless @codemirror:display:initinputstate  )
			.then( do @codemirror )

	def cm
		@codemirror

	def render
		<self .loading=!@codemirror>