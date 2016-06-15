module.exports = [
	{
		test: /\.js$/,
		exclude: /(node_modules|bower_components)/,
		loaders: ['babel'],
	},
	{
		test: /\.css$/,
		loader: 'style-loader!css-loader'
	},
	{
		test: /redactor.*\.js/,
		loader: 'imports?jQuery=jquery,$=jquery,this=>window,CodeMirror=codemirror'
	},
	{
		test: /(bootstrap|jquery\.easing).*\.js/,
		loader: 'imports?jQuery=jquery,$=jquery,this=>window'
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'file?path=./build'
	},
	{
		test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url?prefix=font/&limit=5000'
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url?limit=10000&mimetype=application/octet-stream'
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		loader: 'url?limit=10000&mimetype=image/svg+xml'
	},
	{
		test: /\.gif/,
		loader: 'url-loader?limit=10000&mimetype=image/gif'
	},
	{
		test: /\.jpg/,
		loader: 'url-loader?limit=10000&mimetype=image/jpg'
	},
	{
		test: /\.png/,
		loader: 'url-loader?limit=10000&mimetype=image/png'
	}
];
